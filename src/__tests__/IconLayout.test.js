import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import Icon from '../Icon';
import IconLayout, { PureIconLayout } from '../IconLayout';
import StatusIcon from '../StatusIcon';

describe('<withStatus(IconLayout)>', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        const element = <IconLayout icon="printer" />;

        ReactDOM.render(element, div);
    });

    it('receives props from withStatus() mixin', () => {
        const wrapper = shallow(
            <IconLayout icon="pritner" />,
            { context: { status: 'error', errorMsg: 'bar' } }
        );

        expect(wrapper.prop('statusIcon').type).toBe(StatusIcon);
        expect(wrapper.prop('errorMsg')).toBe('bar');
    });
});

describe('Pure <IconLayout>', () => {
    it('renders string icon into <Icon>', () => {
        const wrapper = shallow(<PureIconLayout icon="printer" />);

        expect(wrapper.find(Icon).exists()).toBeTruthy();
        expect(wrapper.find(Icon).prop('type')).toBe('printer');
    });

    it('renders icon without touch if already an <Icon>', () => {
        const icon = <Icon type="add" />;
        const wrapper = shallow(<PureIconLayout icon={icon} />);

        expect(wrapper.find(Icon).exists()).toBeTruthy();
        expect(wrapper.find(Icon).prop('type')).toBe('add');
    });

    it('renders statusIcon without touch', () => {
        const statusIcon = <StatusIcon status="loading" />;
        const wrapper = shallow(<PureIconLayout icon="add" statusIcon={statusIcon} />);

        expect(wrapper.find(StatusIcon).exists()).toBeTruthy();
        expect(wrapper.find(StatusIcon).prop('status')).toBe('loading');
    });
});
