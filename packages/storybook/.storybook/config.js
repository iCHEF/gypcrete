import { configure, setAddon } from '@storybook/react';
import { setOptions } from '@storybook/addon-options';
import { setDefaults } from '@storybook/addon-info';

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
     * Remove the header temporary.
     *
     * Since the inline styling is damn strange now,
     * header and preview parts are split into separate shadowed containers.
     *
     * @issue https://github.com/storybooks/storybook/issues/1877
     *
     * #FIXME: wait for storybooks/storybook#1501
     */
    header: false,

    /**
     * Fix <Code> styling
     *
     * #FIXME: wait for storybooks/storybook#1501
     */
    marksyConf: { code: Code }
});

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
