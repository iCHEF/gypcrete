import { memo, useState, useEffect, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import keycode from 'keycode';

import { getTextLayoutProps } from './mixins/rowComp';
import wrapIfNotElement from './utils/wrapIfNotElement';

import EditableText from './EditableText';
import Icon from './Icon';
import TextLabel from './TextLabel';

import { STATUS_CODE as STATUS } from './StatusIcon';

const TOUCH_TIMEOUT_MS = 250;

/**
 * <EditableTextLabel>
 * ===================
 *
 * The row component which can either in **edit mode** or **display mode**.
 *
 * While it's in **display mode**, it's simply a `<TextLabel>`.
 * Once it goes **edit mode**, it renders an `<EditableText>` inside
 * and behaves like an `<TextInput>`. It should also filter out status props when
 * it's in edit mode.
 *
 * The “editibility” can be either controlled or uncontrolled, depending on
 * the existence of the `inEdit` prop. An uncontrolled `<EditableTextLabel>` can
 * go into edit mode automatically when you double-click on it.
 *
 * Unlike `<TextInput>`, you should treat `<EditableTextLabel>` like a `<TextLabel>`.
 * It does not offer direct control to the `<input>` inside.
 */

const EditableTextLabel = memo(
  ({
    inEdit: inEditProp, // not used here
    onDblClick, // also not used here
    onEditEnd,
    status,
    ...labelProps
  }) => {
    const [inEdit, setInEdit] = useState(inEditProp || false);
    // For simulating double-touch
    const touchCountRef = useRef(0);
    const touchTimeoutRef = useRef(null);

    const getEditabilityControlled = useCallback(() => inEditProp !== undefined, [inEditProp]);

    const resetDblTouchSimulation = () => {
      touchCountRef.current = 0;
      touchTimeoutRef.current = null;
    };

    useEffect(() => {
      if (getEditabilityControlled()) {
        setInEdit(inEditProp);
      }
    }, [getEditabilityControlled, inEditProp]);

    useEffect(
      () => () => {
        if (touchTimeoutRef.current) {
          clearTimeout(touchTimeoutRef.current);
        }
      },
      [],
    );

    const leaveEditModeIfNotControlled = () => {
      if (!getEditabilityControlled()) {
        setInEdit(false);
      }
    };

    const handleDoubleClick = (event) => {
      /**
       * If `inEdit` isn't controlled, this component by default
       * goes into edit mode on double click/touch.
       */
      if (!getEditabilityControlled()) {
        setInEdit(true);
      }

      onDblClick(event);
    };

    const handleTouchEnd = (event) => {
      const currentCount = touchCountRef.current + 1;

      if (currentCount === 2) {
        // Simulates “double touch”
        handleDoubleClick(event);
        resetDblTouchSimulation();
        return;
      }

      /**
       * Clears prev timeout to keep touch counts, and then
       * create new timeout to reset touch counts.
       */
      global.clearTimeout(touchTimeoutRef.current);
      const resetTimeout = global.setTimeout(resetDblTouchSimulation, TOUCH_TIMEOUT_MS);

      touchCountRef.current = currentCount;
      touchTimeoutRef.current = resetTimeout;
    };

    const handleInputBlur = (event) => {
      leaveEditModeIfNotControlled();
      onEditEnd({
        value: event.currentTarget.value,
        event,
      });
    };

    const handleInputKeyDown = (event) => {
      switch (event.keyCode) {
        case keycode('Enter'):
          // Blur the input, and trigger `onEditEnd` in blur handler
          event.currentTarget.blur();
          break;
        case keycode('Escape'): {
          leaveEditModeIfNotControlled();
          onEditEnd({
            value: null,
            event,
          });
          break;
        }
        default:
          break;
      }
    };

    const { icon, basic, align } = labelProps;

    if (!inEdit && status !== STATUS.LOADING) {
      return (
        <TextLabel
          status={status}
          onDoubleClick={handleDoubleClick}
          onTouchEnd={handleTouchEnd}
          {...labelProps}
        />
      );
    }

    const layoutProps = getTextLayoutProps(align, !!icon); // { align, noGrow }
    const labelIcon = icon && wrapIfNotElement(icon, { with: Icon, via: 'type' });

    return (
      <TextLabel {...labelProps}>
        {labelIcon}

        <EditableText
          defaultValue={basic}
          autoFocus={inEdit}
          onBlur={handleInputBlur}
          onKeyDown={handleInputKeyDown}
          {...layoutProps}
        />
      </TextLabel>
    );
  },
);

EditableTextLabel.propTypes = {
  inEdit: PropTypes.bool,
  onEditEnd: PropTypes.func,
  onDblClick: PropTypes.func,
  // <TextLabel> props
  icon: TextLabel.propTypes.icon,
  basic: TextLabel.propTypes.basic,
  align: TextLabel.propTypes.align,
  status: TextLabel.propTypes.status,
};

EditableTextLabel.defaultProps = {
  inEdit: undefined,
  onEditEnd: () => {},
  onDblClick: () => {},
  // <TextLabel> props
  icon: TextLabel.defaultProps.icon,
  basic: TextLabel.defaultProps.basic,
  align: TextLabel.defaultProps.align,
  status: TextLabel.defaultProps.status,
};

export default EditableTextLabel;
