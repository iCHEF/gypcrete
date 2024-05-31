import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { ListRow, Switch, TextLabel } from '@ichef/gypcrete';

import formRow, { rowPropTypes } from './mixins/formRow';

/**
 * A row consisting a text label (on the left) and a switch button (on the right).
 * The left value label (`asideOn/Off`) can be updated with the checked state of switch.
 *
 * All unknown props should go to the `<Switch>` from `@ichef/gypcrete` core package.
 */
const SwitchRow = React.memo(
  ({
    label,
    asideOn,
    asideOff,
    // input props
    checked,
    defaultChecked,
    onChange,
    // from formRow()
    ineditable,
    rowProps,
    // react props
    className,
    children,
    ...restProps
  }) => {
    const [checkedState, setCheckedState] = useState(defaultChecked || checked);
    const isControlled = checked !== undefined && checked !== null;
    const switchAside = checkedState ? asideOn : asideOff;

    useEffect(() => {
      setCheckedState(checked);
    }, [checked]);

    const handleSwitchButtonChange = (event) => {
      if (!isControlled) {
        setCheckedState(event.target.checked);
      }
      onChange(event);
    };

    const switchProps = {
      ...restProps,
      checked,
      defaultChecked,
    };

    return (
      <ListRow
        className={className}
        {...rowProps}
      >
        <TextLabel
          disabled={ineditable}
          verticalOrder="reverse"
          basic={switchAside}
          aside={label}
        />

        <Switch
          status={null}
          onChange={handleSwitchButtonChange}
          minified
          {...switchProps}
        />

        {children}
      </ListRow>
    );
  },
);

SwitchRow.propTypes = {
  /** row label */
  label: PropTypes.node.isRequired,
  /** descriptive value label when switch is turned __on__ */
  asideOn: PropTypes.node,
  /** descriptive value label when switch is turned __off__ */
  asideOff: PropTypes.node,
  // input props
  checked: PropTypes.bool,
  defaultChecked: PropTypes.bool,
  onChange: PropTypes.func,
  // from formRow()
  ineditable: PropTypes.bool,
  rowProps: rowPropTypes,
};

SwitchRow.defaultProps = {
  asideOn: 'ON',
  asideOff: 'OFF',
  checked: undefined,
  defaultChecked: undefined,
  onChange: () => {},
  ineditable: false,
  rowProps: {},
};

export { SwitchRow as PureSwitchRow };
export default formRow()(SwitchRow);
