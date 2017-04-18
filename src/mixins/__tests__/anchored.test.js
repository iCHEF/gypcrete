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

import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { mount } from 'enzyme';

import anchored, { ANCHORED_PLACEMENT } from '../anchored';

// --------------------
//  Mocking components
// --------------------

const ANCHOR_SIZE = 20;
const BOX_SIZE = 100;

// <Anchor> needs to be a React Component so it has an backing instance.
// eslint-disable-next-line react/prefer-stateless-function
class Anchor extends PureComponent {
    static propTypes = {
        top: PropTypes.number.isRequired,
        left: PropTypes.number.isRequired,
    };

    render() {
        const { top, left } = this.props;
        const style = {
            width: ANCHOR_SIZE,
            height: ANCHOR_SIZE,
            position: 'absolute',
            top,
            left,
        };
        return <div id="anchor" style={style} />;
    }
}

function Box({ style }) {
    const boxStyle = {
        ...style,
        width: BOX_SIZE,
        height: BOX_SIZE,
    };
    return <div style={boxStyle} />;
}
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

it('renders above when anchor placed near bottom of viewport', () => {
    const anchorWrapper = mount(<Anchor top={700} left={100} />, { attachTo: anchorRoot });

    let boxWrapper = mount(
        <AnchoredBoxTop anchor={anchorWrapper.instance()} />,
        { attachTo: boxRoot }
    ).find(Box);

    expect(boxWrapper.prop('placement')).toBe(ANCHORED_PLACEMENT.TOP);
    expect(boxWrapper.prop('style').top).toBe(700 - BOX_SIZE);

    boxWrapper = mount(
        <AnchoredBoxBottom anchor={anchorWrapper.instance()} />,
        { attachTo: boxRoot }
    ).find(Box);

    expect(boxWrapper.prop('placement')).toBe(ANCHORED_PLACEMENT.TOP);
    expect(boxWrapper.prop('style').top).toBe(700 - BOX_SIZE);
});

it('renders below when anchor placed near top of viewport', () => {
    const anchorWrapper = mount(<Anchor top={50} left={100} />, { attachTo: anchorRoot });

    let boxWrapper = mount(
        <AnchoredBoxTop anchor={anchorWrapper.instance()} />,
        { attachTo: boxRoot }
    ).find(Box);

    expect(boxWrapper.prop('placement')).toBe(ANCHORED_PLACEMENT.BOTTOM);
    expect(boxWrapper.prop('style').top).toBe(50 + ANCHOR_SIZE);

    boxWrapper = mount(
        <AnchoredBoxBottom anchor={anchorWrapper.instance()} />,
        { attachTo: boxRoot }
    ).find(Box);

    expect(boxWrapper.prop('placement')).toBe(ANCHORED_PLACEMENT.BOTTOM);
    expect(boxWrapper.prop('style').top).toBe(50 + ANCHOR_SIZE);
});

it('renders and aligns to the center line of anchor', () => {
    const anchorWrapper = mount(<Anchor top={20} left={100} />, { attachTo: anchorRoot });
    const boxWrapper = mount(
        <AnchoredBoxTop anchor={anchorWrapper.instance()} />,
        { attachTo: boxRoot }
    ).find(Box);

    expect(
        // The center line of <Box>
        boxWrapper.prop('style').left + (BOX_SIZE / 2)
    ).toBe(
        // The center line of <Anchor>
        100 + (ANCHOR_SIZE / 2)
    );
});


it('renders on the left when anchor placed on the right of viewport', () => {
    const anchorWrapper = mount(<Anchor top={20} left={1000} />, { attachTo: anchorRoot });
    const boxWrapper = mount(
        <AnchoredBoxTop anchor={anchorWrapper.instance()} />,
        { attachTo: boxRoot }
    ).find(Box);

    expect(
        // The center line of <Box>
        boxWrapper.prop('style').left + (BOX_SIZE / 2)
    ).toBeLessThan(
        // The center line of <Anchor>
        1000 + (ANCHOR_SIZE / 2)
    );
});

it('renders on the right when anchor placed on the left of viewport', () => {
    const anchorWrapper = mount(<Anchor top={20} left={10} />, { attachTo: anchorRoot });
    const boxWrapper = mount(
        <AnchoredBoxTop anchor={anchorWrapper.instance()} />,
        { attachTo: boxRoot }
    ).find(Box);

    expect(
        // The center line of <Box>
        boxWrapper.prop('style').left + (BOX_SIZE / 2)
    ).toBeGreaterThan(
        // The center line of <Anchor>
        10 + (ANCHOR_SIZE / 2)
    );
});

it('can take an HTMLElement as anchor', () => {
    mount(<Anchor top={10} left={10} />, { attachTo: anchorRoot });
    const anchorNode = document.getElementById('anchor');

    const boxWrapper = mount(
        <AnchoredBoxTop anchor={anchorNode} />,
        { attachTo: boxRoot }
    ).find(Box);

    expect(boxWrapper.exists()).toBeTruthy();
});

it('re-adjusts position when assigned with another anchor', () => {
    let anchorWrapper = mount(<Anchor top={20} left={10} />, { attachTo: anchorRoot });
    const wrapper = mount(
        <AnchoredBoxTop anchor={anchorWrapper.instance()} />,
        { attachTo: boxRoot }
    );

    expect(wrapper.find(Box).prop('placement')).toBe(ANCHORED_PLACEMENT.BOTTOM);

    anchorWrapper = mount(<Anchor top={200} left={10} />, { attachTo: anchorRoot });
    wrapper.setProps({ anchor: anchorWrapper.instance() });

    expect(wrapper.find(Box).prop('placement')).toBe(ANCHORED_PLACEMENT.TOP);
});
