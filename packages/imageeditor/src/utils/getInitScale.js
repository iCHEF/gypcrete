/**
 * Both `width` and `height` are relative to image dimension,
 * in the range of 0–1.
 *
 * If `width` ratio is larger than `height` ratio, it means the image
 * was scaled based on width. And vice versa.
 *
 * Expects `initCropRect` in the form of results from `editor.getCroppingRect`.
 * @Ref: https://github.com/mosch/react-avatar-editor#accessing-the-cropping-rectangle
 *
 * @param {{ width: number, height: number }} initCropRect
 * @returns {number?}
 */
function getInitScale(initCropRect) {
  if (!initCropRect) return null;

  const { width: widthRatio, height: heightRatio } = initCropRect;
  const isWidthBasedScale = widthRatio > heightRatio;

  const inferredScale = isWidthBasedScale ? (1 / widthRatio) : (1 / heightRatio);

  if (Number.isNaN(inferredScale)) return null;

  // Shrink scale fraction to one digit
  return Number.parseFloat(inferredScale.toFixed(1));
}

export default getInitScale;
