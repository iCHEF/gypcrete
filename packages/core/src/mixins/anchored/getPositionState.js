// @ts-check
import documentOffset from 'document-offset';

const TOP = 'top';
const BOTTOM = 'bottom';
export const PLACEMENT = { TOP, BOTTOM };

/**
 * @typedef {typeof TOP| typeof BOTTOM} Placement
 *
 * @typedef {Object} SelfPosition
 * @prop {number} [top]
 * @prop {number} [left]
 *
 * @typedef {Object} ArrowPosition
 * @prop {number} [left]
 *
 * @typedef {SelfPosition} DocumentOffset
 *
 * @typedef {Object} ResultState
 * @prop {Placement} placement
 * @prop {SelfPosition} position
 * @prop {ArrowPosition} arrowPosition
 */

/**
 * Determine whether *wrapped component* should be placed above or below
 * its *anchor*.
 *
 * @param {Placement} defaultPlacement
 * @param {number} anchorRectTop
 * @param {number} anchorHeight
 * @param {number} selfHeight
 * @returns {{ placement: Placement, remainingSpace: number }}
 */
export function getPlacementAndRemainingSpace(
  defaultPlacement,
  anchorRectTop,
  anchorHeight,
  selfHeight
) {
  const hasSpaceToPlaceSelfAbove = anchorRectTop >= selfHeight;
  const hasSpaceToPlaceSelfBelow = (
    (anchorRectTop + anchorHeight + selfHeight) <= window.innerHeight
  );
  const topSpace = anchorRectTop;
  const bottomSpace = window.innerHeight - anchorRectTop - anchorHeight;
  if (!hasSpaceToPlaceSelfBelow && !hasSpaceToPlaceSelfAbove) {
    return {
      placement: topSpace > bottomSpace ? TOP : BOTTOM,
      remainingSpace: topSpace > bottomSpace ? topSpace : bottomSpace,
    };
  }
  if (defaultPlacement === TOP && !hasSpaceToPlaceSelfAbove) {
    return { placement: BOTTOM, remainingSpace: bottomSpace };
  }
  if (defaultPlacement === BOTTOM && !hasSpaceToPlaceSelfBelow) {
    return { placement: TOP, remainingSpace: topSpace };
  }

  return {
    placement: defaultPlacement,
    remainingSpace: defaultPlacement === TOP ? topSpace : bottomSpace,
  };
}

/**
 * Determine vertical position of *wrapped component*.
 *
 * @param {Placement} placement
 * @param {number} anchorOffsetTop
 * @param {number} anchorHeight
 * @param {number} selfHeight
 */
export function getTopPosition(placement, anchorOffsetTop, anchorHeight, selfHeight) {
  let positionTop = 0;

  if (placement === TOP) {
    // Make sure user can see whole wrapped component when placement is TOP.
    positionTop = Math.max(anchorOffsetTop - selfHeight, 0);
  } else {
    positionTop = anchorOffsetTop + anchorHeight;
  }

  return positionTop;
}

/**
 * Determine horizontal positions of *wrapped component* and its
 * inner *arrow element*.
 *
 * The *arrow element* is expected to point to the center of *anchor element*.
 * It should also horizontally stay inside the “safe area”, which is the width
 * of *wrapped component* deducted by `edgePadding` from both edges.
 *
 ```
        arrow        edge padding
╭╌┊╌╌╌╌╌╌╌/\╌╌╌╌╌╌╌╌┊╌╮
╎ ┊                 ┊ ╎
╎ ┊                 ┊ ╎
╰╌┊╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┊╌╯
    arrow safe area
 ```
 *
 * @param {number} anchorRectLeft
 * @param {number} anchorOffsetLeft
 * @param {number} anchorWidth
 * @param {number} selfWidth
 * @param {number} edgePadding
 */
export function getLeftPositionSet(
  anchorRectLeft,
  anchorOffsetLeft,
  anchorWidth,
  selfWidth,
  edgePadding,
) {
  const anchorHalfWidth = anchorWidth / 2;
  const selfHalfWidth = selfWidth / 2;

  const anchorCenterCoordXOnViewPort = anchorRectLeft + anchorHalfWidth;

  const hasSpaceOnLeftOfAnchorCenter = anchorCenterCoordXOnViewPort >= selfHalfWidth;
  const hasSpaceOnRightOfAnchorCenter = (
    (window.innerWidth - anchorCenterCoordXOnViewPort) >= selfHalfWidth
  );

  let selfLeft = 0;
  let arrowLeft = 0;

  switch (true) {
    // Center-aligned
    case (hasSpaceOnLeftOfAnchorCenter && hasSpaceOnRightOfAnchorCenter):
      selfLeft = (anchorOffsetLeft + anchorHalfWidth) - selfHalfWidth;
      arrowLeft = selfHalfWidth;
      break;

      // Right-align to the anchor
    case (hasSpaceOnLeftOfAnchorCenter && !hasSpaceOnRightOfAnchorCenter):
      selfLeft = (anchorOffsetLeft + anchorWidth) - selfWidth;
      arrowLeft = selfWidth - anchorHalfWidth;
      break;

      // Left-align to the anchor
    default:
      selfLeft = anchorOffsetLeft;
      arrowLeft = anchorHalfWidth;
      break;
  }

  // Calibrate to keep arrow stay in *wrapped component*
  const arrowLeftMin = edgePadding;
  const arrowLeftMax = selfWidth - edgePadding;

  arrowLeft = Math.max(
    arrowLeftMin,
    Math.min(arrowLeft, arrowLeftMax)
  );

  return {
    selfLeft,
    arrowLeft,
  };
}

/**
 * Get position of *wrapped component* based on spacing around
 * the *anchor element*.
 *
 * It returns another getter function, taking `anchorNode` and `selfNode`
 * for computation, so it's possible to memoize it.
 *
 * ClientRect: element's positions related to browser window viewport.
 * Offset: element's position related to document.
 *
 * @param {Placement} defaultPlacement
 * @param {number} edgePadding
 * @returns {(anchorNode:HTMLElement, selfNode:HTMLElement) => ResultState}
 */

const getPositionState = (defaultPlacement, edgePadding) => (anchorNode, selfNode) => {
  if (!anchorNode || !selfNode) {
    return {
      placement: defaultPlacement,
      position: {},
      arrowPosition: {},
    };
  }

  // -------------------------------------
  //   Measuring anchor and self
  // -------------------------------------

  const anchorRect = anchorNode.getBoundingClientRect();
  const selfRect = selfNode.getBoundingClientRect();

  /** @type {DocumentOffset} */
  const anchorOffset = documentOffset(anchorNode);

  // -------------------------------------
  //   Determine position
  // -------------------------------------

  const { placement, remainingSpace } = getPlacementAndRemainingSpace(
    defaultPlacement,
    anchorRect.top,
    anchorRect.height,
    selfRect.height,
  );

  const selfTop = getTopPosition(
    placement,
    anchorOffset.top,
    anchorRect.height,
    selfRect.height,
  );

  const { selfLeft, arrowLeft } = getLeftPositionSet(
    anchorRect.left,
    anchorOffset.left,
    anchorRect.width,
    selfRect.width,
    edgePadding,
  );

  return {
    placement,
    remainingSpace,
    position: {
      top: selfTop,
      left: selfLeft,
    },
    arrowPosition: {
      left: arrowLeft,
    },
  };
};

export default getPositionState;
