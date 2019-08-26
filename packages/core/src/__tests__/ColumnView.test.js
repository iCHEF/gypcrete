import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import ColumnView, { BEM as COLUMN_BEM } from '../ColumnView';

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

    it('can make body a Flexbox', () => {
        const wrapper = shallow(<ColumnView flexBody>Foo bar</ColumnView>);

        expect(
            wrapper.find(`.${COLUMN_BEM.body}`).hasClass(
                COLUMN_BEM.body.modifier('flex').toString({ stripBlock: true })
            )
        ).toBeTruthy();
    });

    it('can override padding on body wrapper', () => {
        const padding = {
            top: 1,
            bottom: 2,
            left: 3,
            right: 4,
        };
        const wrapper = shallow(
            <ColumnView bodyPadding={padding}>
                Foo bar
            </ColumnView>
        );
        expect(wrapper.find(`.${COLUMN_BEM.body}`).prop('style')).toEqual({
            paddingTop: 1,
            paddingBottom: 2,
            paddingLeft: 3,
            paddingRight: 4,
        });
    });

    it('renders header area if "header" prop is given', () => {
        const wrapper = shallow(
            <ColumnView header={<span data-test="header" />} />
        );
        expect(wrapper.find(`.${COLUMN_BEM.header}`)).toHaveLength(1);
        expect(
            wrapper
                .find(`.${COLUMN_BEM.header}`)
                .containsMatchingElement(<span data-test="header" />)
        ).toBeTruthy();
    });

    it('renders footer area if "footer" prop is given', () => {
        const wrapper = shallow(
            <ColumnView footer={<span data-test="footer" />} />
        );
        expect(wrapper.find(`.${COLUMN_BEM.footer}`)).toHaveLength(1);
        expect(
            wrapper
                .find(`.${COLUMN_BEM.footer}`)
                .containsMatchingElement(<span data-test="footer" />)
        ).toBeTruthy();
    });
});
