import { render } from '@testing-library/react';
import { shallow } from 'enzyme';

import Radio, { PureRadio } from '../Radio';

describe('rowComp(Radio)', () => {
  it('renders without crashing', () => {
    const element = <Radio basic="Basic text" />;

    render(element);
  });
});

describe('Pure <Radio>', () => {
  it('renders <input type=radio> along with rowComp parts inside <RowCompBody>', () => {
    const wrapper = shallow(<PureRadio>Foo children</PureRadio>);
    expect(wrapper.containsMatchingElement(<input type="radio" />)).toBeTruthy();
  });

  it('renders <input> in icon wrapper before rowComp parts', () => {
    const wrapper = shallow(<PureRadio>Foo children</PureRadio>);
    expect(wrapper.childAt(0).hasClass('gyp-radio__icon-wrapper')).toBeTruthy();
    expect(wrapper.childAt(0).find('input').exists()).toBeTruthy();
  });

  it('passes whitelisted props to <input>', () => {
    const handleChange = jest.fn();
    const wrapper = shallow(
      <PureRadio
        checked
        defaultChecked
        disabled
        onChange={handleChange}
      >
        Foo children
      </PureRadio>,
    );
    const inputWrapper = wrapper.find('input');

    expect(inputWrapper.prop('checked')).toBeTruthy();
    expect(inputWrapper.prop('defaultChecked')).toBeTruthy();
    expect(inputWrapper.prop('disabled')).toBeTruthy();
    expect(inputWrapper.prop('onChange')).toBe(handleChange);
  });

  it('passes every props to <input> from the input prop', () => {
    const wrapper = shallow(
      <PureRadio input={{ readonly: true, id: 'foo-radio' }}>Foo children</PureRadio>,
    );
    const inputWrapper = wrapper.find('input');

    expect(inputWrapper.prop('readonly')).toBeTruthy();
    expect(inputWrapper.prop('id')).toBe('foo-radio');
  });
});
