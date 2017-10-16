import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import Popover, { PurePopover, BEM } from '../Popover';

describe('mixed(<Popover>)', () => {
    it('should render without crashing', () => {
        const div = document.createElement('div');
        const element = <Popover />;

        ReactDOM.render(element, div);
    });
});

describe('Pure <Popover>', () => {
    it('renders class names in respond to placement prop', () => {
        const wrapper = shallow(<PurePopover placement="bottom" />);
        expect(wrapper.hasClass(
            BEM.root
                .modifier('bottom')
                .toString({ stripBlock: true })
        )).toBeTruthy();

        wrapper.setProps({ placement: 'top' });
        expect(wrapper.hasClass(
            BEM.root
                .modifier('top')
                .toString({ stripBlock: true })
        )).toBeTruthy();
    });

    it('passes arrowStyle prop to arrow node', () => {
        const wrapper = shallow(
            <PurePopover arrowStyle={{ top: 50, left: 100 }} />
        );
        const arrowClassName = BEM.arrow.toString();

        expect(wrapper.find(`.${arrowClassName}`).prop('style'))
            .toMatchObject({
                top: 50,
                left: 100,
            });
    });
});
