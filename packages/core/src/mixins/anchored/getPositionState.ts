// @ts-check
import documentOffset from 'document-offset';

const TOP = 'top';
const BOTTOM = 'bottom';
export type Placement = typeof TOP | typeof BOTTOM;
export const PLACEMENT = { TOP, BOTTOM };

/**
 * Determine whether *wrapped component* should be placed above or below
 * its *anchor*.
 */
export function getPlacement(
    defaultPlacement: Placement,
    anchorRectTop: number,
    anchorHeight: number,
    selfHeight: number
) {
    const hasSpaceToPlaceSelfAbove = anchorRectTop >= selfHeight;
    const hasSpaceToPlaceSelfBelow = (
        (anchorRectTop + anchorHeight + selfHeight) <= window.innerHeight
    );

    if (defaultPlacement === TOP && !hasSpaceToPlaceSelfAbove) {
        return BOTTOM;
    }
    if (defaultPlacement === BOTTOM && !hasSpaceToPlaceSelfBelow) {
        return TOP;
    }

    return defaultPlacement;
}

/**
 * Determine vertical position of *wrapped component*.
 */
export function getTopPosition(
    placement: Placement,
    anchorOffsetTop: number,
    anchorHeight: number,
    selfHeight: number
) {
    let positionTop = 0;

    if (placement === TOP) {
        positionTop = anchorOffsetTop - selfHeight;
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
 */
export function getLeftPositionSet(
    anchorRectLeft: number,
    anchorOffsetLeft: number,
    anchorWidth: number,
    selfWidth: number,
    edgePadding: number,
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

export type PositionState = {
    placement: Placement,
    position: {
        top?: number,
        left?: number,
    },
    arrowPosition: {
        left?: number,
    },
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
 */
const getPositionState = (
    defaultPlacement: Placement,
    edgePadding: number
) => (anchorNode: HTMLElement, selfNode: HTMLElement): PositionState => {
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

    const placement = getPlacement(
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
