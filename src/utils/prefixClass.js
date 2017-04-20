export const PREFIX = 'gyp';

/**
 * Prefix every className with `gyp-` to prevent collision.
 * @param {String} className
 * @return {String} result
 */
function prefixClass(className) {
    if (!(typeof className === 'string') || !className.length) {
        throw new Error('className should be a non-empty string.');
    }

    return `${PREFIX}-${className}`;
}

export default prefixClass;
