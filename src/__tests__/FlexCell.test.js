import React from 'react';
import ReactDOM from 'react-dom';
import FlexCell from '../FlexCell';

it('renders without crashing', () => {
    const div = document.createElement('div');
    const element = (
        <FlexCell>
            <h1>Hello World</h1>
        </FlexCell>
    );

    ReactDOM.render(element, div);
});
