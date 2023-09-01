import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import * as ReactIs from 'react-is';

import randId from '../../utils/randId';
import renderToLayer from '../renderToLayer';

jest.mock('../../utils/randId');

// --------------------
//  Mocking components
// --------------------

function Foo() {
  return <div className="bar">Hello World!</div>;
}

const LayerFoo = renderToLayer(Foo);


// --------------------
//  Test cases
// --------------------

it('renders without crashing', () => {
  const div = document.createElement('div');
  const element = <LayerFoo />;

  ReactDOM.render(element, div);
});

it('creates a layer with unique ID on creation', () => {
  randId.mockReturnValueOnce('MOCKED_ID');

  const wrapper = shallow(<LayerFoo />);

  expect(randId).toHaveBeenCalled();
  expect(wrapper.instance().baseLayer.id = 'MOCKED_ID');
});

it('append layer to body on mount and removes on unmount', () => {
  const layerId = 'layer-1234';
  randId.mockReturnValueOnce(layerId);

  const wrapper = shallow(<LayerFoo />);

  expect(document.getElementById(layerId)).toBe(wrapper.instance().baseLayer);

  wrapper.unmount();
  expect(document.getElementById(layerId)).toBeNull();
});

it('renders wrapped component via ReactPortal after layer is in DOM', () => {
  const wrapper = shallow(<LayerFoo />, { disableLifecycleMethods: true });
  expect(wrapper.children().exists()).toBeFalsy();

  // Triggers layer appending
  wrapper.instance().componentDidMount();

  expect(wrapper.type()).toBe(ReactIs.Portal);
  expect(wrapper.children().is(Foo)).toBeTruthy();
});

it('set zIndex style on layer given zIndex prop', () => {
  const zIndex = 200;
  const wrapper = shallow(<LayerFoo zIndex={zIndex} />);

  expect(wrapper.instance().baseLayer.style.zIndex).toBe(zIndex.toString());
});
