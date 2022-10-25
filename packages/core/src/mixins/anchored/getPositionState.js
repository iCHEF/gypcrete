// @ts-check
import documentOffset from 'document-offset';
import placementStrategies from './placementStrategies';
import PLACEMENT from './constants/placement';

export { PLACEMENT };
const { TOP, BOTTOM, LEFT, RIGHT } = PLACEMENT;
const verticalPlacements = [TOP, BOTTOM];
const horizontalPlacements = [LEFT, RIGHT];

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
export function getPlacementAndRemainingSpaceImpl({
  possiblePlacements,
  defaultPlacement,
  anchorRect,
  selfRect,
  distanceFromAnchor,
}) {
  const {
    canPlace,
    remainingSpace,
  } = placementStrategies[defaultPlacement].canPlace({
    anchorRect,
    selfRect,
    distanceFromAnchor,
  });
  if (canPlace) {
    return {
      placement: defaultPlacement,
      remainingSpace,
    };
  }
  const oppositePlacement = possiblePlacements.find(placement => placement !== defaultPlacement);
  const {
    canPlace: canPlaceInOpposite,
    remainingSpace: remainingSpaceInOpposite,
  } = placementStrategies[oppositePlacement].canPlace({
    anchorRect,
    selfRect,
    distanceFromAnchor,
  });
  if (canPlaceInOpposite) {
    return {
      placement: oppositePlacement,
      remainingSpace: remainingSpaceInOpposite,
    };
  }
  const placementWithLargerRemaingSpace = (
    remainingSpace >= remainingSpaceInOpposite
      ? defaultPlacement
      : oppositePlacement
  );
  return {
    placement: placementWithLargerRemaingSpace,
    remainingSpace: (
      placementWithLargerRemaingSpace === defaultPlacement
        ? remainingSpace
        : remainingSpaceInOpposite
    ),
  };
}

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
  const possiblePlacements = (
    verticalPlacements.includes(defaultPlacement)
      ? verticalPlacements
      : horizontalPlacements
  );
  return getPlacementAndRemainingSpaceImpl({
    possiblePlacements,
    defaultPlacement,
    anchorRect,
    selfRect,
    distanceFromAnchor,
  });
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
