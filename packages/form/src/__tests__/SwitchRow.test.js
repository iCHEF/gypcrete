import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SwitchRow from '../SwitchRow';

describe('SwitchRow', () => {
  const mockOnChange = jest.fn();
  const defaultProps = {
    label: 'Test Label',
    asideOn: 'ON',
    asideOff: 'OFF',
    defaultChecked: false,
    onChange: mockOnChange,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with default props', () => {
    render(<SwitchRow {...defaultProps} />);
    expect(screen.getByText(defaultProps.label)).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(screen.getByText(defaultProps.asideOff)).toBeInTheDocument();
  });

  it('updates switch state correctly when it is uncontrolled', () => {
    render(<SwitchRow {...defaultProps} />);
    const switchElement = screen.getByRole('checkbox');
    userEvent.click(switchElement);
    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(screen.getByText(defaultProps.asideOn)).toBeInTheDocument();
  });

  it('does not update switch state when it is controlled', () => {
    render(
      <SwitchRow
        {...defaultProps}
        checked={false}
      />,
    );
    const switchElement = screen.getByRole('checkbox');
    userEvent.click(switchElement);
    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(screen.getByText(defaultProps.asideOff)).toBeInTheDocument();
  });

  it('renders children correctly', () => {
    render(
      <SwitchRow {...defaultProps}>
        <div>Test Children</div>
      </SwitchRow>,
    );
    expect(screen.getByText('Test Children')).toBeInTheDocument();
  });
});
