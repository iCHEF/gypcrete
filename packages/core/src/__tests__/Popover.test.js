import React from 'react';
import { render } from '@testing-library/react';
import { shallow } from 'enzyme';

import Popover, { PurePopover, BEM } from '../Popover';
import ListSpacingContext from '../contexts/listSpacing';

describe('<Popover> with mixins', () => {
  it('should render without crashing', () => {
    const element = <Popover />;

    render(element);
  });
});

describe('Pure <Popover>', () => {
  it('provides context for children list spacing', () => {
    const wrapper = shallow(<PurePopover />);

    expect(wrapper.find(ListSpacingContext.Provider).exists()).toBeTruthy();
    expect(wrapper.find(ListSpacingContext.Provider).prop('value')).toBe(false);
  });

  it('renders class names in respond to placement prop', () => {
    const wrapper = shallow(<PurePopover placement="bottom" />);
    expect(
      wrapper.children('div').hasClass(BEM.root.modifier('bottom').toString({ stripBlock: true })),
    ).toBeTruthy();

    wrapper.setProps({ placement: 'top' });
    expect(
      wrapper.children('div').hasClass(BEM.root.modifier('top').toString({ stripBlock: true })),
    ).toBeTruthy();
  });

  it('passes arrowStyle prop to arrow node', () => {
    const wrapper = shallow(<PurePopover arrowStyle={{ top: 50, left: 100 }} />);
    const arrowClassName = BEM.arrow.toString();

    expect(wrapper.find(`.${arrowClassName}`).prop('style')).toMatchObject({
      top: 50,
      left: 100,
    });
  });

  describe('container max height', () => {
    it('compute maxHeight on vertical placement', () => {
      const wrapper = shallow(
        <PurePopover
          placement="top"
          remainingSpace={50}
        />,
      );
      const containerClassName = BEM.container.toString();

      expect(wrapper.find(`.${containerClassName}`).prop('style')).toMatchObject({
        maxHeight: 26,
      });
    });
    it('wont compute maxHeight on horizontal placement', () => {
      const wrapper = shallow(
        <PurePopover
          placement="left"
          remainingSpace={50}
        />,
      );
      const containerClassName = BEM.container.toString();

      expect(wrapper.find(`.${containerClassName}`).prop('style')).toMatchObject({
        maxHeight: undefined,
      });
    });
  });
});
