import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import AnchoredTooltip from '../AnchoredTooltip';
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

    it('renders errorMsg inside <AnchoredTooltip> on mouse hover', () => {
        const wrapper = shallow(<PureIconLayout icon="add" errorMsg="Error: foo bar" />);
        expect(wrapper.find(AnchoredTooltip).exists()).toBeFalsy();

        wrapper.simulate('mouseenter');
        expect(wrapper.find(AnchoredTooltip).exists()).toBeTruthy();
        expect(wrapper.find(AnchoredTooltip).prop('children')).toBe('Error: foo bar');

        wrapper.simulate('mouseleave');
        expect(wrapper.find(AnchoredTooltip).exists()).toBeFalsy();
    });

    it('renders no tooltip on mouse hover when errorMsg does not exists', () => {
        const wrapper = shallow(<PureIconLayout icon="add" />);
        expect(wrapper.find(AnchoredTooltip).exists()).toBeFalsy();

        wrapper.simulate('mouseenter');
        expect(wrapper.find(AnchoredTooltip).exists()).toBeFalsy();
    });

    it('renders no tooltip if explicitly turned off', () => {
        const wrapper = shallow(<PureIconLayout icon="add" tooltip={false} />);
        expect(wrapper.find(AnchoredTooltip).exists()).toBeFalsy();

        wrapper.simulate('mouseenter');
        expect(wrapper.find(AnchoredTooltip).exists()).toBeFalsy();
    });
});
