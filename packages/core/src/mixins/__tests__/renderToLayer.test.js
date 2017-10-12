import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import { mount, ReactWrapper } from 'enzyme';

import renderToLayer from '../renderToLayer';

/**
 * How to test `ReactDOM.unstable_renderSubtreeIntoContainer()` with enzyme:
 * @ref https://github.com/airbnb/enzyme/issues/252#issuecomment-266125422
 */

// --------------------
//  Mocking components
// --------------------

// eslint-disable-next-line react/prefer-stateless-function
class Foo extends PureComponent {
    render() {
        return <div className="bar">Hello World!</div>;
    }
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

it('creates layer on mount and removes on unmount', () => {
    const wrapper = mount(<LayerFoo />);
    const layerId = wrapper.instance().baseLayer.id;

    // Make sure the layer is created
    expect(document.getElementById(layerId)).not.toBeNull();

    wrapper.unmount();

    // Now make sure the layer is removed from DOM tree
    expect(document.getElementById(layerId)).toBeNull();
});

it('should give up removing layer if reference to layer lost', () => {
    const wrapper = mount(<LayerFoo />);
    const layerId = wrapper.instance().baseLayer.id;

    // Mock reference lost
    wrapper.instance().baseLayer = null;
    wrapper.unmount();

    // Expect unmount to abort
    expect(document.getElementById(layerId)).not.toBeNull();
});

it('renders wrapped Component outside React root', () => {
    const wrapper = mount(<LayerFoo />);
    const layerWrapper = new ReactWrapper(wrapper.instance().componentRef, true);

    // Wrapper should not have children, because it's rendered somewhere else.
    expect(wrapper.children().exists()).toBeFalsy();

    expect(layerWrapper.find(Foo)).toHaveLength(1);
    expect(layerWrapper.hasClass('bar')).toBeTruthy();
    expect(layerWrapper.text()).toBe('Hello World!');
});

it('updates wrapped component when props change', () => {
    const wrapper = mount(<LayerFoo />);
    const layerWrapper = new ReactWrapper(wrapper.instance().componentRef, true);

    expect(layerWrapper.props()).toEqual({});

    wrapper.setProps({ inline: true });
    expect(layerWrapper.props()).toEqual({ inline: true });
});
