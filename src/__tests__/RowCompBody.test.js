import React from 'react';
import ReactDOM from 'react-dom';
import RowCompBody from '../RowCompBody';

it('renders without crashing', () => {
    const div = document.createElement('div');
    const element = (
        <RowCompBody>
            test
        </RowCompBody>
    );

    ReactDOM.render(element, div);
});
