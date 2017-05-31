/* eslint-disable import/no-extraneous-dependencies */
import { configure, setAddon } from '@storybook/react';
import { setOptions } from '@storybook/addon-options';
import infoAddon, { setDefaults } from '@storybook/addon-info';
import propsTableAddon from './propsTable-addon';

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
    propTables: false
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
