export const topPlacementStrategy = {
  canPlace: ({
    anchorRect,
    selfRect,
    distanceFromAnchor,
  }) => ({
    canPlace: anchorRect.top >= selfRect.height + distanceFromAnchor,
    remainingSpace: anchorRect.top,
  }),
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
};
