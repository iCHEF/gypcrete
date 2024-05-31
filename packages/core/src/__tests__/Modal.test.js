import React from 'react';
import { shallow } from 'enzyme';

import { BEM, PureModal, DefaultHeader } from '../Modal';
import ColumnView from '../ColumnView';
import HeaderRow from '../HeaderRow';
import Overlay from '../Overlay';
import TextLabel from '../TextLabel';

describe('<DefaultHeader>', () => {
  it('renders a center-aligned <TextLabel> inside a <HeaderRow>', () => {
    const wrapper = shallow(<DefaultHeader title="Foo" />);

    expect(wrapper.is(HeaderRow)).toBeTruthy();
    expect(wrapper.prop('center')).toMatchObject(
      <TextLabel
        align="center"
        basic="Foo"
      />,
    );
  });
});

describe('Overlay', () => {
  it('contains an <Overlay>', () => {
    const wrapper = shallow(<PureModal />);

    expect(wrapper.find(Overlay).exists()).toBeTruthy();
  });

  it("calls 'onClose' on <Overlay> click, and blocks event bubble", () => {
    const mockedHandleClose = jest.fn();
    const wrapper = shallow(<PureModal onClose={mockedHandleClose} />);

    const mockedStopPropagation = jest.fn();
    wrapper.find(Overlay).simulate('click', {
      stopPropagation: mockedStopPropagation,
    });

    expect(mockedStopPropagation).toHaveBeenCalled();
    expect(mockedHandleClose).toHaveBeenCalled();
  });
});

describe('Rendering', () => {
  it('renders class names in response to the centered prop', () => {
    const wrapper = shallow(<PureModal centered />);
    const expectedClassName = BEM.root.modifier('centered').toString({ stripBlock: true });

    expect(wrapper.hasClass(expectedClassName)).toBeTruthy();
  });

  it('renders header and children inside a <ColumnView>', () => {
    const header = <HeaderRow />;
    const children = <div data-target />;

    const wrapper = shallow(<PureModal header={header}>{children}</PureModal>);
    const columnViewWrapper = wrapper.find(ColumnView);

    expect(columnViewWrapper.exists()).toBeTruthy();
    expect(columnViewWrapper.props()).toMatchObject({
      header,
      children,
      className: `${BEM.container}`,
    });
  });

  it('renders a basic <DefaultHeader> if only given String', () => {
    const wrapper = shallow(<PureModal header="Foo">Bar</PureModal>);

    expect(wrapper.find(ColumnView).prop('header')).toMatchObject(<DefaultHeader title="Foo" />);
  });

  it("passes 'flexBody' and 'bodyPadding' props to <ColumnView>", () => {
    const wrapper = shallow(
      <PureModal
        flexBody
        bodyPadding={{ bottom: 0 }}
      >
        <div>Foo</div>
      </PureModal>,
    );

    expect(wrapper.find(ColumnView).props()).toMatchObject({
      flexBody: true,
      bodyPadding: { bottom: 0 },
    });
  });
});
