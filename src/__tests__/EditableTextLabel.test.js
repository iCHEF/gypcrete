import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import keycode from 'keycode';

import { getTextLayoutProps, ROW_COMP_ALIGN } from '../mixins/rowComp';

import EditableText from '../EditableText';
import EditableTextLabel from '../EditableTextLabel';
import Icon from '../Icon';
import TextLabel from '../TextLabel';

it('renders without crashing', () => {
    const div = document.createElement('div');
    const element = <EditableTextLabel />;

    ReactDOM.render(element, div);
});

it('renders like a typical <TextLabel> when not inEdit or loading', () => {
    const wrapper = shallow(<EditableTextLabel basic="Foo" />);

    expect(wrapper.is(TextLabel)).toBeTruthy();
    expect(wrapper.prop('basic')).toBe('Foo');
    expect(wrapper.prop('children')).toBeUndefined();
});

it('renders <EditableText> inside <TextLabel> when in edit mode', () => {
    const wrapper = shallow(<EditableTextLabel basic="Foo" inEdit />);

    expect(wrapper.is(TextLabel)).toBeTruthy();
    expect(wrapper.find(EditableText).exists()).toBeTruthy();
    expect(wrapper.find(EditableText).prop('defaultValue')).toBe('Foo');

    wrapper.setProps({ inEdit: false });
    expect(wrapper.find(EditableText).exists()).toBeFalsy();
});

it('renders icon no matter in edit mode or not', () => {
    const wrapper = shallow(<EditableTextLabel icon="printer" basic="Foo" />);

    // Icon is rendered by <TextLabel> when not inEdit
    expect(wrapper.dive().contains(<Icon type="printer" />)).toBeTruthy();

    // Icon is passed into <TextLabel> by <EditableTextLabel> when inEdit
    wrapper.setProps({ inEdit: true });
    expect(wrapper.contains(<Icon type="printer" />)).toBeTruthy();
});

it('renders <EditableText> with layout props the same as rowComp() in edit mode', () => {
    const wrapper = shallow(<EditableTextLabel basic="Foo" align="left" inEdit />);

    Object.values(ROW_COMP_ALIGN).forEach((alignment) => {
        let layoutProps = getTextLayoutProps(alignment, false);
        wrapper.setProps({ align: alignment, icon: undefined });

        expect(wrapper.find(EditableText).prop('align')).toBe(layoutProps.align);
        expect(wrapper.find(EditableText).prop('noGrow')).toBe(layoutProps.noGrow);

        layoutProps = getTextLayoutProps(alignment, true);
        wrapper.setProps({ align: alignment, icon: 'printer' });

        expect(wrapper.find(EditableText).prop('align')).toBe(layoutProps.align);
        expect(wrapper.find(EditableText).prop('noGrow')).toBe(layoutProps.noGrow);
    });
});

it('requests to go edit mode when double-clicked in normal mode', () => {
    const handleEditRequest = jest.fn();
    const wrapper = shallow(
        <EditableTextLabel basic="Foo" onEditRequest={handleEditRequest} />
    );

    wrapper.simulate('dblclick');
    expect(handleEditRequest).toHaveBeenCalled();

    // Should not break event when callback not set.
    wrapper.setProps({ onEditRequest: undefined });
    expect(() => wrapper.simulate('dblclick')).not.toThrowError();
});

it('fires onEditEnd with input value on input blurs', () => {
    const handleEditEnd = jest.fn(() => EditableTextLabel.defaultProps.onEditEnd());
    const wrapper = mount(<EditableTextLabel basic="foo" onEditEnd={handleEditEnd} inEdit />);
    const input = wrapper.find('input').node;

    expect(handleEditEnd).not.toHaveBeenCalled();

    // Blur without changing input value
    wrapper.find('input').simulate('blur');
    expect(handleEditEnd).toHaveBeenCalledTimes(1);
    expect(handleEditEnd.mock.calls[0][0].value).toBe('foo');

    // Blur with a different value
    input.value = 'bar';
    wrapper.find('input').simulate('blur');
    expect(handleEditEnd).toHaveBeenCalledTimes(2);
    expect(handleEditEnd.mock.calls[1][0].value).toBe('bar');
});

it('fires onEditEnd with input value on Enter key', () => {
    const handleEditEnd = jest.fn();
    const wrapper = mount(<EditableTextLabel basic="foo" onEditEnd={handleEditEnd} inEdit />);

    const input = wrapper.find('input').node;
    input.blur = jest.fn(() => wrapper.find('input').simulate('blur'));

    expect(handleEditEnd).not.toHaveBeenCalled();

    // Simulate 'Enter' without changing input value
    wrapper.find('input').simulate('keydown', { keyCode: keycode('Enter') });
    expect(handleEditEnd).toHaveBeenCalledTimes(1);
    expect(handleEditEnd.mock.calls[0][0].value).toBe('foo');

    // Simulate 'Enter' with a different value
    input.value = 'bar';
    wrapper.find('input').simulate('keydown', { keyCode: keycode('Enter') });
    expect(handleEditEnd).toHaveBeenCalledTimes(2);
    expect(handleEditEnd.mock.calls[1][0].value).toBe('bar');
});

it('fires onEditEnd with value as null on Escape key', () => {
    const handleEditEnd = jest.fn();
    const wrapper = mount(<EditableTextLabel basic="foo" onEditEnd={handleEditEnd} inEdit />);

    const input = wrapper.find('input').node;
    input.blur = jest.fn(() => wrapper.find('input').simulate('blur'));

    expect(handleEditEnd).not.toHaveBeenCalled();

    // Simulate 'Enter' without changing input value
    wrapper.find('input').simulate('keydown', { keyCode: keycode('Escape') });
    expect(handleEditEnd).toHaveBeenCalledTimes(1);
    expect(handleEditEnd.mock.calls[0][0].value).toBeNull();

    // Simulate 'Enter' with a different value
    input.value = 'bar';
    wrapper.find('input').simulate('keydown', { keyCode: keycode('Escape') });
    expect(handleEditEnd).toHaveBeenCalledTimes(2);
    expect(handleEditEnd.mock.calls[1][0].value).toBeNull();
});

it('does not fire onEditEnd on other keys', () => {
    const handleEditEnd = jest.fn();
    const wrapper = mount(<EditableTextLabel basic="foo" onEditEnd={handleEditEnd} inEdit />);

    expect(handleEditEnd).not.toHaveBeenCalled();

    wrapper.find('input').simulate('keydown', { keyCode: keycode('A') });
    expect(handleEditEnd).not.toHaveBeenCalled();

    wrapper.find('input').simulate('keydown', { keyCode: keycode('Ctrl') });
    expect(handleEditEnd).not.toHaveBeenCalled();

    wrapper.find('input').simulate('keydown', { keyCode: keycode('Delete') });
    expect(handleEditEnd).not.toHaveBeenCalled();
});
