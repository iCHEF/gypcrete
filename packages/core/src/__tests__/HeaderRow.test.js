import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import HeaderRow from '../HeaderRow';

it('renders without crashing', () => {
    const div = document.createElement('div');
    const element = <HeaderRow left="Left" center="Title" right="Right" />;

    ReactDOM.render(element, div);
});

it('renders optional children besides 3 defined areas', () => {
    const wrapper = shallow(
        <HeaderRow>
            <div data-target>Hello World</div>
        </HeaderRow>
    );
    expect(wrapper.text()).toBe('Hello World');
    expect(wrapper.find('div[data-target]').exists()).toBeTruthy();
});
