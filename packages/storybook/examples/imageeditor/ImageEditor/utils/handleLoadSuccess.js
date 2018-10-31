import { action } from '@storybook/addon-actions';

/**
 * Patch the original `imgInfo` to prevent logging the complete
 * `HTMLImageElement` node, since it's way too large.
 */
function handleLoadSuccess({ resource, ...imgInfo }) {
    const patchedImgInfo = {
        ...imgInfo,
        resource: '[HTMLImageElement]',
    };

    return action('loadSuccess')(patchedImgInfo);
}

export default handleLoadSuccess;
