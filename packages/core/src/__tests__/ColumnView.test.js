import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import ColumnView, { ColumnPart, BEM as COLUMN_BEM } from '../ColumnView';

describe('<ColumnPart>', () => {
    it('passes every prop to wrapper when children exists', () => {
        const handleClick = jest.fn();
        const wrapper = shallow(
            <ColumnPart className="bar" onClick={handleClick}>
                Foo Bar
            </ColumnPart>
        );

        expect(wrapper.text()).toBe('Foo Bar');
        expect(wrapper.find('div').prop('className')).toBe('bar');
        expect(wrapper.find('div').prop('onClick')).toBe(handleClick);
    });

    it('renders null when children does not exist', () => {
        const wrapper = shallow(<ColumnPart />);
        expect(wrapper.type()).toBeNull();
    });
});

describe('<ColumnView>', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        const element = <ColumnView>Foo bar</ColumnView>;

        ReactDOM.render(element, div);
    });

    it('renders childen in a body wrapper', () => {
        const wrapper = shallow(<ColumnView>Foo bar</ColumnView>);

        expect(wrapper.find(`.${COLUMN_BEM.body}`)).toHaveLength(1);
        expect(wrapper.find(`.${COLUMN_BEM.body}`).text()).toBe('Foo bar');
    });

    it('can override bottom padding on body wrapper', () => {
        const wrapper = shallow(
            <ColumnView bottomPadding="0">
                Foo bar
            </ColumnView>
        );
        expect(wrapper.find(`.${COLUMN_BEM.body}`).prop('style')).toEqual({
            paddingBottom: '0',
        });
    });

    it('renders header in a header <ColumnPart>', () => {
        const wrapper = shallow(
            <ColumnView header={<span data-test="header" />} />
        );
        expect(wrapper.find(`.${COLUMN_BEM.header}`)).toHaveLength(1);
        expect(wrapper.find(`.${COLUMN_BEM.header}`).type()).toBe(ColumnPart);
        expect(
            wrapper
                .find(`.${COLUMN_BEM.header}`)
                .containsMatchingElement(<span data-test="header" />)
        ).toBeTruthy();
    });

    it('renders footer in a footer <ColumnPart>', () => {
        const wrapper = shallow(
            <ColumnView footer={<span data-test="footer" />} />
        );
        expect(wrapper.find(`.${COLUMN_BEM.footer}`)).toHaveLength(1);
        expect(wrapper.find(`.${COLUMN_BEM.footer}`).type()).toBe(ColumnPart);
        expect(
            wrapper
                .find(`.${COLUMN_BEM.footer}`)
                .containsMatchingElement(<span data-test="footer" />)
        ).toBeTruthy();
    });
});
