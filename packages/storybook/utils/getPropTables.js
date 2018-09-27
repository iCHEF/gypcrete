import React from 'react';
import { withInfo } from '@storybook/addon-info';

const DEFAULT_OPTIONS = {
    source: false,
};
const EMPTY_COMPONENT = () => <div />;

function getPropTables(components = [], options = {}) {
    return withInfo({
        ...DEFAULT_OPTIONS,
        ...options,
        propTables: components,
    })(EMPTY_COMPONENT);
}

export default getPropTables;
