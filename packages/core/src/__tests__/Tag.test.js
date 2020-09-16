import React from 'react';
import ReactDOM from 'react-dom';
import Tag from '../Tag';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const element = <Tag>Printer</Tag>;

  ReactDOM.render(element, div);
});
