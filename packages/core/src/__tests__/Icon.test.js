import React from 'react';
import { render } from '@testing-library/react';
import Icon from '../Icon';

it('renders without crashing', () => {
  const element = <Icon type="duplicate" />;

  render(element);
});
