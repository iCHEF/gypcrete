import React from 'react';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PureSearchInput as SearchInput } from '../SearchInput';

describe('<SearchInput />', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const setup = (props = {}) => {
    const utils = render(<SearchInput {...props} />);
    const input = utils.getByPlaceholderText('Search');
    return {
      input,
      ...utils,
    };
  };

  it('renders with default props', () => {
    const { input } = setup();
    expect(input.value).toBe('');
  });

  it('renders with initial value', () => {
    const { input } = setup({ defaultValue: 'Initial value' });
    expect(input.value).toBe('Initial value');
  });

  it('calls onChange when input changes when value is controlled', () => {
    const onChange = jest.fn();
    const { input } = setup({ onChange, value: 'Initial value' });
    userEvent.type(input, 'New value');
    expect(onChange).toHaveBeenCalledTimes(9);
  });

  it('calls onSearch when Enter is pressed', () => {
    const onSearch = jest.fn();
    const { input } = setup({ onSearch });
    userEvent.type(input, '{enter}');
    expect(onSearch).toHaveBeenCalledTimes(1);
  });

  it('calls onReset when reset button is clicked', () => {
    const onReset = jest.fn();
    const { input, getByLabelText } = setup({ defaultValue: 'Initial value', onReset });
    const resetButton = getByLabelText('Reset');
    userEvent.click(resetButton);
    expect(onReset).toHaveBeenCalledTimes(1);
    expect(input.value).toBe('');
  });

  it('does not call onSearch with empty value when blockEmptyValueSearch is true', () => {
    const onSearch = jest.fn();
    const { input } = setup({ onSearch, blockEmptyValueSearch: true });
    userEvent.type(input, '{enter}');
    expect(onSearch).not.toHaveBeenCalled();
  });

  it('does not call onSearch with duplicate value when blockDuplicateValueSearch is true', () => {
    const onSearch = jest.fn();
    const { input } = setup({ defaultValue: 'Initial value', onSearch, blockDuplicateValueSearch: true });
    userEvent.type(input, '{enter}');
    userEvent.type(input, '{enter}');
    expect(onSearch).toHaveBeenCalledTimes(1);
  });

  it('calls onSearch on blured when searchOnInputBlur is true', async () => {
    const onSearch = jest.fn();
    const { input } = setup({ onSearch, searchOnInputBlur: true });
    userEvent.type(input, 'New value');
    userEvent.tab();
    await waitFor(() => expect(onSearch).toHaveBeenCalledTimes(1));
  });

  it('does not call onSearch on change when searchOnInputChange is false', () => {
    const onSearch = jest.fn();
    const { input } = setup({ onSearch, searchOnInputChange: false });
    userEvent.type(input, 'New value');
    expect(onSearch).not.toHaveBeenCalled();
  });

  it('does not call onSearch on change when blockEmptyValueSearch is true and value is empty', () => {
    const onSearch = jest.fn();
    const { input } = setup({
      searchOnInputChange: true,
      onSearch,
      blockEmptyValueSearch: true,
      defaultValue: 'initial value',
    });
    userEvent.clear(input);
    expect(onSearch).not.toHaveBeenCalled();
  });

  it('calls onSearch on change when blockEmptyValueSearch is true and value is not empty', () => {
    const onSearch = jest.fn();
    const { input } = setup({ searchOnInputChange: true, onSearch, blockEmptyValueSearch: true });
    userEvent.type(input, 'New value');
    expect(onSearch).toHaveBeenCalledTimes(9);
  });

  it('calls onSearch on change when blockDuplicateValueSearch is true and value is not duplicate', () => {
    const onSearch = jest.fn();
    const { input } = setup({ onSearch, blockDuplicateValueSearch: true });
    userEvent.type(input, 'New value');
    userEvent.type(input, '{enter}');
    expect(onSearch).toHaveBeenCalledTimes(1);
  });

  it('does not call onSearch on change when blockDuplicateValueSearch is true and value is duplicate', () => {
    const onSearch = jest.fn();
    const { input } = setup({ defaultValue: 'Initial value', onSearch, blockDuplicateValueSearch: true });
    userEvent.type(input, 'Initial value');
    expect(onSearch).not.toHaveBeenCalled();
  });

  it('calls onSearch on change when blockDuplicateValueSearch is true and value is duplicate but different case', () => {
    const onSearch = jest.fn();
    const { input } = setup({ defaultValue: 'Initial value', onSearch, blockDuplicateValueSearch: true });
    userEvent.clear(input);
    userEvent.type(input, 'initial value');
    userEvent.type(input, '{enter}');
    expect(onSearch).toHaveBeenCalledTimes(1);
  });

  it('calls onReset when reset button is clicked and value is controlled', () => {
    const onReset = jest.fn();
    const { input, getByLabelText } = setup({ value: 'Initial value', onReset });
    const resetButton = getByLabelText('Reset');
    userEvent.click(resetButton);
    expect(onReset).toHaveBeenCalledTimes(1);
    expect(input.value).toBe('Initial value');
  });
});
