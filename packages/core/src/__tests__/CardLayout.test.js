import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CardLayout from '../CardLayout';

describe('CardLayout', () => {
  it('should render with all supported layouts', () => {
    // grid (default)
    const { container: gridContainer } = render(<CardLayout>Grid Layout</CardLayout>);
    expect(screen.getByText('Grid Layout')).toBeInTheDocument();
    expect(gridContainer.firstChild).toHaveClass('gyp-card-layout gyp-card-layout--grid');

    // row
    const { container: rowContainer } = render(<CardLayout layout="row">Row Layout</CardLayout>);
    expect(screen.getByText('Row Layout')).toBeInTheDocument();
    expect(rowContainer.firstChild).toHaveClass('gyp-card-layout gyp-card-layout--row');

    // column
    const { container: columnContainer } = render(
      <CardLayout layout="column">Column Layout</CardLayout>,
    );
    expect(screen.getByText('Column Layout')).toBeInTheDocument();
    expect(columnContainer.firstChild).toHaveClass('gyp-card-layout gyp-card-layout--column');
  });
});
