import documentOffset from 'document-offset';

import getPositionState, {
  getPlacementAndRemainingSpace,
  PLACEMENT,
} from '../getPositionState';

jest.mock('document-offset', () => (
  jest.fn(() => ({ left: 0, top: 0 }))
));

/**
 * Test scenario
 * =============
 * The virtual DOM enviroment provided by Jest + JSDOM is a `window` sized 1024x768.
 * By placing anchor at different places on the virtual window,
 * we can know if `anchored()` is doing its job of deciding position.
 *
 *           1024
 * ┌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┐
 * ╎  ┌╌╌╌╌┐ Anchored       ╎
 * ╎  └╌╌╌╌┘ Component      ╎
 * ╎                        ╎ 768
 * ╎      □ Anchor          ╎
 * ╎                        ╎
 * └╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┘
 */

describe('getPlacement()', () => {
  const { TOP, BOTTOM } = PLACEMENT;
  const runTest = it.each`
        expected  | defaultPlacement | situation                                             | anchorTop | anchorHeight | selfHeight | remainingSpace | distanceFromAnchor
        ${TOP}    | ${TOP}           | ${'enough'}                                           | ${120}    | ${30}        | ${100}     | ${120}         | ${0}
        ${BOTTOM} | ${TOP}           | ${'not enough for top'}                               | ${90}     | ${30}        | ${100}     | ${648}         | ${0}
        ${BOTTOM} | ${TOP}           | ${'not enough for top consider distance from anchor'} | ${100}    | ${30}        | ${100}     | ${638}         | ${10}
        ${TOP}    | ${BOTTOM}        | ${'not enough for bottom'}                            | ${600}    | ${100}       | ${100}     | ${600}         | ${0}
        ${BOTTOM} | ${BOTTOM}        | ${'enough'}                                           | ${300}    | ${100}       | ${100}     | ${368}         | ${0}
        ${BOTTOM} | ${BOTTOM}        | ${'not enough for both, but bottom is larger'}        | ${300}    | ${100}       | ${400}     | ${368}         | ${0}
        ${TOP}    | ${BOTTOM}        | ${'not enough for both, but top is larger'}           | ${450}    | ${100}       | ${500}     | ${450}         | ${0}
    `;

  runTest(
    'returns $expected when default is $defaultVal, and the space is $situation',
    ({
      expected,
      defaultPlacement,
      anchorTop,
      anchorHeight,
      selfHeight,
      remainingSpace,
      distanceFromAnchor,
    }) => {
      const anchorRect = { top: anchorTop, height: anchorHeight };
      const selfRect = { height: selfHeight };
      const result = getPlacementAndRemainingSpace({
        defaultPlacement,
        anchorRect,
        selfRect,
        distanceFromAnchor,
      });
      expect(result.placement).toBe(expected);
      expect(result.remainingSpace).toBe(remainingSpace);
    }
  );
});

describe('getPositionState()', () => {
  const getterFunc = getPositionState(PLACEMENT.TOP, 8);

  it('takes a config set and then returns a getter function', () => {
    expect(typeof getterFunc).toBe('function');
  });

  it('getterFunc returns a fallback config if anchor or self node does not exist', () => {
    const expectedFallback = {
      placement: PLACEMENT.TOP, // equals defaultPlacement
      position: {},
      arrowPosition: {},
    };

    expect(
      getterFunc(document.createElement('div'), null)
    ).toMatchObject(expectedFallback);

    expect(
      getterFunc(null, document.createElement('div'))
    ).toMatchObject(expectedFallback);
  });

  it('getterFunc gathers measurements for anchorNode and selfNode to determine position', () => {
    const anchorNode = document.createElement('div');
    const selfNode = document.createElement('div');

    anchorNode.getBoundingClientRect = jest.fn(() => ({
      width: 30,
      height: 30,
      top: 10,
      right: 40,
      bottom: 40,
      left: 10,
    }));
    selfNode.getBoundingClientRect = jest.fn(() => ({
      width: 200,
      height: 300,
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    }));
    documentOffset.mockReturnValueOnce({
      top: 10,
      left: 10,
    });

    const result = getterFunc(anchorNode, selfNode, 0);

    expect(anchorNode.getBoundingClientRect).toHaveBeenCalled();
    expect(selfNode.getBoundingClientRect).toHaveBeenCalled();
    expect(documentOffset).toHaveBeenLastCalledWith(anchorNode);

    expect(result).toMatchObject({
      placement: PLACEMENT.BOTTOM,
      position: { top: 40, left: 10 },
      arrowPosition: { left: 15 },
    });
  });
});
