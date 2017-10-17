import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import keycode from 'keycode';

import closable from '../closable';

const Foo = () => (
    <div id="foo">Foo</div>
);

jest.useFakeTimers();

it('renders without crashing', () => {
    const div = document.createElement('div');
    const ClosableFoo = closable()(Foo);

    const element = <ClosableFoo />;

    ReactDOM.render(element, div);
});

it('has default configs', () => {
    const ClosableFoo = closable()(Foo);
    const wrapper = mount(<ClosableFoo />);

    expect(wrapper.instance().getOptions()).toMatchObject({
        onEscape: true,
        onClickOutside: false,
        onClickInside: false,
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

it('triggers onClose() call on click/touch outside if turned on', () => {
    const ClosableFoo = closable({ onClickOutside: true })(Foo);
    const handleClose = jest.fn();

    mount(<ClosableFoo onClose={handleClose} />);
    expect(handleClose).not.toHaveBeenCalled();

    let event = new MouseEvent('click');
    document.dispatchEvent(event);
    expect(handleClose).toHaveBeenCalledTimes(1);

    // jsdom doesn't support constructing TouchEvent yet.
    event = new CustomEvent('touchstart');
    document.dispatchEvent(event);

    jest.runOnlyPendingTimers();
    expect(handleClose).toHaveBeenCalledTimes(2);
});

it('does not trigger onClose() call on any click/touch outside if turned off', () => {
    const ClosableFoo = closable({ onClickOutside: false })(Foo);
    const handleClose = jest.fn();

    mount(<ClosableFoo onClose={handleClose} />);
    expect(handleClose).not.toHaveBeenCalled();

    let event = new MouseEvent('click');
    document.dispatchEvent(event);
    expect(handleClose).toHaveBeenCalledTimes(0);

    event = new CustomEvent('touchstart');
    document.dispatchEvent(event);

    jest.runOnlyPendingTimers();
    expect(handleClose).toHaveBeenCalledTimes(0);
});

it('triggers onClose() call on click/touch inside if turned on', () => {
    const ClosableFoo = closable({ onClickInside: true })(Foo);
    const handleClose = jest.fn();

    const wrapper = mount(<ClosableFoo onClose={handleClose} />);
    expect(handleClose).not.toHaveBeenCalled();

    let event = new MouseEvent('click');
    wrapper.instance().nodeRef.dispatchEvent(event);
    expect(handleClose).toHaveBeenCalledTimes(1);

    // jsdom doesn't support constructing TouchEvent yet.
    event = new CustomEvent('touchstart');
    wrapper.instance().nodeRef.dispatchEvent(event);

    jest.runOnlyPendingTimers();
    expect(handleClose).toHaveBeenCalledTimes(2);
});

it('triggers onClose() call on click/touch inside if turned off', () => {
    const ClosableFoo = closable({ onClickInside: false })(Foo);
    const handleClose = jest.fn();

    const wrapper = mount(<ClosableFoo onClose={handleClose} />);
    expect(handleClose).not.toHaveBeenCalled();

    let event = new MouseEvent('click');
    wrapper.instance().nodeRef.dispatchEvent(event);
    expect(handleClose).toHaveBeenCalledTimes(0);

    // jsdom doesn't support constructing TouchEvent yet.
    event = new CustomEvent('touchstart');
    wrapper.instance().nodeRef.dispatchEvent(event);

    jest.runOnlyPendingTimers();
    expect(handleClose).toHaveBeenCalledTimes(0);
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

    jest.runAllTimers();
    expect(handleClose).not.toHaveBeenCalled();
});
