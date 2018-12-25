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

it('takes runtime options', () => {
    const ClosableFoo = closable()(Foo);
    const wrapper = mount(
        <ClosableFoo
            closable={{
                onEscape: false,
                onClickOutside: true,
            }} />
    );

    expect(wrapper.instance().getOptions()).toMatchObject({
        onEscape: false,
        onClickOutside: true,
        onClickInside: false,
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

    jest.runAllTimers();
    expect(handleClose).not.toHaveBeenCalled();
});

describe.each`
    onEscape | shouldBeCalled | desc
    ${true}  | ${true}        | ${'should'}
    ${false} | ${false}       | ${'should not'}
`('$desc call onClose() for ESC keys when onEscape=$onEscape', ({ onEscape, shouldBeCalled }) => {
    const ClosableFoo = closable({ onEscape })(Foo);
    const rootNode = document.createElement('div');

    beforeAll(() => {
        document.body.appendChild(rootNode);
    });

    afterAll(() => {
        document.body.removeChild(rootNode);
    });

    it.each([
        { onClickInside: true, onClickOutside: true },
        { onClickInside: true, onClickOutside: false },
        { onClickInside: false, onClickOutside: true },
        { onClickInside: false, onClickOutside: true },
    ])('when %p', ({ onClickInside, onClickOutside }) => {
        const handleClose = jest.fn();
        const closableOptions = { onClickInside, onClickOutside };

        const wrapper = mount(
            <ClosableFoo closable={closableOptions} onClose={handleClose} />,
            { attachTo: rootNode },
        );

        // Dispatch 'Enter' keyboard event, nothing happened
        let keyEvent = new KeyboardEvent('keyup', { keyCode: keycode('Enter') });
        document.dispatchEvent(keyEvent);
        expect(handleClose).toHaveBeenCalledTimes(0);

        // Dispatch 'Escape' keyboard event, triggers onClose()
        keyEvent = new KeyboardEvent('keyup', { keyCode: keycode('Escape') });
        document.dispatchEvent(keyEvent);
        expect(handleClose).toHaveBeenCalledTimes(shouldBeCalled ? 1 : 0);

        wrapper.unmount();
    });
});


describe.each`
    onClickInside | shouldBeCalled | desc
    ${true}       | ${true}        | ${'should'}
    ${false}      | ${false}       | ${'should not'}
`('$desc call onClose() for inside-clicks when onClickInside=$onClickInside', ({ onClickInside, shouldBeCalled }) => {
    const ClosableFoo = closable({ onClickInside })(Foo);
    const rootNode = document.createElement('div');

    beforeAll(() => {
        document.body.appendChild(rootNode);
    });

    afterAll(() => {
        document.body.removeChild(rootNode);
    });

    it.each([
        { onEscape: true, onClickOutside: true },
        { onEscape: true, onClickOutside: false },
        { onEscape: false, onClickOutside: true },
        { onEscape: false, onClickOutside: true },
    ])('when %p', ({ onEscape, onClickOutside }) => {
        const handleClose = jest.fn();
        const closableOptions = { onEscape, onClickOutside };

        const wrapper = mount(
            <ClosableFoo closable={closableOptions} onClose={handleClose} />,
            { attachTo: rootNode },
        );

        let event = new MouseEvent('click', { bubbles: true });
        wrapper.instance().nodeRef.dispatchEvent(event);

        jest.runOnlyPendingTimers();
        expect(handleClose).toHaveBeenCalledTimes(shouldBeCalled ? 1 : 0);

        // jsdom doesn't support constructing TouchEvent yet.
        event = new CustomEvent('touchend', { bubbles: true });
        wrapper.instance().nodeRef.dispatchEvent(event);

        jest.runOnlyPendingTimers();
        expect(handleClose).toHaveBeenCalledTimes(shouldBeCalled ? 2 : 0);

        wrapper.unmount();
    });
});

describe.each`
    onClickOutside | shouldBeCalled | desc
    ${true}        | ${true}        | ${'should'}
    ${false}       | ${false}       | ${'should not'}
`('$desc call onClose() when onClickOutside=$onClickOutside', ({ onClickOutside, shouldBeCalled }) => {
    const ClosableFoo = closable({ onClickOutside })(Foo);
    const rootNode = document.createElement('div');

    beforeAll(() => {
        document.body.appendChild(rootNode);
    });

    afterAll(() => {
        document.body.removeChild(rootNode);
    });

    it.each([
        { onEscape: true, onClickInside: true },
        { onEscape: true, onClickInside: false },
        { onEscape: false, onClickInside: true },
        { onEscape: false, onClickInside: true },
    ])('when %p', ({ onEscape, onClickInside }) => {
        const handleClose = jest.fn();
        const closableOptions = { onEscape, onClickInside };

        const wrapper = mount(
            <ClosableFoo closable={closableOptions} onClose={handleClose} />,
            { attachTo: rootNode },
        );

        let event = new MouseEvent('click');
        document.dispatchEvent(event);

        jest.runOnlyPendingTimers();
        expect(handleClose).toHaveBeenCalledTimes(shouldBeCalled ? 1 : 0);

        // jsdom doesn't support constructing TouchEvent yet.
        event = new CustomEvent('touchend');
        document.dispatchEvent(event);

        jest.runOnlyPendingTimers();
        expect(handleClose).toHaveBeenCalledTimes(shouldBeCalled ? 2 : 0);

        wrapper.unmount();
    });
});
