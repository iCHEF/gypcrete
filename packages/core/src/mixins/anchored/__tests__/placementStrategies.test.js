import placementStrategies, {
  getLeftPositionSetForVerticalPlacement,
} from '../placementStrategies';
import PLACEMENT from '../constants/placement';

describe('getLeftPositionSetForVerticalPlacement()', () => {
  /**
   * ┌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┐
   * ╎       □                ╎
   * ╎    ┌╌╌^╌╌┐             ╎
   * ╎    └╌╌╌╌╌┘             ╎
   * └╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┘
   */
  it('returns coord sets for center-align sceanario', () => {
    const result = getLeftPositionSetForVerticalPlacement(
      200, // anchor screen left
      200, // anchor document left
      30, // anchor width
      200, // self width
      8, // edge padding
    );
    expect(result).toEqual({
      selfLeft: 115,
      arrowLeft: 100,
    });
  });

  /**
   * ┌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┐
   * ╎       □                ╎
   * ╎    ┌╌╌^╌╌┐             ╎
   * ╎    └╌╌╌╌╌┘             ╎
   * └╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┘
   */
  it('returns coord sets for center-align sceanario -- when document left is differed from screen', () => {
    const result = getLeftPositionSetForVerticalPlacement(
      200, // anchor screen left
      300, // anchor document left
      30, // anchor width
      200, // self width
      8, // edge padding
    );
    expect(result).toEqual({
      selfLeft: 215,
      arrowLeft: 100,
    });
  });

  /**
   * ┌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┐
   * ╎ □                      ╎
   * ╎┌^╌╌╌╌┐                 ╎
   * ╎└╌╌╌╌╌┘                 ╎
   * └╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┘
   */
  it('returns coord sets for left-align sceanario', () => {
    const result = getLeftPositionSetForVerticalPlacement(
      10, // anchor screen left
      10, // anchor document left
      30, // anchor width
      200, // self width
      8, // edge padding
    );
    expect(result).toEqual({
      selfLeft: 10,
      arrowLeft: 15,
    });
  });

  /**
   * ┌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┐
   * ╎                      □ ╎
   * ╎                 ┌╌╌╌╌^┐╎
   * ╎                 └╌╌╌╌╌┘╎
   * └╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┘
   */
  it('returns coord sets for right-align sceanario', () => {
    const result = getLeftPositionSetForVerticalPlacement(
      980, // anchor screen left
      980, // anchor document left
      30, // anchor width
      200, // self width
      8, // edge padding
    );
    expect(result).toEqual({
      selfLeft: 810,
      arrowLeft: 185,
    });
  });

  /**
   * ┌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┐
   * ╎|                       ╎
   * ╎┌^╌╌╌╌┐                 ╎
   * ╎└╌╌╌╌╌┘                 ╎
   * └╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┘
   */
  it('arrow should stay in safe area for left-align, tiny anchor sceanario', () => {
    const result = getLeftPositionSetForVerticalPlacement(
      10, // anchor screen left
      10, // anchor document left
      10, // anchor width
      200, // self width
      8, // edge padding
    );
    expect(result).toEqual({
      selfLeft: 10,
      arrowLeft: 8, // minimun padding from left edge
    });
  });

  /**
   * ┌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┐
   * ╎                       |╎
   * ╎                 ┌╌╌╌╌^┐╎
   * ╎                 └╌╌╌╌╌┘╎
   * └╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┘
   */
  it('arrow should stay in safe area for right-align, tiny anchor sceanario', () => {
    const result = getLeftPositionSetForVerticalPlacement(
      1010, // anchor screen left
      1010, // anchor document left
      10, // anchor width
      200, // self width
      8, // edge padding
    );
    expect(result).toEqual({
      selfLeft: 820,
      arrowLeft: 192, // minimun padding from right edge
    });
  });
});

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

describe('BOTTOM placement strategy', () => {
  const topPlacementStrategy = placementStrategies[PLACEMENT.BOTTOM];
  describe('getPosition', () => {
    it.each`
      resultTop | anchorTop | anchorHeight | selfHeight | distanceFromAnchor
      ${400}    | ${300}    | ${100}       | ${100}     | ${0}
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
