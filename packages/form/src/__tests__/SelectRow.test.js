import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SelectRow from '../SelectRow';
import SelectOption from '../SelectOption';

describe('SelectRow', () => {
  const mockFn = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render selected option with controlled value correctly', () => {
    const { rerender } = render(
      <SelectRow
        label="Test Label"
        value="no"
        onChange={mockFn}
      >
        <SelectOption
          label="Yes"
          value="yes"
        />
        <SelectOption
          label="No"
          value="no"
        />
      </SelectRow>,
    );

    expect(screen.getByText('No')).toBeInTheDocument();

    rerender(
      <SelectRow
        label="Test Label"
        value="yes"
        onChange={mockFn}
      >
        <SelectOption
          label="Yes"
          value="yes"
        />
        <SelectOption
          label="No"
          value="no"
        />
      </SelectRow>,
    );

    expect(screen.getByText('Yes')).toBeInTheDocument();
  });

  it('handle onChange event in single mode', () => {
    render(
      <SelectRow
        label="Test Label"
        onChange={mockFn}
      >
        <SelectOption
          label="Yes"
          value="yes"
        />
        <SelectOption
          label="No"
          value="no"
        />
      </SelectRow>,
    );

    const dropdownButton = screen.getByRole('presentation');
    userEvent.click(dropdownButton);

    const checkboxes = screen.getAllByRole('checkbox');
    const yesOptionCheckbox = checkboxes[0];
    const noOptionCheckbox = checkboxes[1];
    userEvent.click(yesOptionCheckbox);

    expect(mockFn).toHaveBeenCalledWith('yes');

    // should close popover
    expect(noOptionCheckbox).not.toBeInTheDocument();
    expect(screen.queryByText('No')).not.toBeInTheDocument();
  });

  // 測試多個選項渲染正確及處理 onChange 事件
  it('should render selected options and handle onChange event with multiple options', () => {
    render(
      <SelectRow
        label="Test Label"
        multiple
        defaultValue={['option1', 'option2']}
        onChange={mockFn}
      >
        <SelectOption
          label="Option 1"
          value="option1"
        />
        <SelectOption
          label="Option 2"
          value="option2"
        />
        <SelectOption
          label="Option 3"
          value="option3"
        />
      </SelectRow>,
    );

    expect(screen.getByText('Option 1, Option 2')).toBeInTheDocument();

    const dropdownButton = screen.getByRole('presentation');
    userEvent.click(dropdownButton);

    const checkboxes = screen.getAllByRole('checkbox');
    const option3Checkbox = checkboxes[3];
    userEvent.click(option3Checkbox);

    expect(mockFn).toHaveBeenCalledWith(['option1', 'option2', 'option3']);
  });

  it('should show unset when no defaultValue is provided in multiple mode', () => {
    render(
      <SelectRow
        label="Test Label"
        multiple
        onChange={mockFn}
      >
        <SelectOption
          label="Option 1"
          value="option1"
        />
        <SelectOption
          label="Option 2"
          value="option2"
        />
        <SelectOption
          label="Option 3"
          value="option3"
        />
      </SelectRow>,
    );

    expect(screen.getByText('(Unset)')).toBeInTheDocument();
  });

  // 測試禁用情境
  it('dropdown icon should not be clickable when disabled', () => {
    render(
      <SelectRow
        disabled
        label="Disabled row"
      >
        <SelectOption
          label="Yes"
          value="yes"
        />
        <SelectOption
          label="No"
          value="no"
        />
      </SelectRow>,
    );

    const dropdownButton = screen.getByRole('presentation');
    userEvent.click(dropdownButton);

    expect(screen.queryByText('Yes')).not.toBeInTheDocument();
    expect(screen.queryByText('No')).not.toBeInTheDocument();
  });

  // ListRow props 測試
  it('should display an error message', () => {
    render(
      <SelectRow
        checked
        label="Error Test"
        status="error"
        errorMsg="error message"
        value="test"
        onChange={mockFn}
      >
        <SelectOption
          label="Test"
          value="test"
        />
      </SelectRow>,
    );

    expect(screen.getByText('error message')).toBeInTheDocument();
  });

  // 測試自訂 'All' 文字
  it('should render with a custom All label', () => {
    render(
      <SelectRow
        multiple
        label="Custom All Test"
        asideAllLabel="ALL SELECTED"
        defaultValue={['option1', 'option2', 'option3']}
        onChange={mockFn}
      >
        <SelectOption
          label="Option 1"
          value="option1"
        />
        <SelectOption
          label="Option 2"
          value="option2"
        />
        <SelectOption
          label="Option 3"
          value="option3"
        />
      </SelectRow>,
    );

    expect(screen.getByText('ALL SELECTED')).toBeInTheDocument();
  });

  // 測試自訂分隔符號
  it('should render with a custom separator', () => {
    render(
      <SelectRow
        multiple
        label="Custom Separator Test"
        asideAllLabel={false}
        asideSeparator=" + "
        defaultValue={['option1', 'option2']}
        onChange={mockFn}
      >
        <SelectOption
          label="Option 1"
          value="option1"
        />
        <SelectOption
          label="Option 2"
          value="option2"
        />
        <SelectOption
          label="Option 3"
          value="option3"
        />
      </SelectRow>,
    );

    expect(screen.getByText('Option 1 + Option 2')).toBeInTheDocument();
  });

  it('render with custom renderRowValueLabel', () => {
    render(
      <SelectRow
        label="Custom RenderRowValueLabel Test"
        renderRowValueLabel={() => 'Custom RenderRowValueLabel'}
        value="test"
        onChange={mockFn}
      >
        <SelectOption
          label="Test"
          value="test"
        />
      </SelectRow>,
    );

    expect(screen.getByText('Custom RenderRowValueLabel')).toBeInTheDocument();
  });

  it('reset cached value when multiple is false', () => {
    const mockConsoleError = jest.fn();
    jest.spyOn(console, 'error').mockImplementation(mockConsoleError);

    const { rerender } = render(
      <SelectRow
        label="Test Label"
        multiple
        defaultValue={['option1', 'option2']}
        onChange={mockFn}
      >
        <SelectOption
          label="Option 1"
          value="option1"
        />
        <SelectOption
          label="Option 2"
          value="option2"
        />
        <SelectOption
          label="Option 3"
          value="option3"
        />
      </SelectRow>,
    );

    rerender(
      <SelectRow
        label="Test Label"
        multiple={false}
        defaultValue="option1"
        onChange={mockFn}
      >
        <SelectOption
          label="Option 1"
          value="option1"
        />
        <SelectOption
          label="Option 2"
          value="option2"
        />
        <SelectOption
          label="Option 3"
          value="option3"
        />
      </SelectRow>,
    );

    expect(mockConsoleError).toHaveBeenCalledWith(
      'Warning: <SelectRow>: you should not change `multiple` prop while it is uncontrolled. Its value will be reset now.',
    );
  });
});
