import placementStrategies from '../placementStrategies';
import PLACEMENT from '../constants/placement';

describe('TOP placement strategy', () => {
  const topPlacementStrategy = placementStrategies[PLACEMENT.TOP];
  describe('getPosition', () => {
    it.each`
      resultTop  | anchorTop | anchorHeight | selfHeight | distanceFromAnchor
      ${20}      | ${120}    | ${30}        | ${100}     | ${0}
      ${10}      | ${120}    | ${30}        | ${100}     | ${10}
    `(
      'top value should be $resultTop when placed on TOP of anchor (y=$anchorTop, h=$anchorHeight)',
      ({
        resultTop,
        anchorTop,
        anchorHeight,
        selfHeight,
        distanceFromAnchor,
      }) => {
        const anchorRect = {
          top: anchorTop,
          left: 0,
          width: 100,
          height: anchorHeight,
        };
        const anchorOffset = {
          top: anchorTop,
          left: 0,
        };
        const selfRect = {
          width: 100,
          height: selfHeight,
        };
        const { position } = topPlacementStrategy.getPosition({
          anchorRect,
          anchorOffset,
          selfRect,
          distanceFromAnchor,
          edgePadding: 10,
        });
        expect(position.top).toEqual(resultTop);
      }
    );
  });
});
