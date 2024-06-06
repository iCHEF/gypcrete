import { render } from '@testing-library/react';
import Tag from '../Tag';

it('renders without crashing', () => {
  const element = <Tag>Printer</Tag>;

  render(element);
});
