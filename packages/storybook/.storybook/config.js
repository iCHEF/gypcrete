import { configure } from '@storybook/react';
import { setOptions } from '@storybook/addon-options';
import { setDefaults } from '@storybook/addon-info';

import Code from './Code';

// -------------------------------------
//   Addons
// -------------------------------------

setOptions({
    name: 'iCHEF gypcrete',
    url: 'https://github.com/iCHEF/gypcrete',
    showDownPanel: true,
});

setDefaults({
    inline: true,
    propTables: false,
    styles: {
        infoStory: {
            margin: 30,
        },
        infoBody: {
            padding: '0 30px',
            border: 'none',
            boxShadow: 'none',
        },
    },
    components: { codespan: Code },
});

// -------------------------------------
//   Load Stories
// -------------------------------------

const reqContext = require.context(
    '../examples/',
    true,
    /index\.js$/
);

function loadStories() {
    reqContext.keys().forEach(reqContext);
}

configure(loadStories, module);
