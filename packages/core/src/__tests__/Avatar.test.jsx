import { render } from '@testing-library/react';
import { shallow } from 'enzyme';

import Avatar from '../Avatar';

describe('<Avatar>', () => {
  it('renders without crashing', () => {
    const element = (
      <Avatar
        src="LINK"
        alt="ALT"
      />
    );

    render(element);
  });

  it('handles type modifiers', () => {
    let wrapper = shallow(
      <Avatar
        src="LINK"
        alt="ALT"
      />,
    );
    expect(wrapper.hasClass('gyp-avatar--square')).toBeTruthy();

    wrapper = shallow(
      <Avatar
        type="square"
        src="LINK"
        alt="ALT"
      />,
    );
    expect(wrapper.hasClass('gyp-avatar--square')).toBeTruthy();

    wrapper = shallow(
      <Avatar
        type="rounded"
        src="LINK"
        alt="ALT"
      />,
    );
    expect(wrapper.hasClass('gyp-avatar--rounded')).toBeTruthy();

    wrapper = shallow(
      <Avatar
        type="circle"
        src="LINK"
        alt="ALT"
      />,
    );
    expect(wrapper.hasClass('gyp-avatar--circle')).toBeTruthy();
  });
});
