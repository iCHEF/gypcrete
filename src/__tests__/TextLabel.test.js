import React from 'react';
import ReactDOM from 'react-dom';
import TextLabel from '../TextLabel';

it('renders without crashing', () => {
    const div = document.createElement('div');
    const element = <TextLabel basic="Basic text" />;

    ReactDOM.render(element, div);
});
