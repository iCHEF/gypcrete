import React from 'react';
import ReactDOM from 'react-dom';
import { mount, shallow } from 'enzyme';
import keycode from 'keycode';

import escapable from '../escapable';

const Foo = () => (
    <div>Foo</div>
);

const EscapableFoo = escapable(Foo);

// --------------------
//  Test cases
// --------------------

it('renders without crashing', () => {
    const div = document.createElement('div');
    const element = <EscapableFoo />;

    ReactDOM.render(element, div);
});

it('should trigger onEscape when clicked Esc key', () => {
    const onEscape = jest.fn();
    mount(<EscapableFoo onEscape={onEscape} />);

    // Dispatch Escape keyboard event
    const escKeyEvent = new KeyboardEvent('keyup', { keyCode: keycode('Escape') });
    document.dispatchEvent(escKeyEvent);

    expect(onEscape).toHaveBeenCalledTimes(1);
});
