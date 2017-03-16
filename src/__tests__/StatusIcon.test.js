import React from 'react';
import ReactDOM from 'react-dom';
import StatusIcon from '../StatusIcon';

it('renders without crashing', () => {
    const div = document.createElement('div');
    const element = <StatusIcon status="loading" />;

    ReactDOM.render(element, div);
});
