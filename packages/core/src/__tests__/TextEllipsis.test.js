import { render } from '@testing-library/react';
import TextEllipsis from '../TextEllipsis';

it('renders without crashing', () => {
  const element = <TextEllipsis>Hello World</TextEllipsis>;

  render(element);
});
