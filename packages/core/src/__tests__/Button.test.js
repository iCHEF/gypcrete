import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import Button, { PureButton } from '../Button';

describe('rowComp(Button)', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    const element = <Button basic="label" />;

    ReactDOM.render(element, div);
  });

  it('is minified by default', () => {
    const wrapper = shallow(<div><Button basic="label" /></div>);

    expect(wrapper.find(Button).prop('minified')).toBeTruthy();
  });
});

describe('Pure <Button>', () => {
  it('handles color modifiers', () => {
    let wrapper = shallow(<PureButton>Label</PureButton>);
    expect(wrapper.hasClass('gyp-button--black')).toBeTruthy();

    wrapper = shallow(<PureButton color="red">Label</PureButton>);
    expect(wrapper.hasClass('gyp-button--red')).toBeTruthy();

    wrapper = shallow(<PureButton color="white">Label</PureButton>);
    expect(wrapper.hasClass('gyp-button--white')).toBeTruthy();

    wrapper = shallow(<PureButton color="blue">Label</PureButton>);
    expect(wrapper.hasClass('gyp-button--blue')).toBeTruthy();
  });

  it('handles solid modifier', () => {
    const wrapper = shallow(<PureButton solid>Label</PureButton>);

    expect(wrapper.hasClass('gyp-button--solid')).toBeTruthy();
  });

  it('can render as different tags', () => {
    const wrapper = shallow(<PureButton tagName="button">Label</PureButton>);
    expect(wrapper.type()).toBe('button');

    wrapper.setProps({ tagName: 'div' });
    expect(wrapper.type()).toBe('div');

    wrapper.setProps({ tagName: 'a' });
    expect(wrapper.type()).toBe('a');
  });

  it('passes unknown props to its wrapper', () => {
    const wrapper = shallow(
      <PureButton id="foo-bar" data-test>
        Label
      </PureButton>
    );

    expect(wrapper.prop('id')).toBe('foo-bar');
    expect(wrapper.prop('data-test')).toBeTruthy();
  });
});
