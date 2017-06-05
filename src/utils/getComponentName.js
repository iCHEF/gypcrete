// @flow
import type { Component as ComponentType } from 'react-flow-types';

/**
 * Get name of a React Component.
 *
 * @param {Component} Component
 * @return {String} componentName
 */
function getComponentName(Component: ComponentType<{ [string]: any }>): string {
    if (!Component) {
        throw new Error('Cannot read name. Please pass in a valid React Component.');
    }
    const componentName = Component.displayName
        || Component.name
        || 'Component';

    return componentName;
}

export default getComponentName;
