import { configure, setAddon } from '@storybook/react';
import { setOptions } from '@storybook/addon-options';
import infoAddon, { setDefaults } from '@storybook/addon-info';

import propsTableAddon from './propsTable-addon';
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

    /**
     * Fix <Code> styling
     *
     * #FIXME: wait for storybooks/storybook#1501
     */
    marksyConf: { code: Code }
});
setAddon(infoAddon);
setAddon(propsTableAddon);

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
