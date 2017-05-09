import { configure, setAddon } from '@kadira/storybook';
import { setOptions } from '@kadira/storybook-addon-options';
import infoAddon, { setDefaults } from '@kadira/react-storybook-addon-info';
import propsTableAddon from './propsTable-addon';

// -------------------------------------
//   Addons
// -------------------------------------

setOptions({
  name: 'iCHEF gypcrete',
  url: 'https://github.com/iCHEF/gypcrete',
  showDownPanel: false
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
