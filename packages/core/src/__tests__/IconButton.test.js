import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import Button from '../Button';
import IconButton from '../IconButton';
import IconLayout from '../IconLayout';

describe('<IconButton>', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    const element = <IconButton icon="printer" status="loading" />;

    ReactDOM.render(element, div);
  });

  it('renders as a custom-configured variant of <Button>', () => {
    const wrapper = shallow(<IconButton icon="printer" status="loading" />);

    expect(wrapper.children()).toHaveLength(1);
    expect(wrapper.find(Button).exists()).toBeTruthy();
    expect(wrapper.find(Button).prop('status')).toBe('loading');
  });

  it('renders icon into <IconLayout>', () => {
    const wrapper = shallow(<IconButton icon="printer" />);
    const buttonChidlren = wrapper.find(Button).children();

    expect(buttonChidlren).toHaveLength(1);
    expect(buttonChidlren.equals(<IconLayout icon="printer" />)).toBeTruthy();
  });

  it('injects additional BEM class to <Button>', () => {
    const wrapper = shallow(
      <IconButton
        tinted
        icon="printer"
        className="other-custom-class" />
    );

    expect(wrapper.hasClass('gyp-button--icon-only')).toBeTruthy();
    expect(wrapper.hasClass('gyp-button--tinted')).toBeTruthy();
    expect(wrapper.hasClass('other-custom-class')).toBeTruthy();
  });
});
