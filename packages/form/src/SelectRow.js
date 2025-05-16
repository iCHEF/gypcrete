import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import warning from 'warning';

import { ListRow, Button, Icon, Text, TextLabel } from '@ichef/gypcrete';

import Popover from '@ichef/gypcrete/lib/Popover';
import prefixClass from '@ichef/gypcrete/lib/utils/prefixClass';
import icBEM from '@ichef/gypcrete/lib/utils/icBEM';

import SelectList from './SelectList';

import parseSelectOptions from './utils/parseSelectOptions';
import formRow, { rowPropTypes } from './mixins/formRow';
import './styles/SelectRow.scss';

export const COMPONENT_NAME = prefixClass('form-select');
const ROOT_BEM = icBEM(COMPONENT_NAME);
export const BEM = {
  root: ROOT_BEM,
  popover: ROOT_BEM.element('popover'),
  placeholder: ROOT_BEM.element('placeholder'),
};

const CLOSABLE_CONFIG = {
  onEscape: true,
  onClickOutside: true,
  onClickInside: false,
};

function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

/**
 * Generate a value-label map from all `<SelectOption>`s.
 *
 * @param {array} fromOptions
 * @return {Map}
 */
function getValueToLabelAvatarMap(fromChildren = []) {
  const resultMap = new Map();
  const options = parseSelectOptions(fromChildren);

  options.forEach((option) => {
    const { label, avatar } = option;
    resultMap.set(option.value, {
      label,
      avatar,
    });
  });
  return resultMap;
}

const SelectRow = React.memo(
  ({
    label,
    asideAllLabel,
    asideNoneLabel,
    asideSeparator,
    disabled,
    renderRowValueLabel: renderRowValueLabelProp,
    multiple,
    value,
    defaultValue,
    onChange,
    ineditable,
    rowProps,
    className,
    children,
    ...restProps
  }) => {
    const getInitialValue = () => {
      if (value !== undefined) {
        return value;
      }

      if (multiple && defaultValue === undefined) {
        return [];
      }

      return defaultValue;
    };

    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [valueLabelMap, setValueLabelMap] = useState(getValueToLabelAvatarMap(children));
    const [cachedValue, setCachedValue] = useState(getInitialValue());

    const anchorNode = useRef(null);

    const prevMultiple = usePrevious(multiple);
    const isControlled = value !== undefined;
    const prevIsControlled = usePrevious(isControlled);

    const cacheValueArray = multiple
      ? cachedValue
      : [cachedValue].filter((val) => val !== undefined);

    // Handle change of "multiple" prop
    useEffect(() => {
      if (!isControlled && multiple !== prevMultiple && prevMultiple !== undefined) {
        warning(
          false,
          '<SelectRow>: you should not change `multiple` prop while it is uncontrolled. Its value will be reset now.',
        );
        setCachedValue(multiple ? [] : null);
      }
    }, [isControlled, multiple, prevMultiple]);

    // Handle children changes
    useEffect(() => {
      setValueLabelMap(getValueToLabelAvatarMap(children));
    }, [children]);

    // Handle controlled/uncontrolled switch
    useEffect(() => {
      warning(
        isControlled === prevIsControlled || prevIsControlled === undefined,
        '<SelectRow> should not switch from controlled to uncontrolled (or vice versa).',
      );

      if (isControlled) {
        setCachedValue(value);
      }
    }, [value, isControlled, prevIsControlled]);

    const handleButtonClick = () => {
      setIsPopoverOpen(true);
    };

    const handlePopoverClose = () => {
      setIsPopoverOpen(false);
    };

    const handleSelectChange = (nextValue) => {
      if (!isControlled) {
        setCachedValue(nextValue);
      }
      onChange(nextValue);

      if (!multiple) {
        handlePopoverClose();
      }
    };

    const renderPopover = (selectListProps) => (
      <Popover
        anchor={anchorNode.current}
        className={BEM.popover.toString()}
        closable={CLOSABLE_CONFIG}
        onClose={handlePopoverClose}
      >
        <SelectList
          value={cachedValue}
          onChange={handleSelectChange}
          {...selectListProps}
        />
      </Popover>
    );

    const renderRowValueLabel = () => {
      if (typeof renderRowValueLabelProp === 'function') {
        return renderRowValueLabelProp({ values: cachedValue, valueLabelMap });
      }

      const isSingleEmptyValue = cachedValue === undefined || cachedValue === '';
      const isMultipleEmptyValue = multiple && cachedValue.length === 0;

      if (isSingleEmptyValue || isMultipleEmptyValue) {
        return <span className={BEM.placeholder.toString()}>{asideNoneLabel}</span>;
      }

      if (multiple) {
        // Can turn off 'All' display by passing `false`.
        if (asideAllLabel && cachedValue.length === valueLabelMap.size) {
          return asideAllLabel;
        }
      }

      return cacheValueArray
        .map((_value) => {
          const valueMap = valueLabelMap.get(_value) || {};
          return valueMap.label;
        })
        .filter((_label) => Boolean(_label))
        .join(asideSeparator);
    };

    const renderAvatar = () =>
      cacheValueArray.map((_value) => {
        const valueMap = valueLabelMap.get(_value) || {};
        return <React.Fragment key={_value}>{valueMap.avatar}</React.Fragment>;
      });

    const wrapperClassName = classNames(COMPONENT_NAME, className);

    const Content = ineditable ? TextLabel : Button;
    const contentProps = ineditable
      ? {}
      : {
          onClick: handleButtonClick,
        };

    const selectListProps = {
      multiple,
      children,
      ...restProps,
    };

    return (
      <ListRow
        className={wrapperClassName}
        {...rowProps}
      >
        {renderAvatar()}
        <Content
          minified={false}
          disabled={disabled}
          {...contentProps}
        >
          <Text
            verticalOrder="reverse"
            bold={!ineditable}
            basic={renderRowValueLabel()}
            aside={label}
          />

          <span ref={anchorNode}>
            <Icon
              type="dropdown"
              disabled={ineditable}
            />
          </span>

          {isPopoverOpen && renderPopover(selectListProps)}
        </Content>
      </ListRow>
    );
  },
);

SelectRow.propTypes = {
  label: PropTypes.node.isRequired,
  asideAllLabel: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool, // can pass false to disable 'All' label
  ]),
  asideNoneLabel: PropTypes.string,
  asideSeparator: PropTypes.string,
  disabled: PropTypes.bool,
  renderRowValueLabel: PropTypes.func,
  // <SelectList> props
  multiple: SelectList.propTypes.multiple,
  value: SelectList.propTypes.value,
  defaultValue: SelectList.propTypes.defaultValue,
  onChange: PropTypes.func,
  // from formRow()
  ineditable: PropTypes.bool,
  rowProps: rowPropTypes,
};

SelectRow.defaultProps = {
  asideAllLabel: 'All',
  asideNoneLabel: '(Unset)',
  asideSeparator: ', ',
  disabled: false,
  renderRowValueLabel: undefined,
  // <SelectList> props
  multiple: SelectList.defaultProps.multiple,
  value: SelectList.defaultProps.value,
  defaultValue: SelectList.defaultProps.defaultValue,
  onChange: () => {},
  // from formRow()
  ineditable: false,
  rowProps: {},
};

export { SelectRow as PureSelectRow };
export default formRow()(SelectRow);
