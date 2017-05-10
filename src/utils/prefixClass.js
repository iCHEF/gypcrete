// @flow
export const PREFIX = 'gyp';

// Prefix every className with `gyp-` to prevent collision.
function prefixClass(className: string) {
    return `${PREFIX}-${className}`;
}

export default prefixClass;
