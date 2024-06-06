import { render } from '@testing-library/react';
import { shallow } from 'enzyme';

import RadioSelectList from '../RadioSelectList';
import RadioSelectOption from '../RadioSelectOption';

it('renders without crashing', () => {
  const element = (
    <RadioSelectList>
      <RadioSelectOption
        label="Foo"
        value="foo"
      />
      <RadioSelectOption
        label="Bar"
        value="bar"
      />
    </RadioSelectList>
  );

  render(element);
});

it('pass default props to SelectList', () => {
  const wrapper = shallow(<RadioSelectList />);

  expect(wrapper.props()).toEqual(
    expect.objectContaining({
      multiple: false,
      showCheckAll: false,
      checkAllLabel: null,
      minCheck: 0,
    }),
  );
});

it('pass all props to SelectList', () => {
  const mockedOnChange = () => {};
  const wrapper = shallow(
    <RadioSelectList
      value="1"
      onChange={mockedOnChange}
      title="title"
      desc="desc"
      foo="foo"
    />,
  );

  expect(wrapper.props()).toEqual(
    expect.objectContaining({
      value: '1',
      onChange: mockedOnChange,
      title: 'title',
      desc: 'desc',
      foo: 'foo',
    }),
  );
});
