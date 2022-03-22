/**
 * Get the center position of cropped image,
 * relative to image dimension in the range of 0–1.
 *
 * Expects `initCropRect` in the form of results from `editor.getCroppingRect`.
 * Ref: https://github.com/mosch/react-avatar-editor#accessing-the-cropping-rectangle
 *
 * @param {{ x: number, y: number, width: number, height: number}} initCropRect
 * @returns {{ x: number, y: number }}
 */
function getInitPosition(initCropRect) {
  if (!initCropRect) return null;

  const {
    x: xRatio,
    y: yRatio,
    width: widthRatio,
    height: heightRatio,
  } = initCropRect;

  return {
    x: xRatio + (widthRatio / 2),
    y: yRatio + (heightRatio / 2),
  };
}

export default getInitPosition;
