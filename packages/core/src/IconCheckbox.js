import React from 'react';

import IconLayout from './IconLayout';
import Checkbox, { CHECKBOX_BUTTON } from './Checkbox';

/**
 * <IconCheckbox>
 * ===
 *
 * `<IconCheckbox>` is a variant of `<Checkbox>`.
 */
function IconCheckbox(props) {
  const buttonWithStatus = <IconLayout icon={CHECKBOX_BUTTON} />;

  return (
    <Checkbox
      minified
      overrideButton={buttonWithStatus}
      {...props}
    >
      <span />
      {' ' /* to trick <RowComp> from rendering default content */}
    </Checkbox>
  );
}

export default IconCheckbox;
