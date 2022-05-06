import React from 'react';
import PropTypes from 'prop-types';

import {
  Radio,
  ListRow,
} from '@ichef/gypcrete';

export const valueType = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.number,
  PropTypes.bool,
]);

export const TYPE_SYMBOL = Symbol('RadioSelectOption');

function RadioSelectOption({
  label,
  desc,
  value,
  avatar,
  readOnly,
  checked,
  onChange,
  ...radioProps
}) {
  const handleRadioChange = (event) => {
    onChange(value, event.target.checked);
  };

  return (
    <ListRow>
      <Radio
        checked={checked}
        disabled={readOnly}
        basic={label}
        aside={desc}
        avatar={avatar}
        onChange={handleRadioChange}
        {...radioProps}
      />
    </ListRow>
  );
}

RadioSelectOption.propTypes = {
  label: PropTypes.node.isRequired,
  desc: PropTypes.node,
  value: valueType,
  avatar: PropTypes.node,
  readOnly: PropTypes.bool,
  // Set by <RadioSelectList>
  checked: PropTypes.bool,
  onChange: PropTypes.func,
};

RadioSelectOption.defaultProps = {
  desc: null,
  value: null,
  avatar: null,
  readOnly: false,
  checked: false,
  onChange: () => {},
};

/**
 * The same reason in the SelectOption.js.
 *
 * `react-hot-loader` v4 wraps every single component with a proxy for its
 * internal uses. This breaks the comparison of this component and type from
 * any React.Element, because the later will always be a hot-loader proxy.
 *
 * I'm trying to add a new way for comparison so we can still be sure if an
 * element is created from <SelectOption>.
 */
RadioSelectOption.typeSymbol = TYPE_SYMBOL;

export default RadioSelectOption;
