import React from 'react';
import { withInfo } from '@storybook/addon-info';

const DEFAULT_OPTIONS = {
  source: false,
};
const EMPTY_COMPONENT = () => <div />;

export function getAddonOptions(components = []) {
  return {
    ...DEFAULT_OPTIONS,
    propTables: components,
  };
}

function getPropTables(components, options = {}) {
  return [
    withInfo({
      ...getAddonOptions(components),
      ...options,
    })(EMPTY_COMPONENT),
    {
      info: {
        propTables: components,
      },
    },
  ];
}

export default getPropTables;
