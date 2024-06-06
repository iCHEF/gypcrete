import { render } from '@testing-library/react';
import { shallow } from 'enzyme';

import { Icon } from '@ichef/gypcrete';
import EditorPlaceholder, { CenterIcon } from '../EditorPlaceholder';

describe('<EditorPlaceholder>', () => {
  it('renders without crashing', () => {
    const element = <EditorPlaceholder canvasHeight={200} />;

    render(element);
  });

  it('shows an icon inside for normal mode or loading mode', () => {
    const wrapper = shallow(<EditorPlaceholder canvasHeight={200} />);

    expect(wrapper.containsMatchingElement(<CenterIcon type="picture" />)).toBeTruthy();

    wrapper.setProps({ loading: true });

    expect(wrapper.containsMatchingElement(<CenterIcon type="loading" />)).toBeTruthy();
  });

  it('adjusts icon size to a maximum of 96px', () => {
    const wrapper = shallow(<EditorPlaceholder canvasHeight={30} />);
    expect(wrapper.find(CenterIcon).prop('style').fontSize).toBe(22);

    wrapper.setProps({ canvasHeight: 50 });
    expect(wrapper.find(CenterIcon).prop('style').fontSize).toBe(42);

    wrapper.setProps({ canvasHeight: 120 });
    expect(wrapper.find(CenterIcon).prop('style').fontSize).toBe(96);
  });
});

describe('<CenterIcon>', () => {
  it('renders an gypcrete Icon inside', () => {
    const wrapper = shallow(<CenterIcon type="picture" />);
    expect(wrapper.containsMatchingElement(<Icon type="picture" />)).toBeTruthy();
  });

  it('spins for loading icon', () => {
    const wrapper = shallow(<CenterIcon type="loading" />);

    expect(
      wrapper.containsMatchingElement(
        <Icon
          type="loading"
          spinning
        />,
      ),
    ).toBeTruthy();
  });
});
