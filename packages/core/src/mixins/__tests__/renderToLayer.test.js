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

it('renders wrapped component with ReactPortal', () => {
    const wrapper = shallow(<LayerFoo />);

    expect(wrapper.type()).toBe(ReactIs.Portal);
    expect(wrapper.children().is(Foo)).toBeTruthy();
});
