import { render } from '@testing-library/react';
import { shallow } from 'enzyme';

import HeaderRow, { HeaderArea } from '../HeaderRow';

it('renders without crashing', () => {
  const element = (
    <HeaderRow
      left="Left"
      center="Title"
      right="Right"
    />
  );

  render(element);
});

describe('<HeaderArea> helper component', () => {
  it("renders null when 'content' is explicitly set to 'false'", () => {
    const wrapper = shallow(<HeaderArea content="Foo Bar" />);
    expect(wrapper.is('div')).toBeTruthy();
    expect(wrapper.text()).toBe('Foo Bar');

    wrapper.setProps({ content: undefined });
    expect(wrapper.is('div')).toBeTruthy();
    expect(wrapper.text()).toBe('');

    wrapper.setProps({ content: false });
    expect(wrapper.html()).toBe(null);
  });
});

describe('<HeaderRow>', () => {
  it('renders 3 defined areas with <HeaderArea>', () => {
    const mockedLeft = <span data-area="left" />;
    const mockedCenter = <span data-area="center" />;
    const mockedRight = <span data-area="right" />;

    const wrapper = shallow(
      <HeaderRow
        left={mockedLeft}
        center={mockedCenter}
        right={mockedRight}
      />,
    );
    expect(
      wrapper.containsAllMatchingElements([
        <HeaderArea content={mockedLeft} />,
        <HeaderArea content={mockedCenter} />,
        <HeaderArea content={mockedRight} />,
      ]),
    ).toBeTruthy();
  });

  it('renders optional children besides 3 defined areas', () => {
    const wrapper = shallow(
      <HeaderRow>
        <div data-target>Hello World</div>
      </HeaderRow>,
    );
    expect(wrapper.find('div[data-target]').exists()).toBeTruthy();
  });
});
