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

it('fires onEditEnd with input value on input blurs', () => {
    const handleEditEnd = jest.fn(() => EditableTextLabel.defaultProps.onEditEnd());
    const wrapper = shallow(<EditableTextLabel basic="foo" onEditEnd={handleEditEnd} inEdit />);

    expect(handleEditEnd).not.toHaveBeenCalled();

    // Blur without changing input value
    wrapper.find(EditableText).simulate('blur', { currentTarget: { value: 'foo' } });
    expect(handleEditEnd).toHaveBeenLastCalledWith(
        expect.objectContaining({ value: 'foo' })
    );

    // Blur with a different value
    wrapper.find(EditableText).simulate('blur', { currentTarget: { value: 'bar' } });
    expect(handleEditEnd).toHaveBeenLastCalledWith(
        expect.objectContaining({ value: 'bar' })
    );
});

it('blurs input on Enter key', () => {
    const wrapper = shallow(<EditableTextLabel basic="foo" inEdit />);
    const mockedBlur = jest.fn();

    expect(mockedBlur).not.toHaveBeenCalled();

    wrapper.find(EditableText).simulate('keydown', {
        currentTarget: { blur: mockedBlur },
        keyCode: keycode('Enter'),
    });
    expect(mockedBlur).toHaveBeenCalledTimes(1);
});

it('fires onEditEnd with value as null on Escape key', () => {
    const handleEditEnd = jest.fn();
    const wrapper = shallow(<EditableTextLabel basic="foo" onEditEnd={handleEditEnd} inEdit />);

    expect(handleEditEnd).not.toHaveBeenCalled();

    wrapper.find(EditableText).simulate('keydown', { keyCode: keycode('Escape') });
    expect(handleEditEnd).toHaveBeenLastCalledWith(
        expect.objectContaining({ value: null })
    );
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

// Self-controlled edit mode
it("goes edit mode on double click if 'inEdit' is uncontrolled", () => {
    const wrapper = shallow(<EditableTextLabel basic="Foo" />);
    expect(wrapper.state('inEdit')).toBeFalsy();

    wrapper.simulate('dblclick');
    expect(wrapper.state('inEdit')).toBeTruthy();
});

it("stays in edit mode as long as 'inEdit' is uncontrolled", () => {
    const wrapper = shallow(<EditableTextLabel basic="Foo" />);
    wrapper.setState({ inEdit: true });
    wrapper.setProps({ icon: 'printer' });

    expect(wrapper.state('inEdit')).toBeTruthy();
});

it("leaves edit mode on blur if 'inEdit' is uncontrolled", () => {
    const wrapper = mount(<EditableTextLabel basic="foo" />);

    wrapper.setState({ inEdit: true });
    wrapper.find('input').simulate('blur');

    expect(wrapper.state('inEdit')).toBeFalsy();
});

it("leaves edit mode on Esc if 'inEdit' is uncontrolled", () => {
    const wrapper = mount(<EditableTextLabel basic="foo" />);

    wrapper.setState({ inEdit: true });
    wrapper.find('input').simulate('keydown', { keyCode: keycode('Escape') });

    expect(wrapper.state('inEdit')).toBeFalsy();
});

it("does not go edit mode on double click if 'inEdit' is controlled", () => {
    const wrapper = shallow(<EditableTextLabel basic="Foo" inEdit={false} />);
    expect(wrapper.state('inEdit')).toBeFalsy();

    wrapper.simulate('dblclick');
    expect(wrapper.state('inEdit')).toBeFalsy();
});

// Double-touch simulation
it('triggers dblClick callback when touch twice with in 250ms', () => {
    const handleDblClick = jest.fn();
    const wrapper = shallow(<EditableTextLabel basic="foo" onDblClick={handleDblClick} />);

    expect(handleDblClick).not.toHaveBeenCalled();

    return new Promise((resolve) => {
        wrapper.simulate('touchstart');
        expect(wrapper.state('touchCount')).toBe(1);

        setTimeout(() => {
            wrapper.simulate('touchstart');
            resolve();
        }, 200);
    }).then(() => {
        expect(handleDblClick).toHaveBeenCalledTimes(1);
    });
});

it('does not trigger dblClick callback when touch twice in over 250ms', () => {
    const handleDblClick = jest.fn();
    const wrapper = shallow(<EditableTextLabel basic="foo" onDblClick={handleDblClick} />);

    expect(handleDblClick).not.toHaveBeenCalled();

    return new Promise((resolve) => {
        wrapper.simulate('touchstart');
        setTimeout(() => {
            wrapper.simulate('touchstart');
            resolve();
        }, 500);
    }).then(() => {
        expect(handleDblClick).not.toHaveBeenCalled();
    });
});
