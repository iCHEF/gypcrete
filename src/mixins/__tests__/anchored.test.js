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

import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';

import anchored from '../anchored';

// --------------------
//  Mocking components
// --------------------

function Anchor({ top, left }) {
    const style = {
        width: 20,
        height: 20,
        position: 'absolute',
        top,
        left,
    };
    return <div style={style} />;
}
Anchor.propTypes = {
    top: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired,
};

function Box({ style }) {
    const boxStyle = {
        ...style,
        width: 100,
        height: 100,
    };
    return <div style={boxStyle} />;
}
const AnchoredBox = anchored()(Box);


// --------------------
//  Test cases
// --------------------

it('renders without crashing', () => {
    const div = document.createElement('div');
    const element = <AnchoredBox />;

    ReactDOM.render(element, div);
});
