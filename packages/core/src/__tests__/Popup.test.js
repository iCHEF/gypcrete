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

import Icon from '../Icon';
import Overlay from '../Overlay';

describe('<Popup> with mixins', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    const element = <Popup message="foo" />;

    ReactDOM.render(element, div);
  });
});

describe('<Popup> icon', () => {
  it('passes "icon" and "iconColor" to <PopupIcon>', () => {
    const wrapper = shallow(
      <PurePopup icon="success" iconColor="green" message="foo" />
    );

    expect(
      wrapper.containsMatchingElement(<PopupIcon icon="success" color="green" />)
    ).toBeTruthy();
  });

  it('renders a large icon of given type', () => {
    const wrapper = shallow(
      <PurePopup icon="success" message="foo" />
    );
    const iconWrapper = wrapper.find(PopupIcon).shallow();

    expect(iconWrapper.containsMatchingElement(
      <Icon large type="success" />
    )).toBeTruthy();
  });

  it('renders a colored large icon of given type', () => {
    const wrapper = shallow(
      <PurePopup icon="success" iconColor="green" message="foo" />
    );
    const iconWrapper = wrapper.find(PopupIcon).shallow();

    expect(iconWrapper.containsMatchingElement(
      <Icon large type="success" color="green" />
    )).toBeTruthy();
  });

  it('supports custom React node for "icon" prop', () => {
    const icon = <Icon data-target spinning type="loading" />;
    const wrapper = shallow(
      <PurePopup icon={icon} message="foo" />
    );
    const iconWrapper = wrapper.find(PopupIcon).shallow();

    expect(iconWrapper.find('[data-target]').exists()).toBeTruthy();
  });

  it('supports omitting icon', () => {
    const wrapper = shallow(
      <PurePopup message="foo" />
    );
    const iconWrapper = wrapper.find(PopupIcon).shallow();

    expect(iconWrapper.find(Icon).exists()).toBeFalsy();
  });
});

describe('<Popup> message', () => {
  it('supports message with optional title', () => {
    const wrapper = shallow(
      <PurePopup title="foo" message="bar" />
    );
    const messageWrapper = wrapper.find(PopupMessage).shallow();

    expect(
      messageWrapper.containsAllMatchingElements([
        <div className={POPUP_BEM.messageTitle}>foo</div>,
        <div className={POPUP_BEM.messageDesc}>bar</div>,
      ])
    ).toBeTruthy();
  });

  it('supports simple string message format', () => {
    const wrapper = shallow(<PurePopup message="foo" />);
    const messageWrapper = wrapper.find(PopupMessage).shallow();

    expect(messageWrapper.text()).toBe('foo');
  });

  it('supports custom React node for "message" prop', () => {
    const messageNode = <span>foo</span>;
    const wrapper = shallow(<PurePopup message={messageNode} />);
    const messageWrapper = wrapper.find(PopupMessage).shallow();

    expect(
      messageWrapper.containsMatchingElement(<span>foo</span>)
    ).toBeTruthy();
  });

  it('provides a "bottomArea" content slot below <PopupMessage>', () => {
    const customContent = <span>bar</span>;
    const wrapper = shallow(
      <PurePopup message="foo" messageBottomArea={customContent} />
    );

    expect(wrapper.find('PopupMessage + span').text()).toBe('bar');
  });
});

describe('<Popup> buttons', () => {
  it('does not render buttons-group wrapper when buttons not given', () => {
    const wrapper = shallow(<PurePopup message="foo" />);

    expect(wrapper.find(`.${POPUP_BEM.buttonsGroup}`).exists()).toBeFalsy();
  });

  it('renders <PopupButton>s in a buttons-group section when specified', () => {
    const buttons = (
      <>
        <PopupButton basic="Button A" />
        <PopupButton basic="Button B" />
      </>
    );
    const wrapper = shallow(<PurePopup message="foo" buttons={buttons} />);

    expect(wrapper.find(`.${POPUP_BEM.buttonsGroup}`).containsAllMatchingElements([
      <PopupButton basic="Button A" />,
      <PopupButton basic="Button B" />,
    ])).toBeTruthy();
  });
});

describe('layout', () => {
  it('contains an <Overlay>', () => {
    const wrapper = shallow(<PurePopup message="foo" />);

    expect(wrapper.find(Overlay).exists()).toBeTruthy();
  });

  it('renders in small size by default', () => {
    const wrapper = shallow(<PurePopup message="foo" />);

    expect(wrapper.hasClass('gyp-popup--small')).toBeTruthy();
  });

  it('renders popup with large class name', () => {
    const wrapper = shallow(<PurePopup size="large" message="foo" />);

    expect(wrapper.hasClass('gyp-popup--large')).toBeTruthy();
  });
});
