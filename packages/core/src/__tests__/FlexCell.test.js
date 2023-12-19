import React from 'react';
import { render } from '@testing-library/react';
import FlexCell from '../FlexCell';

it('renders without crashing', () => {
  const element = (
    <FlexCell>
      <h1>Hello World</h1>
    </FlexCell>
  );

  render(element);
});
