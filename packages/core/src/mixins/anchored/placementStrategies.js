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
export function getLeftPositionSetForVerticalPlacement(
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
 * Determine vertical positions of *wrapped component* and its
 * inner *arrow element*.
 *
 * The *arrow element* is expected to point to the center of *anchor element*.
 * It should also vertically stay inside the “safe area”, which is the height
 * of *wrapped component* deducted by `edgePadding` from both edges.
 *
 * Also see the diagram of `getLeftPositionSetForVerticalPlacement` and turn it 90 degrees.
 *
 * @param {number} anchorRectTop
 * @param {number} anchorOffsetTop
 * @param {number} anchorHeight
 * @param {number} selfHeight
 * @param {number} edgePadding
 */
export function getTopPositionSetForHorizontalPlacement(
  anchorRectTop,
  anchorOffsetTop,
  anchorHeight,
  selfHeight,
  edgePadding,
) {
  const anchorHalfHeight = anchorHeight / 2;
  const selfHalfHeight = selfHeight / 2;

  const anchorCenterCoordYOnViewPort = anchorRectTop + anchorHalfHeight;

  const hasSpaceOnTopOfAnchorCenter = anchorCenterCoordYOnViewPort >= selfHalfHeight;
  const hasSpaceOnBottomOfAnchorCenter = (
    (window.innerHeight - anchorCenterCoordYOnViewPort) >= selfHalfHeight
  );

  let selfTop = 0;
  let arrowTop = 0;

  switch (true) {
    // Center-aligned
    case (hasSpaceOnTopOfAnchorCenter && hasSpaceOnBottomOfAnchorCenter):
      selfTop = (anchorOffsetTop + anchorHalfHeight) - selfHalfHeight;
      arrowTop = selfHalfHeight;
      break;

    // Bottom-align to the anchor
    case (hasSpaceOnTopOfAnchorCenter && !hasSpaceOnBottomOfAnchorCenter):
      selfTop = (anchorOffsetTop + anchorHeight) - selfHeight;
      arrowTop = selfHeight - anchorHalfHeight;
      break;

    // Top-align to the anchor
    default:
      selfTop = anchorOffsetTop;
      arrowTop = anchorHalfHeight;
      break;
  }

  // Calibrate to keep arrow stay in *wrapped component*
  const arrowTopMin = edgePadding;
  const arrowTopMax = selfHeight - edgePadding;

  arrowTop = Math.max(
    arrowTopMin,
    Math.min(arrowTop, arrowTopMax)
  );

  return {
    selfTop,
    arrowTop,
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
    const { arrowLeft, selfLeft } = getLeftPositionSetForVerticalPlacement(
      anchorRect.left,
      anchorOffset.left,
      anchorRect.width,
      selfRect.width,
      edgePadding,
    );

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
    const { arrowLeft, selfLeft } = getLeftPositionSetForVerticalPlacement(
      anchorRect.left,
      anchorOffset.left,
      anchorRect.width,
      selfRect.width,
      edgePadding,
    );

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

const rightPlacementStrategy = {
  canPlace: ({
    anchorRect,
    selfRect,
    distanceFromAnchor,
  }) => ({
    canPlace: (
      (
        anchorRect.left
        + anchorRect.width
        + selfRect.width
        + distanceFromAnchor
      ) <= window.innerWidth
    ),
    remainingSpace: window.innerWidth - anchorRect.left - anchorRect.width,
  }),
  getPosition: ({ anchorRect, anchorOffset, selfRect, distanceFromAnchor, edgePadding }) => {
    const { arrowTop, selfTop } = getTopPositionSetForHorizontalPlacement(
      anchorRect.top,
      anchorOffset.top,
      anchorRect.height,
      selfRect.height,
      edgePadding,
    );
    return {
      position: {
        top: selfTop,
        left: anchorOffset.left + anchorRect.width + distanceFromAnchor,
      },
      arrowPosition: {
        top: arrowTop,
        left: -distanceFromAnchor,
      },
    };
  },
};

const leftPlacementStrategy = {
  canPlace: ({
    anchorRect,
    selfRect,
    distanceFromAnchor,
  }) => ({
    canPlace: (
      (
        selfRect.width
        + distanceFromAnchor
      ) <= anchorRect.left
    ),
    remainingSpace: anchorRect.left,
  }),
  getPosition: ({ anchorRect, anchorOffset, selfRect, distanceFromAnchor, edgePadding }) => {
    const { arrowTop, selfTop } = getTopPositionSetForHorizontalPlacement(
      anchorRect.top,
      anchorOffset.top,
      anchorRect.height,
      selfRect.height,
      edgePadding,
    );
    return {
      position: {
        top: selfTop,
        left: anchorOffset.left - selfRect.width - distanceFromAnchor,
      },
      arrowPosition: {
        top: arrowTop,
        left: selfRect.width,
      },
    };
  },
};

const placementStrategies = {
  [PLACEMENT.TOP]: topPlacementStrategy,
  [PLACEMENT.LEFT]: leftPlacementStrategy,
  [PLACEMENT.BOTTOM]: bottomPlacementStrategy,
  [PLACEMENT.RIGHT]: rightPlacementStrategy,
};

export default placementStrategies;
