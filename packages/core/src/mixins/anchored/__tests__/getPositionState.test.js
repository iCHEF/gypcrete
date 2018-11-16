import getPositionState, {
    getPlacement,
    getTopPosition,
    getLeftPositionSet,
    PLACEMENT,
} from '../getPositionState';

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
        expected  | defaultVal | situation       | anchorTop | anchorHeight | selfHeight
        ${TOP}    | ${TOP}     | ${'enough'}     | ${120}    | ${30}        | ${100}
        ${BOTTOM} | ${TOP}     | ${'not enough'} | ${90}     | ${30}        | ${100}
        ${TOP}    | ${BOTTOM}  | ${'not enough'} | ${600}    | ${100}       | ${100}
        ${BOTTOM} | ${BOTTOM}  | ${'enough'}     | ${300}    | ${100}       | ${100}
    `;

    runTest(
        'returns $expected when default is $defaultVal, and there is $situation space',
        ({ expected, defaultVal, anchorTop, anchorHeight, selfHeight }) => {
            const result = getPlacement(
                defaultVal,
                anchorTop,
                anchorHeight,
                selfHeight,
            );
            expect(result).toBe(expected);
        }
    );
});

describe('getTopPosition()', () => {
    const { TOP, BOTTOM } = PLACEMENT;
    const runTest = it.each`
        expected  | placement  | anchorTop | anchorHeight | selfHeight
        ${20}     | ${TOP}     | ${120}    | ${30}        | ${100}
        ${400}    | ${BOTTOM}  | ${300}    | ${100}       | ${100}
    `;

    runTest(
        'returns $expected when placed on $placement of anchor (y=$anchorTop, h=$anchorHeight)',
        ({ expected, placement, anchorTop, anchorHeight, selfHeight }) => {
            const result = getTopPosition(
                placement,
                anchorTop,
                anchorHeight,
                selfHeight,
            );
            expect(result).toBe(expected);
        }
    );
});
