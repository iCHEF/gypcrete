// @flow
import prefixClass from './prefixClass';

/**
 * Prefix anything passed-in with 'gyp-state-'.
 *
 * @param {String} state
 * @return {String} result
 */
function prefixState(state: string): string {
    if (!(typeof state === 'string') || !state.length) {
        throw new Error('state should be a non-empty string.');
    }

    return prefixClass(`state-${state}`);
}

export default prefixState;
