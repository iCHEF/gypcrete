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
  ...checkboxProps
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
        {...checkboxProps}
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
  // Set by <SelectList>
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

RadioSelectOption.typeSymbol = TYPE_SYMBOL;

export default RadioSelectOption;