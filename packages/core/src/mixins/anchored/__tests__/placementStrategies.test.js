import placementStrategies, {
  getLeftPositionSetForVerticalPlacement, getTopPositionSetForHorizontalPlacement,
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

describe('getTopPositionSetForHorizontalPlacement()', () => {
  /**
   * 和 getLeftPositionSetForVerticalPlacement 的 test case 類似，
   * 故不另繪示意圖，以下示意圖請右轉九十度觀看。
   * ┌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┐
   * ╎       □                ╎
   * ╎    ┌╌╌^╌╌┐             ╎
   * ╎    └╌╌╌╌╌┘             ╎
   * └╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┘
   */
  it('returns coord sets for center-align sceanario', () => {
    const result = getTopPositionSetForHorizontalPlacement(
      200, // anchor screen top
      200, // anchor document top
      30, // anchor height
      200, // self height
      8, // edge padding
    );
    expect(result).toEqual({
      selfTop: 115,
      arrowTop: 100,
    });
  });

  /**
   * ┌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┐
   * ╎       □                ╎
   * ╎    ┌╌╌^╌╌┐             ╎
   * ╎    └╌╌╌╌╌┘             ╎
   * └╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┘
   */
  it('returns coord sets for center-align sceanario -- when document top is differed from screen', () => {
    const result = getTopPositionSetForHorizontalPlacement(
      200, // anchor screen top
      300, // anchor document top
      30, // anchor height
      200, // self height
      8, // edge padding
    );
    expect(result).toEqual({
      selfTop: 215,
      arrowTop: 100,
    });
  });

  /**
   * ┌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┐
   * ╎ □                      ╎
   * ╎┌^╌╌╌╌┐                 ╎
   * ╎└╌╌╌╌╌┘                 ╎
   * └╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┘
   */
  it('returns coord sets for top-align sceanario', () => {
    const result = getTopPositionSetForHorizontalPlacement(
      10, // anchor screen top
      10, // anchor document top
      30, // anchor height
      200, // self height
      8, // edge padding
    );
    expect(result).toEqual({
      selfTop: 10,
      arrowTop: 15,
    });
  });

  /**
   * ┌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┐
   * ╎                      □ ╎
   * ╎                 ┌╌╌╌╌^┐╎
   * ╎                 └╌╌╌╌╌┘╎
   * └╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┘
   */
  it('returns coord sets for bottom-align sceanario', () => {
    const result = getTopPositionSetForHorizontalPlacement(
      980, // anchor screen top
      980, // anchor document top
      30, // anchor height
      200, // self height
      8, // edge padding
    );
    expect(result).toEqual({
      selfTop: 810,
      arrowTop: 185,
    });
  });

  /**
   * ┌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┐
   * ╎|                       ╎
   * ╎┌^╌╌╌╌┐                 ╎
   * ╎└╌╌╌╌╌┘                 ╎
   * └╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┘
   */
  it('arrow should stay in safe area for top-align, tiny anchor sceanario', () => {
    const result = getTopPositionSetForHorizontalPlacement(
      10, // anchor screen top
      10, // anchor document top
      10, // anchor height
      200, // self height
      8, // edge padding
    );
    expect(result).toEqual({
      selfTop: 10,
      arrowTop: 8, // minimun padding from top edge
    });
  });

  /**
   * ┌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┐
   * ╎                       |╎
   * ╎                 ┌╌╌╌╌^┐╎
   * ╎                 └╌╌╌╌╌┘╎
   * └╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┘
   */
  it('arrow should stay in safe area for bottom-align, tiny anchor sceanario', () => {
    const result = getTopPositionSetForHorizontalPlacement(
      1010, // anchor screen top
      1010, // anchor document top
      10, // anchor height
      200, // self height
      8, // edge padding
    );
    expect(result).toEqual({
      selfTop: 820,
      arrowTop: 192, // minimun padding from bottom edge
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

describe('left placement strategy', () => {
  const leftPlacementStrategy = placementStrategies[PLACEMENT.LEFT];
  describe('getPosition', () => {
    it.each`
      resultLeft | anchorLeft | anchorWidth  | selfWidth  | distanceFromAnchor
      ${20}      | ${120}     | ${30}        | ${100}     | ${0}
      ${10}      | ${120}     | ${30}        | ${100}     | ${10}
    `(
      'left value should be $resultLeft when placed on LEFT of anchor (y=$anchorLeft, h=$anchorWidth)',
      ({
        resultLeft,
        anchorLeft,
        anchorWidth,
        selfWidth,
        distanceFromAnchor,
      }) => {
        const anchorRect = {
          left: anchorLeft,
          top: 0,
          width: anchorWidth,
          height: 100,
        };
        const anchorOffset = {
          top: 0,
          left: anchorLeft,
        };
        const selfRect = {
          width: 100,
          height: selfWidth,
        };
        const { position } = leftPlacementStrategy.getPosition({
          anchorRect,
          anchorOffset,
          selfRect,
          distanceFromAnchor,
          edgePadding: 10,
        });
        expect(position.left).toEqual(resultLeft);
      }
    );
  });
});
