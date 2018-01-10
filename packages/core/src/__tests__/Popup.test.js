import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import Popup, {
    PurePopup,
    PopupMessage,
    PopupIcon,
    PopupButton,
    BEM as POPUP_BEM,
} from '../Popup';

import Button from '../Button';
import Icon from '../Icon';
import Overlay from '../Overlay';
import TextLabel from '../TextLabel';

describe('<Popup> with mixins', () => {
    it('should render without crashing', () => {
        const div = document.createElement('div');
        const element = <Popup />;

        ReactDOM.render(element, div);
    });
});

describe('Pure <Popup>', () => {
    it('contains an <Overlay>', () => {
        const wrapper = shallow(<PurePopup message="foo" />);

        expect(wrapper.find(Overlay).exists()).toBeTruthy();
    });

    it('renders a string message with <PopupMessage>', () => {
        const wrapper = shallow(<PurePopup message="foo" />);

        expect(wrapper.find(PopupMessage).exists()).toBeTruthy();
        expect(wrapper.find(PopupMessage).prop('text')).toBe('foo');
    });

    it('takes a valid element for message prop', () => {
        const label = <TextLabel data-target basic="Foo" aside="bar" />;
        const wrapper = shallow(<PurePopup message={label} />);

        expect(wrapper.find(PopupMessage).exists()).toBeFalsy();
        expect(wrapper.find('[data-target]').exists()).toBeTruthy();
    });

    it('renders a string icon with <PopupIcon>', () => {
        const wrapper = shallow(<PurePopup icon="success" />);

        expect(wrapper.find(PopupIcon).exists()).toBeTruthy();
        expect(wrapper.find(PopupIcon).prop('type')).toBe('success');
    });

    it('takes a valid element for icon prop', () => {
        const icon = <Icon data-target type="success" />;
        const wrapper = shallow(<PurePopup icon={icon} />);

        expect(wrapper.find(PopupIcon).exists()).toBeFalsy();
        expect(wrapper.find('[data-target]').exists()).toBeTruthy();
    });

    it('renders buttons with <PopupButton> in a buttons-group section when specified', () => {
        const buttons = [
            <Button key="a" basic="Label A" />,
            <Button key="b" basic="Label B" />,
        ];
        const wrapper = shallow(<PurePopup message="foo" />);
        expect(wrapper.find(`.${POPUP_BEM.buttonsGroup}`).exists()).toBeFalsy();

        wrapper.setProps({ buttons });
        expect(wrapper.find(`.${POPUP_BEM.buttonsGroup}`).exists()).toBeTruthy();

        expect(wrapper.find(`.${POPUP_BEM.buttonsGroup}`).children()).toHaveLength(2);
        expect(wrapper.find(`.${POPUP_BEM.buttonsGroup}`).containsAllMatchingElements([
            <PopupButton basic="Label A" />,
            <PopupButton basic="Label B" />,
        ])).toBeTruthy();
    });
});
