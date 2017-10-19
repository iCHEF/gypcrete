import React from 'react';

/**
 * - Workaround -
 * Fix inline code markdown(`) in withInfo()'s text.
 *
 * @issue https://github.com/storybooks/storybook/issues/1662
 */
function Code({ children }) {
    return (
        <code style={{ backgroundColor: 'rgba(0, 0, 0, .05)' }}>
            {children}
        </code>
    );
}

export default Code;
