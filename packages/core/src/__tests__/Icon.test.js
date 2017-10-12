import React from 'react';
import ReactDOM from 'react-dom';
import Icon from '../Icon';

it('renders without crashing', () => {
    const div = document.createElement('div');
    const element = <Icon type="duplicate" />;

    ReactDOM.render(element, div);
});
