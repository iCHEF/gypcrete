import PropTypes from 'prop-types';

import { valueType } from './RadioSelectOption';
import SelectList from './SelectList';

export default function RadioSelectList({
  value,
  defaultValue,
  onChange,
  title,
  desc,
  ...otherProps
}) {
  return (
    <SelectList
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
      title={title}
      desc={desc}
      {...otherProps}
      // default props for RadioSelectList
      multiple={false}
      showCheckAll={false}
      checkAllLabel={null}
      minCheck={undefined}
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
