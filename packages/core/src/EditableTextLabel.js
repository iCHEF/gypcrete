import React, { PureComponent } from 'react';
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
 * the existance of the `inEdit` prop. An uncontrolled `<EditableTextLabel>` can
 * go into edit mode automatically when you double-click on it.
 *
 * Unlike `<TextInput>`, you should treat `<EditableTextLabel>` like a `<TextLabel>`.
 * It does not offer direct control to the `<input>` inside.
 */

class EditableTextLabel extends PureComponent {
    static propTypes = {
      inEdit: PropTypes.bool,
      onEditEnd: PropTypes.func,
      onDblClick: PropTypes.func,
      // <TextLabel> props
      icon: TextLabel.propTypes.icon,
      basic: TextLabel.propTypes.basic,
      align: TextLabel.propTypes.align,
      status: TextLabel.propTypes.status,
    };

    static defaultProps = {
      inEdit: undefined,
      onEditEnd: () => {},
      onDblClick: () => {},
      // <TextLabel> props
      icon: TextLabel.defaultProps.icon,
      basic: TextLabel.defaultProps.basic,
      align: TextLabel.defaultProps.align,
      status: TextLabel.defaultProps.status,
    };

    state = {
      // eslint-disable-next-line react/destructuring-assignment
      inEdit: this.props.inEdit || false,
      // For simulating double-touch
      touchCount: 0,
      dblTouchTimeout: null,
    };

    // eslint-disable-next-line react/no-deprecated
    componentWillReceiveProps(nextProps) {
      /**
         * If the edit-state of <EditableTextLabel> is *controlled* by `inEdit` prop.
         * If the prop is `undefined`, this component became *uncontrolled*
         * and should run itself.
         */
      if (this.getEditabilityControlled(nextProps)) {
        this.setState({ inEdit: nextProps.inEdit });
      }
    }

    getEditabilityControlled(fromProps = this.props) {
      return fromProps.inEdit !== undefined;
    }

    resetDblTouchSimulation = () => {
      this.setState({
        touchCount: 0,
        dblTouchTimeout: null,
      });
    }

    leaveEditModeIfNotControlled() {
      if (!this.getEditabilityControlled(this.props)) {
        this.setState({ inEdit: false });
      }
    }

    handleDoubleClick = (event) => {
      /**
         * If `inEdit` isn't controlled, this component by default
         * goes into edit mode on double click/touch.
         */
      if (!this.getEditabilityControlled()) {
        this.setState({ inEdit: true });
      }

      const { onDblClick } = this.props;
      onDblClick(event);
    }

    handleTouchStart = (event) => {
      const { touchCount, dblTouchTimeout } = this.state;
      const currentCount = touchCount + 1;

      if (currentCount === 2) {
        // Simulates “double touch”
        this.handleDoubleClick(event);
        this.resetDblTouchSimulation();
        return;
      }

      /**
         * Clears prev timeout to keep touch counts, and then
         * create new timeout to reset touch counts.
         */
      global.clearTimeout(dblTouchTimeout);
      const resetTimeout = global.setTimeout(
        this.resetDblTouchSimulation,
        TOUCH_TIMEOUT_MS
      );

      this.setState({
        touchCount: currentCount,
        dblTouchTimeout: resetTimeout,
      });
    }

    handleInputBlur = (event) => {
      const { onEditEnd } = this.props;

      this.leaveEditModeIfNotControlled();
      onEditEnd({
        value: event.currentTarget.value,
        event,
      });
    }

    handleInputKeyDown = (event) => {
      switch (event.keyCode) {
        case keycode('Enter'):
          // Blur the input, and trigger `onEditEnd` in blur handler
          event.currentTarget.blur();
          break;
        case keycode('Escape'): {
          const { onEditEnd } = this.props;

          this.leaveEditModeIfNotControlled();
          onEditEnd({
            value: null,
            event,
          });
          break;
        }
        default:
          break;
      }
    }

    render() {
      const {
        inEdit, // not used here
        onDblClick, // also not used here
        onEditEnd,
        status,
        ...labelProps
      } = this.props;
      const { inEdit: stateInEdit } = this.state;

      const { icon, basic, align } = labelProps;

      if (!stateInEdit && status !== STATUS.LOADING) {
        return (
          <TextLabel
            status={status}
            onDoubleClick={this.handleDoubleClick}
            onTouchStart={this.handleTouchStart}
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
            autoFocus={stateInEdit}
            onBlur={this.handleInputBlur}
            onKeyDown={this.handleInputKeyDown}
            {...layoutProps}
          />
        </TextLabel>
      );
    }
}

export default EditableTextLabel;
