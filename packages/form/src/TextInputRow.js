/* eslint-disable class-methods-use-this */
import PropTypes from 'prop-types';

import { ListRow, TextInput } from '@ichef/gypcrete';

import formRow, { rowPropTypes } from './mixins/formRow';

/**
 * It's simply a `<TextInput>` inside a `<ListRow>` with vertically-reversed form layout.
 * Most props should go into `<TextInput>`.
 */
function TextInputRow({
  // from formRow()
  readOnly,
  disabled,
  rowProps,
  children,
  ...inputProps
}) {
  const { ineditable, ...otherInputProps } = inputProps; // unwanted prop
  return (
    <ListRow {...rowProps}>
      <TextInput
        readOnly={readOnly}
        disabled={disabled}
        {...otherInputProps}
      />
      {children}
    </ListRow>
  );
}

TextInputRow.propTypes = {
  // from formRow()
  readOnly: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
  rowProps: rowPropTypes.isRequired,
};

export { TextInputRow as PureTextInputRow };
export default formRow()(TextInputRow);
