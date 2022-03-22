import { action } from '@storybook/addon-actions';

/**
 * Hides original event payload to keep performance.
 *
 * Since this is expected to be called multiple times per second,
 * logging the whole payload would make browser to slow down.
 * Log without payload prevents the later to be laggy.
 */
function handleCropChange() {
  return action('cropChange')('[Cropping Rect]');
}

export default handleCropChange;
