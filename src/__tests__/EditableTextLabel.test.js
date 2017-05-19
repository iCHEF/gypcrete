import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';

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

    expect(wrapper.type()).toEqual(TextLabel);
    expect(wrapper.prop('basic')).toBe('Foo');
    expect(wrapper.prop('children')).toBeUndefined();
});

it('renders an <EditableText> when in edit mode', () => {
    const wrapper = shallow(<EditableTextLabel basic="Foo" inEdit />);

    expect(wrapper.prop('children')[0]).toBeNull();
    expect(wrapper.prop('children')[1].type).toEqual(EditableText);

    wrapper.setProps({ icon: 'printer' });
    expect(wrapper.prop('children')[0]).toEqual(<Icon type="printer" />);
    expect(wrapper.prop('children')[1].type).toEqual(EditableText);

    wrapper.setProps({ inEdit: false, status: 'loading' });
    expect(wrapper.prop('children')[0]).toEqual(<Icon type="printer" />);
    expect(wrapper.prop('children')[1].type).toEqual(EditableText);
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

it('renders <EditableText> with initial value and onEditEnd in edit mode', () => {
    const handleEditEnd = jest.fn();
    const wrapper = shallow(<EditableTextLabel basic="Foo" inEdit onEditEnd={handleEditEnd} />);

    expect(wrapper.prop('children')[1].props.defaultValue).toBe('Foo');
    expect(wrapper.prop('children')[1].props.onEditEnd).toBe(handleEditEnd);
});

it('renders <EditableText> with layout props the same as rowComp() in edit mode', () => {
    const wrapper = shallow(<EditableTextLabel basic="Foo" align="left" inEdit />);

    Object.values(ROW_COMP_ALIGN).forEach((alignment) => {
        let layoutProps = getTextLayoutProps(alignment, false);
        wrapper.setProps({ align: alignment, icon: undefined });

        expect(wrapper.prop('children')[1].props.align).toBe(layoutProps.align);
        expect(wrapper.prop('children')[1].props.noGrow).toBe(layoutProps.noGrow);

        layoutProps = getTextLayoutProps(alignment, true);
        wrapper.setProps({ align: alignment, icon: 'printer' });

        expect(wrapper.prop('children')[1].props.align).toBe(layoutProps.align);
        expect(wrapper.prop('children')[1].props.noGrow).toBe(layoutProps.noGrow);
    });
});

it('calls <EditableText> to focus its <input> when going edit mode', () => {
    const wrapper = mount(<EditableTextLabel basic="Foo" />);

    const instance = wrapper.instance();
    const originalDidUpdate = instance.componentDidUpdate;

    const focusInputNode = jest.fn();
    const getRenderedComponent = jest.fn(() => ({ focusInputNode }));

    // Mock `componentDidUpdate` so we can apply more mocking on refs.
    instance.componentDidUpdate = (...args) => {
        if (instance.props.inEdit) {
            instance.editableTextRef.getRenderedComponent = getRenderedComponent;
        }
        originalDidUpdate.apply(instance, args);
    };

    // Component updated without `inEdit`
    wrapper.setProps({ basic: 'Bar' });
    expect(getRenderedComponent).not.toHaveBeenCalled();
    expect(focusInputNode).not.toHaveBeenCalled();


    // Component updated **with** `inEdit`
    wrapper.setProps({ inEdit: true });
    expect(getRenderedComponent).toHaveBeenCalled();
    expect(focusInputNode).toHaveBeenCalled();
});
