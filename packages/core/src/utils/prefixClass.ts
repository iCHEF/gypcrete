import isNonEmptyString from './isNonEmptyString';

export const PREFIX = 'gyp';

// Prefix every className with `gyp-` to prevent collision.
function prefixClass(className: string) {
    if (!isNonEmptyString(className)) {
        throw new Error('className should be a non-empty string.');
    }
    return `${PREFIX}-${className}`;
}

export default prefixClass;
