import PLACEMENT from './constants/placement';

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
export function getLeftPositionSetForVerticalPlacement({
  anchorOffset,
  anchorRect,
  selfRect,
  edgePadding,
}) {
  const anchorHalfWidth = anchorRect.width / 2;
  const selfHalfWidth = selfRect.width / 2;

  const anchorCenterCoordXOnViewPort = anchorRect.left + anchorHalfWidth;

  const hasSpaceOnLeftOfAnchorCenter = anchorCenterCoordXOnViewPort >= selfHalfWidth;
  const hasSpaceOnRightOfAnchorCenter = (
    (window.innerWidth - anchorCenterCoordXOnViewPort) >= selfHalfWidth
  );

  let selfLeft = 0;
  let arrowLeft = 0;

  switch (true) {
    // Center-aligned
    case (hasSpaceOnLeftOfAnchorCenter && hasSpaceOnRightOfAnchorCenter):
      selfLeft = (anchorOffset.left + anchorHalfWidth) - selfHalfWidth;
      arrowLeft = selfHalfWidth;
      break;

      // Right-align to the anchor
    case (hasSpaceOnLeftOfAnchorCenter && !hasSpaceOnRightOfAnchorCenter):
      selfLeft = (anchorOffset.left + anchorOffset.width) - selfRect.width;
      arrowLeft = selfRect.width - anchorHalfWidth;
      break;

      // Left-align to the anchor
    default:
      selfLeft = anchorOffset.left;
      arrowLeft = anchorHalfWidth;
      break;
  }

  // Calibrate to keep arrow stay in *wrapped component*
  const arrowLeftMin = edgePadding;
  const arrowLeftMax = selfRect.width - edgePadding;

  arrowLeft = Math.max(
    arrowLeftMin,
    Math.min(arrowLeft, arrowLeftMax)
  );

  return {
    selfLeft,
    arrowLeft,
  };
}

export const topPlacementStrategy = {
  canPlace: ({
    anchorRect,
    selfRect,
    distanceFromAnchor,
  }) => ({
    canPlace: anchorRect.top >= selfRect.height + distanceFromAnchor,
    remainingSpace: anchorRect.top,
  }),

  getPosition: ({ anchorRect, anchorOffset, selfRect, distanceFromAnchor, edgePadding }) => {
    const { arrowLeft, selfLeft } = getLeftPositionSetForVerticalPlacement({
      anchorRect,
      anchorOffset,
      selfRect,
      edgePadding,
    });

    return {
      position: {
        top: Math.max(anchorOffset.top - selfRect.height - distanceFromAnchor, 0),
        left: selfLeft,
      },
      arrowPosition: {
        top: selfRect.height,
        left: arrowLeft,
      },
    };
  },
};

export const bottomPlacementStrategy = {
  canPlace: ({
    anchorRect,
    selfRect,
    distanceFromAnchor,
  }) => ({
    canPlace: (
      (
        anchorRect.top
        + anchorRect.height
        + selfRect.height
        + distanceFromAnchor
      ) <= window.innerHeight
    ),
    remainingSpace: window.innerHeight - anchorRect.top - anchorRect.height,
  }),

  getPosition: ({ anchorRect, anchorOffset, selfRect, distanceFromAnchor, edgePadding }) => {
    const { arrowLeft, selfLeft } = getLeftPositionSetForVerticalPlacement({
      anchorRect,
      anchorOffset,
      selfRect,
      edgePadding,
    });

    return {
      position: {
        top: anchorOffset.top + anchorRect.height + distanceFromAnchor,
        left: selfLeft,
      },
      arrowPosition: {
        top: 0,
        left: arrowLeft,
      },
    };
  },
};

const placementStrategies = {
  [PLACEMENT.TOP]: topPlacementStrategy,
  [PLACEMENT.BOTTOM]: bottomPlacementStrategy,
};

export default placementStrategies;
