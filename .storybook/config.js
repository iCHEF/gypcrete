import { configure } from '@kadira/storybook';

const stories = require.context(
    '../examples',
    true,
    /index\.js$/
);

function loadStories() {
    stories.keys().forEach(stories);
}

configure(loadStories, module);
