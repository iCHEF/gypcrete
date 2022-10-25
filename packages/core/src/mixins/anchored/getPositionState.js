// @ts-check
import documentOffset from 'document-offset';
import placementStrategies from './placementStrategies';
import PLACEMENT from './constants/placement';

export { PLACEMENT };
const { TOP, BOTTOM } = PLACEMENT;

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
 * @returns {{ placement: Placement, remainingSpace: number }}
 */
export function getPlacementAndRemainingSpace({
  defaultPlacement,
  anchorRect,
  selfRect,
  distanceFromAnchor,
}) {
  const {
    canPlace: hasSpaceToPlaceSelfAbove,
    remainingSpace: topSpace,
  } = placementStrategies[TOP].canPlace({
    anchorRect,
    selfRect,
    distanceFromAnchor,
  });
  const {
    canPlace: hasSpaceToPlaceSelfBelow,
    remainingSpace: bottomSpace,
  } = placementStrategies[BOTTOM].canPlace({
    anchorRect,
    selfRect,
    distanceFromAnchor,
  });

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
 * @returns {(
 *  anchorNode:HTMLElement,
 *  selfNode:HTMLElement,
 *  distanceFromAnchor: number
 * ) => ResultState}
 */

const getPositionState = (defaultPlacement, edgePadding) => (
  anchorNode,
  selfNode,
  distanceFromAnchor = 0,
) => {
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

  /** @type {DocumentOffset} */
  const anchorOffset = documentOffset(anchorNode);
  const anchorRect = anchorNode.getBoundingClientRect();
  const selfRect = selfNode.getBoundingClientRect();

  // -------------------------------------
  //   Determine position
  // -------------------------------------

  const { placement, remainingSpace } = getPlacementAndRemainingSpace({
    defaultPlacement,
    anchorRect,
    selfRect,
    distanceFromAnchor,
  });

  /*
  const selfTop = getTopPosition(
    placement,
    anchorOffset.top,
    anchorRect.height,
    selfRect.height,
    distanceFromAnchor,
  );

  const { selfLeft, arrowLeft } = getLeftPositionSet(
    anchorRect.left,
    anchorOffset.left,
    anchorRect.width,
    selfRect.width,
    edgePadding,
  ); */

  const { arrowPosition, position } = placementStrategies[placement].getPosition({
    anchorRect,
    anchorOffset,
    selfRect,
    distanceFromAnchor,
    edgePadding,
  });

  return {
    placement,
    remainingSpace,
    position,
    arrowPosition: {
      left: arrowPosition.left,
    },
  };
};

export default getPositionState;
