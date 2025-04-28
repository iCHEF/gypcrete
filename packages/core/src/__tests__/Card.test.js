import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Card from '../Card';

describe('Card', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with required props', () => {
    const { getByText, queryByText, queryByRole } = render(
      <Card
        iconType="favorite"
        title="Test Title"
      />,
    );

    expect(queryByRole('presentation')).toHaveClass('gyp-icon-favorite');
    expect(getByText('Test Title')).toBeInTheDocument();
    expect(queryByText(/description/i)).not.toBeInTheDocument();
  });

  it('renders with description when provided', () => {
    const { getByText } = render(
      <Card
        iconType="test-icon"
        title="Test Title"
        description="Test Description"
      />,
    );

    expect(getByText('Test Title')).toBeInTheDocument();
    expect(getByText('Test Description')).toBeInTheDocument();
  });

  it('renders with custom className when provided', () => {
    const { container } = render(
      <Card
        iconType="test-icon"
        title="Test Title"
        className="custom-class"
      />,
    );

    expect(container.firstChild).toHaveClass('custom-class');
    expect(container.firstChild).toHaveClass('gyp-card');
  });

  it('passes through other props to the root element', () => {
    const { getByText } = render(
      <Card
        iconType="test-icon"
        title="Test Title"
        cardProps={{
          'data-fe-test-id': 'test-card',
          'aria-label': 'test card',
        }}
      />,
    );

    const card = getByText('Test Title').closest('.gyp-card');
    expect(card).toHaveAttribute('aria-label', 'test card');
    expect(card).toHaveAttribute('data-fe-test-id', 'test-card');
  });

  it('should invoke onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(
      <Card
        iconType="favorite"
        title="Test Title"
        onClick={handleClick}
      />,
    );

    const card = screen.getByText('Test Title').closest('.gyp-card');

    userEvent.click(card);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
