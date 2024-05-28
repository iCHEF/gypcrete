import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import warning from 'warning';

import { Map as ImmutableMap } from 'immutable';

import { List } from '@ichef/gypcrete';

import Option, { valueType, TYPE_SYMBOL as CHECKBOX_OPTION_TYPE_SYMBOL } from './SelectOption';
import { TYPE_SYMBOL as RADIO_OPTION_TYPE_SYMBOL } from './RadioSelectOption';

import parseSelectOptions from './utils/parseSelectOptions';
import getElementTypeSymbol from './utils/getElementTypeSymbol';

function getInitialCheckedState(selectedValue, multiple = true) {
  const checkedState = new ImmutableMap();

  return checkedState.withMutations((map) => {
    const valueArray = multiple ? selectedValue : [selectedValue];
    valueArray.forEach((optionValue) => map.set(optionValue, true));
  });
}

/**
 * A List providing multiple options for user to pick from.
 * It can be in either **single** or **multiple** response mode.
 */

const SelectList = React.memo(
  ({
    multiple,
    showCheckAll,
    minCheck,
    checkAllLabel,
    value,
    defaultValue,
    onChange,
    title,
    desc,
    children,
    ...wrapperProps
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

    const [checkedState, setCheckedState] = useState(
      getInitialCheckedState(getInitialValue(), multiple),
    );
    const prevMultiple = useRef(multiple);
    const isControlled = value !== undefined;
    const prevIsControlled = useRef(isControlled);

    const options = parseSelectOptions(children);

    const isAllChecked = options.every((option) => checkedState.get(option.value));

    // Update state when value prop changes
    useEffect(() => {
      if (isControlled) {
        setCheckedState(getInitialCheckedState(value, multiple));
      }
    }, [value, multiple, isControlled]);

    // Reset state when multiple prop changes
    useEffect(() => {
      if (!isControlled && prevMultiple.current !== multiple) {
        warning(
          false,
          '<SelectList>: you should not change `multiple` prop while it is uncontrolled. Its value will be reset now.',
        );
        setCheckedState(getInitialCheckedState([]));
      }
      // Saving current value to ref for comparing it on next render
      prevMultiple.current = multiple;
    }, [multiple, isControlled]);

    // Check if the component is switching between controlled and uncontrolled
    useEffect(() => {
      warning(
        isControlled === prevIsControlled.current,
        '<SelectList> should not switch from controlled to uncontrolled (or vice versa).',
      );

      // Saving current value for the next comparison
      prevIsControlled.current = isControlled;
    }, [isControlled]);

    const handleChange = (nextCheckedState) => {
      if (!isControlled) {
        setCheckedState(nextCheckedState);
      }

      const newValues = options
        .filter((option) => nextCheckedState.get(option.value))
        .map((option) => option.value);

      onChange(multiple ? newValues : newValues[0]);
    };

    const handleOptionChange = (optionValue, isChecked) => {
      let nextState = checkedState;

      if (multiple) {
        nextState = nextState.set(optionValue, isChecked);

        const nextCheckedSize = nextState.filter((_value) => _value).size;

        if (nextCheckedSize < minCheck) {
          // Cancel this operation
          return;
        }
      } else {
        const currentCheckedOptionValue = checkedState.findKey((_value) => _value);

        if (optionValue === currentCheckedOptionValue) {
          // Does not consider a change
          return;
        }
        nextState = nextState.set(currentCheckedOptionValue, false).set(optionValue, isChecked);
      }

      handleChange(nextState);
    };

    const handleCheckAllOptionChange = (ignoreThis, isChecked) => {
      const variableOptions = options.filter((option) => !option.readOnly);

      const nextState = checkedState.withMutations((map) => {
        variableOptions.forEach((option) => map.set(option.value, isChecked));

        const nextCheckedSize = map.filter((_value) => _value).size;
        const checksNeeded = minCheck - nextCheckedSize;

        // Check options until matching minCheck
        if (checksNeeded > 0) {
          variableOptions.slice(0, checksNeeded).forEach((option) => map.set(option.value, true));
        }
      });

      handleChange(nextState);
    };

    const renderOptions = (childrenToRender) =>
      React.Children.map(childrenToRender, (child) => {
        const elementTypeSymbol = getElementTypeSymbol(child);
        if (
          elementTypeSymbol === CHECKBOX_OPTION_TYPE_SYMBOL ||
          elementTypeSymbol === RADIO_OPTION_TYPE_SYMBOL
        ) {
          return React.cloneElement(child, {
            checked: checkedState.get(child.props.value),
            onChange: handleOptionChange,
          });
        }

        if (child && child.type === React.Fragment) {
          return renderOptions(child.props.children);
        }

        return child;
      });

    const renderCheckAllOption = () => (
      <Option
        label={checkAllLabel}
        value={null}
        checked={isAllChecked}
        onChange={handleCheckAllOptionChange}
      />
    );

    return (
      <List
        title={title}
        desc={desc}
        {...wrapperProps}
      >
        {multiple && showCheckAll && renderCheckAllOption()}
        {renderOptions(children)}
      </List>
    );
  },
);

SelectList.propTypes = {
  multiple: PropTypes.bool,
  showCheckAll: PropTypes.bool,
  minCheck: PropTypes.number,
  checkAllLabel: PropTypes.node,
  value: PropTypes.oneOfType([valueType, PropTypes.arrayOf(valueType)]),
  defaultValue: PropTypes.oneOfType([valueType, PropTypes.arrayOf(valueType)]),
  onChange: PropTypes.func,
  title: PropTypes.string,
  desc: PropTypes.node,
};

SelectList.defaultProps = {
  multiple: false,
  showCheckAll: true,
  minCheck: 0,
  checkAllLabel: 'All',
  value: undefined,
  defaultValue: undefined,
  onChange: () => {},
  title: undefined,
  desc: undefined,
};

export default SelectList;
