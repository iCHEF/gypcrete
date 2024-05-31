import React from 'react';
import { render } from '@testing-library/react';
import { mount } from 'enzyme';
import keycode from 'keycode';

import escapable from '../escapable';

const Foo = () => <div>Foo</div>;

const EscapableFoo = escapable(Foo);

// --------------------
//  Test cases
// --------------------

it('renders without crashing', () => {
  const element = <EscapableFoo />;

  render(element);
});

it('should trigger onEscape when clicked Esc key', () => {
  const onEscape = jest.fn();
  mount(<EscapableFoo onEscape={onEscape} />);

  // Dispatch 'Enter' keyboard event, nothing happened
  const enterKeyEvent = new KeyboardEvent('keyup', { keyCode: keycode('Enter') });
  document.dispatchEvent(enterKeyEvent);
  expect(onEscape).toHaveBeenCalledTimes(0);

  // Dispatch 'Esc' keyboard event
  const escKeyEvent = new KeyboardEvent('keyup', { keyCode: keycode('Escape') });
  document.dispatchEvent(escKeyEvent);
  expect(onEscape).toHaveBeenCalledTimes(1);
});

it('should listen keyup event when mounted', () => {
  document.addEventListener = jest.fn();
  document.removeEventListener = jest.fn();
  const wrapper = mount(<EscapableFoo />);

  expect(document.addEventListener).toHaveBeenCalledTimes(1);

  wrapper.unmount();
  expect(document.removeEventListener).toHaveBeenCalledTimes(1);
});
