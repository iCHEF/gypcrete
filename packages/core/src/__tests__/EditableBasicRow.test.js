import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EditableBasicRow, { ROW_INPUT_TAGS } from '../EditableBasicRow';

describe('<EditableBasicRow />', () => {
  let value;
  let onChange;
  let onFocus;
  let onBlur;

  beforeEach(() => {
    value = 'Test value';
    onChange = jest.fn();
    onFocus = jest.fn();
    onBlur = jest.fn();
  });

  it('renders correctly', () => {
    render(
      <EditableBasicRow
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    );

    const input = screen.getByRole('textbox');
    expect(input).toHaveValue(value);
  });

  it('handles input change', () => {
    render(
      <EditableBasicRow
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    );

    const input = screen.getByRole('textbox');
    userEvent.type(input, 'New test value');

    expect(onChange).toHaveBeenCalled();
  });

  it('handles input change and input is not controlled', () => {
    render(
      <EditableBasicRow
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    );

    const input = screen.getByRole('textbox');
    userEvent.type(input, 'New test value');

    expect(screen.getByText('New test value')).toBeInTheDocument();
  });

  it('handles input focus and blur', () => {
    render(
      <EditableBasicRow
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    );

    const input = screen.getByRole('textbox');
    fireEvent.focus(input);
    expect(onFocus).toHaveBeenCalled();

    fireEvent.blur(input);
    expect(onBlur).toHaveBeenCalled();
  });

  it('renders textarea when inputTag is set to TEXTAREA', () => {
    render(
      <EditableBasicRow
        inputTag={ROW_INPUT_TAGS.TEXTAREA}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    );

    const textarea = screen.getByRole('textbox');
    expect(textarea.tagName).toBe('TEXTAREA');
    expect(textarea).toHaveValue(value);
  });

  it('renders with default placeholder when value is not provided', () => {
    render(
      <EditableBasicRow
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    );

    const input = screen.getByPlaceholderText('Unset');
    expect(input).toHaveValue('');
  });

  it('renders as disabled when disabled prop is true', () => {
    render(
      <EditableBasicRow
        value={value}
        disabled
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    );

    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
  });

  it('renders as read-only when readOnly prop is true', () => {
    render(
      <EditableBasicRow
        value={value}
        readOnly
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    );

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('readonly');
  });
});
