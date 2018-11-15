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

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { mount } from 'enzyme';

import anchored, {
    anchoredPropTypes,
    ANCHORED_PLACEMENT,
} from '../anchored';

// --------------------
//  Mocking components
// --------------------
const BOX_SIZE = 100;
const ANCHOR_SIZE_SMALL = 20;
const ANCHOR_SIZE_LARGE = 200;

// Anchor component
const Anchor = React.forwardRef(({ top, left, large }, ref) => {
    const anchorSize = large ? ANCHOR_SIZE_LARGE : ANCHOR_SIZE_SMALL;

    const style = {
        width: anchorSize,
        height: anchorSize,
        position: 'absolute',
        top,
        left,
    };
    return <div id="anchor" style={style} ref={ref} />;
});
Anchor.propTypes = {
    top: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired,
    large: PropTypes.bool,
};
Anchor.defaultProps = {
    large: false,
};

// Positioned “wrapped” component
function Box({ style, nodeRef }) {
    const boxStyle = {
        ...style,
        width: BOX_SIZE,
        height: BOX_SIZE,
    };
    return <div style={boxStyle} ref={nodeRef} />;
}
Box.propTypes = {
    nodeRef: anchoredPropTypes.nodeRef.isRequired,
};

const AnchoredBoxBottom = anchored()(Box);
const AnchoredBoxTop = anchored({ defaultPlacement: ANCHORED_PLACEMENT.TOP })(Box);

/**
 * Overrides the one shiped with `jsdom`, since it always return 0.
 */
HTMLElement.prototype.getBoundingClientRect = function getBoundingClientRect() {
    if (!this.style) {
        return {
            bottom: 0,
            height: 0,
            left: 0,
            right: 0,
            top: 0,
            width: 0,
        };
    }

    const rect = {
        width: parseInt(this.style.width, 10),
        height: parseInt(this.style.height, 10),
        top: parseInt(this.style.top, 10) || 0,
        left: parseInt(this.style.left, 10) || 0,
    };

    rect.bottom = rect.top + rect.height;
    rect.right = rect.left + rect.width;

    return rect;
};

// --------------------
//  Prepare env
// --------------------
/**
 * Prepare different containers for each component, since `mount({ attachTo: node })` method
 * will wipe out everything in that `node`, replacing the formerly-rendered content.
 */
const anchorRoot = document.createElement('div');
const boxRoot = document.createElement('div');

anchorRoot.id = 'anchor-root';
boxRoot.id = 'box-root';

document.body.appendChild(anchorRoot);
document.body.appendChild(boxRoot);

// --------------------
//  Test cases
// --------------------

it('renders without crashing', () => {
    const div = document.createElement('div');
    const element = <AnchoredBoxBottom />;

    ReactDOM.render(element, div);
});

it('takes an HTMLElement as anchor', async () => {
    /**
     * Enzyme weirdly passes an instance of `WrapperComponent` to React ref
     * when you directly mounts:
     * ```js
     * mount(<div ref={(ref) => { console.log(ref); }} />);
     * // console prints: WrapperComponent
     * ```
     *
     * But if you wrap the ref-target element with another layer of wrapper,
     * if receives correct HTMLDivElement.
     */
    const anchorRef = React.createRef();
    mount(
        <><Anchor top={10} left={10} ref={anchorRef} /></>,
        { attachTo: anchorRoot }
    );

    const wrapper = mount(<AnchoredBoxTop anchor={anchorRef.current} />);

    expect(wrapper.find(Box).exists()).toBeTruthy();
    expect(wrapper.instance().getAnchorDOMNode()).toBe(anchorRef.current);
});

it('re-adjusts position when assigned with another anchor', () => {
    const anchorRefOne = React.createRef();
    const anchorRefTwo = React.createRef();
    mount(
        <>
            <Anchor top={20} left={10} ref={anchorRefOne} />
            <Anchor top={200} left={10} ref={anchorRefTwo} />
        </>,
        { attachTo: anchorRoot }
    );

    const wrapper = mount(<AnchoredBoxTop anchor={anchorRefOne.current} />);
    expect(wrapper.find(Box).prop('placement')).toBe(ANCHORED_PLACEMENT.BOTTOM);

    // Should not re-adjust if anchor remains the same
    wrapper.setProps({ foo: true });
    expect(wrapper.find(Box).prop('placement')).toBe(ANCHORED_PLACEMENT.BOTTOM);

    // Should re-adjust when anchor changes
    wrapper.setProps({ anchor: anchorRefTwo.current });
    expect(wrapper.find(Box).prop('placement')).toBe(ANCHORED_PLACEMENT.TOP);
});

