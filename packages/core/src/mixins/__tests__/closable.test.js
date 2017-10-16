import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import keycode from 'keycode';

import closable from '../closable';

const Foo = () => (
    <div>Foo</div>
);

const delay = delayMs => new Promise(resolve => setTimeout(resolve, delayMs));

it('renders without crashing', () => {
    const div = document.createElement('div');
    const ClosableFoo = closable({
        onEscape: true,
        onAnyClick: true,
    })(Foo);

    const element = <ClosableFoo />;

    ReactDOM.render(element, div);
});

it('has default configs', () => {
    const ClosableFoo = closable()(Foo);
    const wrapper = mount(<ClosableFoo />);

    expect(wrapper.instance().getOptions()).toMatchObject({
        onEscape: true,
        onAnyClick: false,
    });
});

it('triggers onClose() call on Escape key up if turned on', () => {
    const ClosableFoo = closable({ onEscape: true })(Foo);
    const handleClose = jest.fn();

    mount(<ClosableFoo onClose={handleClose} />);
    expect(handleClose).not.toHaveBeenCalled();

    // Dispatch 'Enter' keyboard event, nothing happened
    let keyEvent = new KeyboardEvent('keyup', { keyCode: keycode('Enter') });
    document.dispatchEvent(keyEvent);
    expect(handleClose).toHaveBeenCalledTimes(0);

    // Dispatch 'Escape' keyboard event, triggers onClose()
    keyEvent = new KeyboardEvent('keyup', { keyCode: keycode('Escape') });
    document.dispatchEvent(keyEvent);
    expect(handleClose).toHaveBeenCalledTimes(1);
});

it('does not trigger onClose() call on Escape key up if turned off', () => {
    const ClosableFoo = closable({ onEscape: false })(Foo);
    const handleClose = jest.fn();

    mount(<ClosableFoo onClose={handleClose} />);
    expect(handleClose).not.toHaveBeenCalled();

    let keyEvent = new KeyboardEvent('keyup', { keyCode: keycode('Enter') });
    document.dispatchEvent(keyEvent);
    expect(handleClose).toHaveBeenCalledTimes(0);

    keyEvent = new KeyboardEvent('keyup', { keyCode: keycode('Escape') });
    document.dispatchEvent(keyEvent);
    expect(handleClose).toHaveBeenCalledTimes(0);
});

it('triggers onClose() call on any click/touch if turned on', () => {
    const ClosableFoo = closable({ onAnyClick: true })(Foo);
    const handleClose = jest.fn();

    mount(<ClosableFoo onClose={handleClose} />);
    expect(handleClose).not.toHaveBeenCalled();

    let event = new MouseEvent('click');
    document.dispatchEvent(event);
    expect(handleClose).toHaveBeenCalledTimes(1);

    // jsdom doesn't support constructing TouchEvent yet.
    event = new CustomEvent('touchstart');
    document.dispatchEvent(event);
    return delay(250).then(() => {
        expect(handleClose).toHaveBeenCalledTimes(2);
    });
});

it('does not trigger onClose() call on any click/touch if turned off', () => {
    const ClosableFoo = closable({ onAnyClick: false })(Foo);
    const handleClose = jest.fn();

    mount(<ClosableFoo onClose={handleClose} />);
    expect(handleClose).not.toHaveBeenCalled();

    let event = new MouseEvent('click');
    document.dispatchEvent(event);
    expect(handleClose).toHaveBeenCalledTimes(0);

    event = new CustomEvent('touchstart');
    document.dispatchEvent(event);
    return delay(250).then(() => {
        expect(handleClose).toHaveBeenCalledTimes(0);
    });
});

it('tears down event listeners on unmount', () => {
    const ClosableFoo = closable({
        onEscape: true,
        onAnyClick: true,
    })(Foo);
    const handleClose = jest.fn();

    const wrapper = mount(<ClosableFoo onClose={handleClose} />);
    wrapper.unmount();

    let event = new KeyboardEvent('keyup', { keyCode: keycode('Escape') });
    document.dispatchEvent(event);
    expect(handleClose).not.toHaveBeenCalled();

    event = new MouseEvent('click');
    document.dispatchEvent(event);
    expect(handleClose).not.toHaveBeenCalled();

    event = new CustomEvent('touchstart');
    document.dispatchEvent(event);
    return delay(250).then(() => {
        expect(handleClose).not.toHaveBeenCalled();
    });
});
