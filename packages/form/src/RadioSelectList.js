import React from 'react';
import PropTypes from 'prop-types';

import { valueType } from './RadioSelectOption';
import SelectList from './SelectList';


export default function RadioSelectList({
  // TODO: omit
  ...otherProps
}) {
  return (
    <SelectList
      {...otherProps}
      multiple={false}
      showCheckAll={false}
      checkAllLabel={null}
      minCheck={0}
    />
  );
}

RadioSelectList.propTypes = {
  value: valueType,
  defaultValue: valueType,
  onChange: PropTypes.func,
  title: PropTypes.string,
  desc: PropTypes.node,
};

RadioSelectList.defaultProps = {
  value: undefined,
  defaultValue: undefined,
  onChange: () => {},
  title: undefined,
  desc: undefined,
};
