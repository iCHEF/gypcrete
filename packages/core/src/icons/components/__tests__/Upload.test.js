import { render } from '@testing-library/react';
import Upload from '../Upload';

it('renders without crashing', () => {
  const element = <Upload />;

  render(element);
});
