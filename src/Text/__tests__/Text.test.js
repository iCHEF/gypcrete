import React from 'react';
import ReactDOM from 'react-dom';
import Text from '../Text';

it('renders without crashing', () => {
    const div = document.createElement('div');
    const element = (
        <Text
            align="right"
            basic="Basic text"
            aside="Aside text"
            tag="Tag" />
    );

    ReactDOM.render(element, div);
});

