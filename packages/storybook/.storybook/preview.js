import { addParameters } from '@storybook/react';

import getComponentProps from '../utils/getComponentProps';
import Code from './Code';

addParameters({
    docs: {
        extractProps: component => ({
            rows: getComponentProps(component),
        }),
    },

    // legacy addon
    info: {
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
    },
});
