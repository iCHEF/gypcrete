import React from 'react';
import ReactDOM from 'react-dom';
import Upload from '../Upload';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const element = <Upload />;

  ReactDOM.render(element, div);
});
