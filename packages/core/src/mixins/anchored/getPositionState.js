// @ts-check
import documentOffset from 'document-offset';
import placementStrategies from './placementStrategies';
import PLACEMENT from './constants/placement';

export { PLACEMENT };
const { TOP, BOTTOM, LEFT, RIGHT } = PLACEMENT;
export const verticalPlacements = [TOP, BOTTOM];
export const horizontalPlacements = [LEFT, RIGHT];

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
  const possiblePlacements = verticalPlacements.includes(defaultPlacement)
    ? verticalPlacements
    : horizontalPlacements;
  const defaultPlacementResult = placementStrategies[defaultPlacement].canPlace({
    anchorRect,
    selfRect,
    distanceFromAnchor,
  });
  if (defaultPlacementResult.canPlace) {
    return {
      placement: defaultPlacement,
      remainingSpace: defaultPlacementResult.remainingSpace,
    };
  }
  const oppositePlacement = possiblePlacements.find((placement) => placement !== defaultPlacement);
  const oppositePlacementResult = placementStrategies[oppositePlacement].canPlace({
    anchorRect,
    selfRect,
    distanceFromAnchor,
  });
  const placement =
    defaultPlacementResult.remainingSpace >= oppositePlacementResult.remainingSpace
      ? defaultPlacement
      : oppositePlacement;
  return {
    placement,
    remainingSpace:
      placement === defaultPlacement
        ? defaultPlacementResult.remainingSpace
        : oppositePlacementResult.remainingSpace,
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
 * @param {number} edgePadding
 * @returns {(
 *  defaultPlacement: Placement,
 *  anchorNode:HTMLElement,
 *  selfNode:HTMLElement,
 *  distanceFromAnchor: number
 * ) => ResultState}
 */

const getPositionState =
  (edgePadding) =>
  (defaultPlacement, anchorNode, selfNode, distanceFromAnchor = 0) => {
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
      arrowPosition,
    };
  };

export default getPositionState;
