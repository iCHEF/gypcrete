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
    // @ts-expect-error ts-migrate(2769) FIXME: Property 'icon' does not exist on type 'IntrinsicA... Remove this comment to see the full error message
    const buttonWithStatus = <IconLayout icon={CHECKBOX_BUTTON} />;

    return (
        <Checkbox
            minified
            overrideButton={buttonWithStatus}
            {...props}>
            <span />
            {' ' /* to trick <RowComp> from rendering default content */}
        </Checkbox>
    );
}

export default IconCheckbox;
