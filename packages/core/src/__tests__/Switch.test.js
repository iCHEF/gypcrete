import { render } from '@testing-library/react';
import { shallow } from 'enzyme';

import Switch, { PureSwitch } from '../Switch';
import SwitchIcon from '../SwitchIcon';
import IconLayout from '../IconLayout';

describe('rowComp(Switch)', () => {
  it('renders without crashing', () => {
    const element = <Switch />;

    render(element);
  });

  it('is reverse-aligned by default', () => {
    const wrapper = shallow(
      <div>
        <Switch />
      </div>,
    );

    expect(wrapper.find(Switch).prop('align')).toBe('reverse');
  });
});

describe('Pure <Switch>', () => {
  it('renders one <input type=checkbox> as underlying input', () => {
    const wrapper = shallow(<PureSwitch />);

    expect(wrapper.containsMatchingElement(<input type="checkbox" />)).toBeTruthy();
  });

  it('renders <input> and switch button in icon wrapper before rowComp parts', () => {
    const wrapper = shallow(<PureSwitch>Foo children</PureSwitch>);
    expect(wrapper.childAt(0).hasClass('gyp-switch__icon-wrapper')).toBeTruthy();
    expect(wrapper.childAt(0).find('input').exists()).toBeTruthy();

    expect(wrapper.childAt(1).text()).toBe('Foo children');
  });

  it('renders <SwitchIcon> inside <IconLayout> so it can show loading status', () => {
    const wrapper = shallow(<PureSwitch />);

    expect(wrapper.find(IconLayout)).toHaveLength(1);
    expect(wrapper.find(IconLayout).prop('icon').type).toBe(SwitchIcon);
  });

  it('renders <IconLayout> without tooltip', () => {
    const wrapper = shallow(<PureSwitch />);

    expect(wrapper.find(IconLayout).prop('tooltip')).toBeFalsy();
  });

  it('passes whitelisted props to <input>', () => {
    const handleChange = jest.fn();
    const wrapper = shallow(
      <PureSwitch
        checked
        defaultChecked
        disabled
        onChange={handleChange}
      />,
    );
    const inputWrapper = wrapper.find('input');

    expect(inputWrapper.prop('checked')).toBeTruthy();
    expect(inputWrapper.prop('defaultChecked')).toBeTruthy();
    expect(inputWrapper.prop('disabled')).toBeTruthy();
    expect(inputWrapper.prop('onChange')).toBe(handleChange);
  });

  it('passes every props to <input> from the input prop', () => {
    const wrapper = shallow(<PureSwitch input={{ readonly: true, id: 'foo-switch' }} />);
    const inputWrapper = wrapper.find('input');

    expect(inputWrapper.prop('readonly')).toBeTruthy();
    expect(inputWrapper.prop('id')).toBe('foo-switch');
  });
});
