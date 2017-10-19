import React from 'react';
import ReactDOM from 'react-dom';
import TextEllipsis from '../TextEllipsis';

it('renders without crashing', () => {
    const div = document.createElement('div');
    const element = (
        <TextEllipsis>
            Hello World
        </TextEllipsis>
    );

    ReactDOM.render(element, div);
});
