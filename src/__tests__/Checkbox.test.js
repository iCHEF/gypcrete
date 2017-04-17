import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';

import Checkbox, { PureCheckbox } from '../Checkbox';
import RowCompBody from '../RowCompBody';

describe('rowComp(Checkbox)', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        const element = <Checkbox basic="Basic text" />;

        ReactDOM.render(element, div);
    });
});

describe('Pure <Checkbox>', () => {
    it('renders <input type=checkbox> along with rowComp parts inside <RowCompBody>', () => {
        const wrapper = shallow(
            <PureCheckbox>Foo children</PureCheckbox>
        );
        const bodyWrapper = wrapper.find(RowCompBody);

        expect(bodyWrapper.contains(<input type="checkbox" />));
    });

    it('renders <input> in icon wrapper before rowComp parts', () => {
        const wrapper = shallow(
            <PureCheckbox>Foo children</PureCheckbox>
        );
        const bodyWrapper = wrapper.find(RowCompBody);

        expect(bodyWrapper.childAt(0).hasClass('ic-checkbox__icon-wrapper'));
        expect(bodyWrapper.childAt(0).find('input').exists()).toBeTruthy();
    });

    it('updates indeterminate prop on <input type=checkbox>', () => {
        const wrapper = mount(
            <PureCheckbox>Foo children</PureCheckbox>
        );
        expect(wrapper.find('input').getNode().indeterminate).toBeFalsy();

        wrapper.setProps({ indeterminate: true });
        expect(wrapper.find('input').getNode().indeterminate).toBeTruthy();
    });

    it('passes whitelisted props to <input>', () => {
        const handleChange = jest.fn();
        const wrapper = shallow(
            <PureCheckbox checked defaultChecked disabled onChange={handleChange}>
                Foo children
            </PureCheckbox>
        );
        const inputWrapper = wrapper.find('input');

        expect(inputWrapper.prop('checked')).toBeTruthy();
        expect(inputWrapper.prop('defaultChecked')).toBeTruthy();
        expect(inputWrapper.prop('disabled')).toBeTruthy();
        expect(inputWrapper.prop('onChange')).toBe(handleChange);
    });

    it('passes every props to <input> from the input prop', () => {
        const wrapper = shallow(
            <PureCheckbox input={{ readonly: true, id: 'foo-checkbox' }}>
                Foo children
            </PureCheckbox>
        );
        const inputWrapper = wrapper.find('input');

        expect(inputWrapper.prop('readonly')).toBeTruthy();
        expect(inputWrapper.prop('id')).toBe('foo-checkbox');
    });
});