describe('Vertical placement', () => {
    it('renders above when anchor placed near bottom of viewport', () => {
        const anchorRef = React.createRef();
        mount(
            <><Anchor top={700} left={100} ref={anchorRef} /></>,
            { attachTo: anchorRoot }
        );

        let boxWrapper = mount(
            <AnchoredBoxTop anchor={anchorRef.current} />,
            { attachTo: boxRoot }
        ).find(Box);

        expect(boxWrapper.prop('placement')).toBe(ANCHORED_PLACEMENT.TOP);
        expect(boxWrapper.prop('style').top).toBe(700 - BOX_SIZE);

        boxWrapper = mount(
            <AnchoredBoxBottom anchor={anchorRef.current} />,
            { attachTo: boxRoot }
        ).find(Box);

        expect(boxWrapper.prop('placement')).toBe(ANCHORED_PLACEMENT.TOP);
        expect(boxWrapper.prop('style').top).toBe(700 - BOX_SIZE);
    });

    it('renders below when anchor placed near top of viewport', () => {
        const anchorRef = React.createRef();
        mount(
            <><Anchor top={50} left={100} ref={anchorRef} /></>,
            { attachTo: anchorRoot }
        );

        let boxWrapper = mount(
            <AnchoredBoxTop anchor={anchorRef.current} />,
            { attachTo: boxRoot }
        ).find(Box);

        expect(boxWrapper.prop('placement')).toBe(ANCHORED_PLACEMENT.BOTTOM);
        expect(boxWrapper.prop('style').top).toBe(50 + ANCHOR_SIZE_SMALL);

        boxWrapper = mount(
            <AnchoredBoxBottom anchor={anchorRef.current} />,
            { attachTo: boxRoot }
        ).find(Box);

        expect(boxWrapper.prop('placement')).toBe(ANCHORED_PLACEMENT.BOTTOM);
        expect(boxWrapper.prop('style').top).toBe(50 + ANCHOR_SIZE_SMALL);
    });
});

describe('Horizontal placement: small anchor', () => {
    it('aligns to the center of anchor when space is enough', () => {
        const anchorRef = React.createRef();
        mount(
            <><Anchor top={20} left={100} ref={anchorRef} /></>,
            { attachTo: anchorRoot }
        );

        const boxWrapper = mount(
            <AnchoredBoxTop anchor={anchorRef.current} />,
            { attachTo: boxRoot }
        ).find(Box);

        expect(boxWrapper.prop('style').left)
            // 100 + (anchor size / 2) - (box size / 2)
            .toBe(60);

        // Center-aligned component doesn't specify arrow style.
        expect(boxWrapper.find(Box).prop('arrowStyle')).toEqual({});
    });

    it('aligns to the right side of anchor if space is not enough on right side', () => {
        const anchorRef = React.createRef();
        mount(
            <><Anchor top={20} left={1000} ref={anchorRef} /></>,
            { attachTo: anchorRoot }
        );

        const boxWrapper = mount(
            <AnchoredBoxTop anchor={anchorRef.current} />,
            { attachTo: boxRoot }
        ).find(Box);

        expect(boxWrapper.prop('style').left)
            // Viewport width - anchor right offset - box width
            .toBe(920);
        expect(boxWrapper.find(Box).prop('arrowStyle').left)
            // box width - edge padding
            .toBe(84);
    });

    it('aligns to the left side of anchor if space is not enough on left side', () => {
        const anchorRef = React.createRef();
        mount(
            <><Anchor top={20} left={10} ref={anchorRef} /></>,
            { attachTo: anchorRoot }
        );

        const boxWrapper = mount(
            <AnchoredBoxTop anchor={anchorRef.current} />,
            { attachTo: boxRoot }
        ).find(Box);

        expect(boxWrapper.prop('style').left)
            // anchor left
            .toBe(10);
        expect(boxWrapper.find(Box).prop('arrowStyle').left)
            // edge padding
            .toBe(16);
    });
});

describe('Horizontal placement: large anchor', () => {
    it('aligns to the center of anchor when anchor is wider than box', () => {
        const anchorRef = React.createRef();
        mount(
            <><Anchor large top={20} left={20} ref={anchorRef} /></>,
            { attachTo: anchorRoot }
        );

        const boxWrapper = mount(
            <AnchoredBoxTop anchor={anchorRef.current} />,
            { attachTo: boxRoot }
        ).find(Box);

        expect(boxWrapper.prop('style').left)
            // 10 + (large anchor size / 2) - (box size / 2)
            .toBe(70);

        // Center-aligned component doesn't specify arrow style.
        expect(boxWrapper.find(Box).prop('arrowStyle')).toEqual({});
    });
});
