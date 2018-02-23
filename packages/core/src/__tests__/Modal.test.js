import React from 'react';
import ReactDOM from 'react-dom';
import { mount, shallow } from 'enzyme';

import { BEM, PureModal, ModalContent } from '../Modal';
import HeaderRow from '../HeaderRow';
import Overlay from '../Overlay';

describe('<PureModal> with mixins', () => {
    it('should render without crashing', () => {
        const div = document.createElement('div');
        const element = <PureModal />;

        ReactDOM.render(element, div);
    });
});

describe('Pure <PureModal>', () => {
    it('contains an <Overlay>', () => {
        const wrapper = shallow(<PureModal />);

        expect(wrapper.find(Overlay).exists()).toBeTruthy();
    });

    it('renders class names in response to the size prop', () => {
        const wrapper = shallow(<PureModal size="small" />);
        const testSizeProp = (size) => {
            wrapper.setProps({ size });
            expect(wrapper.hasClass(
                BEM.root
                    .modifier(size)
                    .toString({ stripBlock: true })
            )).toBeTruthy();
        };

        testSizeProp('small');
        testSizeProp('large');
        testSizeProp('full');
    });

    it('renders class names in response to the bodyPadding prop', () => {
        const wrapper = mount(<PureModal bodyPadding />);
        const paddingClass = BEM.body
                              .modifier('padding', true)
                              .toString({ stripBlock: true });
        expect(wrapper.find(`.${paddingClass}`).exists()).toBeTruthy();
    });
});

describe('<PureModal> with a header row', () => {
    it('renders a header in response to the header element', () => {
        const header = <HeaderRow />;
        const wrapper = mount(<PureModal />);
        const headerClass = `${BEM.header}`;
        wrapper.setProps({ header });
        expect(wrapper.find(`.${headerClass}`).exists()).toBeTruthy();
    });

    it('renders a header with label if the type of header is string', () => {
        const header = 'foo';
        const wrapper = mount(<PureModal />);
        const headerClass = `${BEM.header}`;
        wrapper.setProps({ header });
        expect(wrapper.find(`.${headerClass}`).exists()).toBeTruthy();
    });
});

describe('Pure <ModalContent>', () => {
    it('renders the modal container class name', () => {
        const wrapper = shallow(<ModalContent />);
        const containerClass = `${BEM.container}`;

        expect(wrapper.hasClass(containerClass)).toBeTruthy();
    });

    it('should render a padding if the prop bodyPadding is true', () => {
        const wrapper = shallow(<ModalContent bodyPadding />);
        const paddingClass = BEM.body
                              .modifier('padding', true)
                              .toString({ stripBlock: true });
        expect(wrapper.find(`.${paddingClass}`).exists()).toBeTruthy();
    });

    it('should not render a padding if the prop bodyPadding is null', () => {
        const wrapper = shallow(<ModalContent />);
        const paddingClass = BEM.body
                              .modifier('padding', true)
                              .toString({ stripBlock: true });
        expect(wrapper.find(`.${paddingClass}`).exists()).toBeFalsy();
    });
});
