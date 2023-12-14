import React from 'react';
import { screen, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EditableTextLabel from '../EditableTextLabel';

describe('EditableTextLabel', () => {
  const defaultProps = {
    inEdit: undefined,
    onEditEnd: jest.fn(),
    onDblClick: jest.fn(),
    icon: 'icon',
    basic: 'basic text',
    align: 'center',
    status: 'status',
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders in display mode by default', () => {
    render(<EditableTextLabel {...defaultProps} />);

    expect(screen.getByText(defaultProps.basic)).toBeInTheDocument();
  });

  it('enters edit mode on double click when inEdit is not controlled', () => {
    render(<EditableTextLabel {...defaultProps} />);

    userEvent.dblClick(screen.getByText(defaultProps.basic));

    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('does not enter edit mode on double click when inEdit is controlled as false', () => {
    const props = { ...defaultProps, inEdit: false };

    render(<EditableTextLabel {...props} />);

    userEvent.dblClick(screen.getByText(defaultProps.basic));
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
  });

  it('does not enter edit mode on double click when inEdit is controlled as true', () => {
    const props = { ...defaultProps, inEdit: true };

    render(<EditableTextLabel {...props} />);

    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('calls onDblClick when double clicked', () => {
    render(<EditableTextLabel {...defaultProps} />);
    userEvent.dblClick(screen.getByText(defaultProps.basic));
    expect(defaultProps.onDblClick).toHaveBeenCalledTimes(1);
  });

  it('inEdit is not controlled: call onEditEnd with input value and do not change the value when it blurs', async () => {
    render(<EditableTextLabel {...defaultProps} />);

    userEvent.dblClick(screen.getByText(defaultProps.basic));
    const input = screen.getByRole('textbox');
    userEvent.clear(input);
    userEvent.type(input, 'new text');
    userEvent.tab();

    await waitFor(() => expect(defaultProps.onEditEnd).toHaveBeenCalledWith({
      value: 'new text',
      event: expect.any(Object),
    }));

    expect(screen.getByText(defaultProps.basic)).toBeInTheDocument();
  });

  it('inEdit is controlled: call onEditEnd with input value and change the value when it blurs', async () => {
    render(<EditableTextLabel {...defaultProps} inEdit />);

    const input = screen.getByRole('textbox');
    userEvent.clear(input);
    userEvent.type(input, 'new text');
    userEvent.tab();

    await waitFor(() => expect(defaultProps.onEditEnd).toHaveBeenCalledWith({
      value: 'new text',
      event: expect.any(Object),
    }));

    expect(screen.getByText('new text')).toBeInTheDocument();
  });


  it('calls onEditEnd with null when escape key is pressed', async () => {
    render(<EditableTextLabel {...defaultProps} />);
    userEvent.dblClick(screen.getByText(defaultProps.basic));
    const input = screen.getByRole('textbox');
    userEvent.type(input, '{esc}');
    await waitFor(() => expect(defaultProps.onEditEnd).toHaveBeenCalledWith({
      value: null,
      event: expect.any(Object),
    }));
  });

  it('calls onEditEnd with input value when enter key is pressed', async () => {
    render(<EditableTextLabel {...defaultProps} />);
    userEvent.dblClick(screen.getByText(defaultProps.basic));
    const input = screen.getByRole('textbox');

    userEvent.clear(input);
    userEvent.type(input, 'new text{enter}');

    await waitFor(() => expect(defaultProps.onEditEnd).toHaveBeenCalledWith({
      value: 'new text',
      event: expect.any(Object),
    }));
  });
});
