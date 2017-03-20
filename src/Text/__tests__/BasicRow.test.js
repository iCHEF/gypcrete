import React from 'react';
import ReactDOM from 'react-dom';
import BasicRow from '../BasicRow';

it('renders without crashing', () => {
    const div = document.createElement('div');
    const element = (
        <BasicRow
            basic="Basic text"
            tag="Tag"
            className="ic-text__row ic-text__basic" />
    );

    ReactDOM.render(element, div);
});
