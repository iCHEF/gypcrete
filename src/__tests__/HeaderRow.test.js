import React from 'react';
import ReactDOM from 'react-dom';

import HeaderRow from '../HeaderRow';

it('renders without crashing', () => {
    const div = document.createElement('div');
    const element = <HeaderRow left="Left" center="Title" right="Right" />;

    ReactDOM.render(element, div);
});
