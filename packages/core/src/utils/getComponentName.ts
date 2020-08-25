import React from 'react';
/**
 * Get name of a React Component.
 */
function getComponentName(Component: React.ComponentType<any>) {
    const componentName = Component.displayName
        || Component.name
        || 'Component';

    return componentName;
}

export default getComponentName;
