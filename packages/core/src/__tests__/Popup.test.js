import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import Popup, {
    PurePopup,
    PopupMessage,
    PopupIcon,
    BEM as POPUP_BEM,
} from '../Popup';
import PopupButton from '../PopupButton';

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

    it('render with custom node of messageArea', () => {
        const customMessageArea = <img src="test-img" alt="test-img" />;
        const wrapper = shallow(<PurePopup messageArea={customMessageArea} />);
        expect(wrapper.find(customMessageArea).exists()).toBeFalsy();
        expect(
            wrapper.find('img[src="test-img"]').exists()
        ).toBeTruthy();
    });

    it('renders a string message with <PopupMessage>', () => {
        const wrapper = shallow(<PurePopup message="foo" />);

        expect(wrapper.find(PopupMessage).exists()).toBeTruthy();
        expect(wrapper.find(PopupMessage).prop('desc')).toBe('foo');
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

    it('renders <PopupButton>s in a buttons-group section when specified', () => {
        const buttons = [
            <PopupButton key="a" basic="Label A" />,
            <PopupButton key="b" basic="Label B" />,
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

    it('transforms <Button> into <PopupButton> for compatibility', () => {
        // #DEPRECATE: remove in v2 release
        const buttons = [
            <Button key="a" basic="Label A" />,
            <Button key="b" basic="Label B" />,
        ];
        const wrapper = shallow(<PurePopup message="foo" buttons={buttons} />);
        expect(wrapper.find(`.${POPUP_BEM.buttonsGroup}`).children()).toHaveLength(2);
        expect(wrapper.find(`.${POPUP_BEM.buttonsGroup}`).containsAllMatchingElements([
            <PopupButton basic="Label A" />,
            <PopupButton basic="Label B" />,
        ])).toBeTruthy();
    });
});

describe('<PopupIcon>', () => {
    it('returns a pre-configured <Icon> of given type', () => {
        const wrapper = shallow(<PopupIcon type="foo" />);
        expect(wrapper.matchesElement(<Icon large type="foo" />)).toBeTruthy();
    });
});

describe('<PopupMessage>', () => {
    it('returns a pre-configured layout of given props', () => {
        const wrapper = shallow(<PopupMessage title="foo" desc="bar" bottomArea="bottomArea" />);
        expect(wrapper.matchesElement(
            <div>
                <span>foo</span>
                <span>bar</span>
                bottomArea
            </div>
        )).toBeTruthy();
    });

    it('only render with desc prop', () => {
        const wrapper = shallow(<PopupMessage desc="bar" />);
        expect(wrapper.matchesElement(
            <div>
                <span>bar</span>
            </div>
        )).toBeTruthy();
    });
});
