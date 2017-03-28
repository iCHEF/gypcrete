import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import RowCompBody from '../RowCompBody';
import TextLabel, { PureTextLabel } from '../TextLabel';

describe('rowComp(TextLabel)', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        const element = <TextLabel basic="Basic text" />;

        ReactDOM.render(element, div);
    });

    it('should be wrapped with rowComp() mixin', () => {
        // Since `wrapper.name()` only captures the top-most rendered compnent.
        const Component = () => <TextLabel basic="Basic text" />;
        const wrapperForName = shallow(<Component />);
        expect(wrapperForName.name()).toBe('rowComp(TextLabel)');

        // To see if its wrapped properly.
        const wrapperForChild = shallow(<TextLabel basic="Basic text" />);
        expect(wrapperForChild.find(PureTextLabel).exists()).toBeTruthy();
    });
});

describe('Pure <TextLabel>', () => {
    it('renders everything in <RowCompBody>', () => {
        const wrapper = shallow(<PureTextLabel>Hello World</PureTextLabel>);

        expect(wrapper.children()).toHaveLength(1);
        expect(wrapper.find(RowCompBody).exists()).toBeTruthy();
        expect(wrapper.find(RowCompBody).shallow().text()).toBe('Hello World');
    });
});
