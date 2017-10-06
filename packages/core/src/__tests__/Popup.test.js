import React from 'react';
import ReactDOM from 'react-dom';
import { mount, ReactWrapper } from 'enzyme';

import Popup, { BEM as POPUP_BEM } from '../Popup';
import Overlay from '../Overlay';
import Icon from '../Icon';
import Button from '../Button';

it('should render without crashing', () => {
    const div = document.createElement('div');
    const element = <Popup />;

    ReactDOM.render(element, div);
});

it('should contain <Overlay>', () => {
    const wrapper = mount(<Popup>Bar</Popup>);
    // <Popup> was wrapped by renderToLayer() and rendered outside React root
    const popupWrapper = new ReactWrapper(wrapper.instance().componentRef, true);

    expect(popupWrapper.find(Overlay).exists()).toBeTruthy();
});

it('should render message in <div> when specified', () => {
    const fooText = 'Foo';
    const wrapper = mount(<Popup>Bar</Popup>);
    const popupWrapper = new ReactWrapper(wrapper.instance().componentRef, true);

    expect(popupWrapper.find(`.${POPUP_BEM.message}`).exists()).toBeFalsy();

    wrapper.setProps({ message: fooText });
    expect(popupWrapper.find(`.${POPUP_BEM.message}`).exists()).toBeTruthy();
    expect(popupWrapper.find(`.${POPUP_BEM.message}`).text()).toBe(fooText);
});

it('should render icon with icon\'s type string', () => {
    const wrapper = mount(<Popup icon="error" />);
    const popupWrapper = new ReactWrapper(wrapper.instance().componentRef, true);

    expect(popupWrapper.find(Icon).exists()).toBeTruthy();
    expect(popupWrapper.find(Icon).prop('type')).toBe('error');

    // Blue color & large size as default
    expect(popupWrapper.find(Icon).prop('large')).toBeTruthy();
    expect(popupWrapper.find(Icon).prop('color')).toBe('blue');
});

it('should render icon with custom <Icon>', () => {
    const successIcon = <Icon type="success" />;
    const wrapper = mount(<Popup icon={successIcon} />);
    const popupWrapper = new ReactWrapper(wrapper.instance().componentRef, true);

    expect(popupWrapper.find(Icon).exists()).toBeTruthy();
    expect(popupWrapper.find(Icon).prop('type')).toBe('success');
});

it('should render button(s) in buttons-group section when specified', () => {
    const dismissBtn = <Button key="dismiss-btn" basic="Dismiss" />;
    const wrapper = mount(<Popup />);
    const popupWrapper = new ReactWrapper(wrapper.instance().componentRef, true);

    expect(popupWrapper.find(`.${POPUP_BEM.buttonsGroup}`).exists()).toBeFalsy();

    wrapper.setProps({ buttons: [dismissBtn, null] });
    expect(popupWrapper.find(`.${POPUP_BEM.buttonsGroup}`).exists()).toBeTruthy();

    const popupBtn = popupWrapper.find(`.${POPUP_BEM.buttonsGroup}`).find(Button);
    expect(popupBtn.prop('basic')).toBe('Dismiss');

    // Center align and non-minified as default
    expect(popupBtn.prop('align')).toBe('center');
    expect(popupBtn.prop('minified')).toBeFalsy();
});
