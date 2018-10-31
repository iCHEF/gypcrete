import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import SplitView, { BEM } from '../SplitView';

it('renders without crashing', () => {
    const div = document.createElement('div');
    const element = <SplitView />;

    ReactDOM.render(element, div);
});

it('renders with BEM class as column of <SplitView>', () => {
    const wrapper = shallow(<SplitView />);

    expect(wrapper.hasClass(BEM.root.toString())).toBeTruthy();
});
