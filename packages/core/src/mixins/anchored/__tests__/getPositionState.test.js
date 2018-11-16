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

describe('getLeftPositionSet()', () => {
    /**
     * ┌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┐
     * ╎       □                ╎
     * ╎    ┌╌╌^╌╌┐             ╎
     * ╎    └╌╌╌╌╌┘             ╎
     * └╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┘
     */
    it('returns coord sets for center-align sceanario', () => {
        const result = getLeftPositionSet(
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
     * ╎ □                      ╎
     * ╎┌^╌╌╌╌┐                 ╎
     * ╎└╌╌╌╌╌┘                 ╎
     * └╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┘
     */
    it('returns coord sets for left-align sceanario', () => {
        const result = getLeftPositionSet(
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
        const result = getLeftPositionSet(
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
        const result = getLeftPositionSet(
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
        const result = getLeftPositionSet(
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
