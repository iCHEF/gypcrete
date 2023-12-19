import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SelectList from '../SelectList';
import SelectOption from '../SelectOption';

describe('SelectList', () => {
  it('renders SelectList with default props', () => {
    render(<SelectList title="List Title" />);
    expect(screen.getByText('List Title')).toBeInTheDocument();
  });

  it('renders SelectList in single select mode', () => {
    render(
      <SelectList value="one">
        <SelectOption value="one" label="one" />
      </SelectList>
    );
    expect(screen.getByText('one')).toBeInTheDocument();

    const optionCheckboxes = screen.getAllByRole('checkbox');
    const optionOneCheckbox = optionCheckboxes[0];

    expect(optionOneCheckbox).toBeChecked();
  });

  it('renders SelectList in multiple select mode', () => {
    render(
      <SelectList multiple value={['one']}>
        <SelectOption value="one" label="one" />
        <SelectOption value="two" label="two" />
      </SelectList>
    );
    expect(screen.getByText('one')).toBeInTheDocument();
    expect(screen.getByText('two')).toBeInTheDocument();

    const optionCheckboxes = screen.getAllByRole('checkbox');
    const optionCheckAllCheckbox = optionCheckboxes[0];
    const optionOneCheckbox = optionCheckboxes[1];
    const optionTwoCheckbox = optionCheckboxes[2];

    expect(optionCheckAllCheckbox).not.toBeChecked();
    expect(optionOneCheckbox).toBeChecked();
    expect(optionTwoCheckbox).not.toBeChecked();
  });

  it('renders SelectList in multiple select mode with checkAll option', () => {
    render(
      <SelectList multiple showCheckAll>
        <SelectOption value="one" label="one" />
        <SelectOption value="two" label="two" />
      </SelectList>
    );
    expect(screen.getByText('All')).toBeInTheDocument();
  });

  it('renders SelectList in multiple select mode with checkAll option and custom label', () => {
    render(
      <SelectList multiple showCheckAll checkAllLabel="Select All">
        <SelectOption value="one" label="one" />
        <SelectOption value="two" label="two" />
      </SelectList>
    );
    expect(screen.getByText('Select All')).toBeInTheDocument();
  });

  it('changes the value prop in a controlled SelectList', () => {
    const { rerender } = render(
      <SelectList value="one">
        <SelectOption value="one" label="one" />
        <SelectOption value="two" label="two" />
      </SelectList>
    );
    rerender(
      <SelectList value="two">
        <SelectOption value="one" label="one" />
        <SelectOption value="two" label="two" />
      </SelectList>
    );

    const optionCheckboxes = screen.getAllByRole('checkbox');
    const optionOneCheckbox = optionCheckboxes[0];
    const optionTwoCheckbox = optionCheckboxes[1];

    expect(optionOneCheckbox).not.toBeChecked();
    expect(optionTwoCheckbox).toBeChecked();
  });

  it('changes the value prop in a controlled SelectList with multiple options', () => {
    const { rerender } = render(
      <SelectList multiple value={['one', 'two']}>
        <SelectOption value="one" label="one" />
        <SelectOption value="two" label="two" />
        <SelectOption value="three" label="three" />
      </SelectList>
    );
    rerender(
      <SelectList multiple value={['one', 'three']}>
        <SelectOption value="one" label="one" />
        <SelectOption value="two" label="two" />
        <SelectOption value="three" label="three" />
      </SelectList>
    );

    const optionCheckboxes = screen.getAllByRole('checkbox');
    const optionCheckAllCheckbox = optionCheckboxes[0];
    const optionOneCheckbox = optionCheckboxes[1];
    const optionTwoCheckbox = optionCheckboxes[2];
    const optionThreeCheckbox = optionCheckboxes[3];

    expect(optionCheckAllCheckbox).not.toBeChecked();
    expect(optionOneCheckbox).toBeChecked();
    expect(optionTwoCheckbox).not.toBeChecked();
    expect(optionThreeCheckbox).toBeChecked();
  });

  it('clicks on an option in SelectList', () => {
    const handleChange = jest.fn();
    render(
      <SelectList onChange={handleChange}>
        <SelectOption value="one" label="one" />
      </SelectList>
    );
    userEvent.click(screen.getByRole('checkbox'));
    expect(handleChange).toHaveBeenCalled();
  });

  it('unchecked an option in SelectList with single option should not work', () => {
    const handleChange = jest.fn();
    render(
      <SelectList defaultValue="one" onChange={handleChange}>
        <SelectOption value="one" label="one" />
      </SelectList>
    );

    const optionCheckbox = screen.getByRole('checkbox');

    // can't uncheck the only checked option
    userEvent.click(optionCheckbox);

    expect(handleChange).not.toHaveBeenCalled();

    expect(optionCheckbox).toBeChecked();
  });

  it('clicks on an option in SelectList with multiple options', () => {
    const handleChange = jest.fn();
    render(
      <SelectList multiple onChange={handleChange}>
        <SelectOption value="one" label="one" />
        <SelectOption value="two" label="two" />
      </SelectList>
    );

    const optionCheckboxes = screen.getAllByRole('checkbox');
    const optionCheckAllCheckbox = optionCheckboxes[0];
    const optionOneCheckbox = optionCheckboxes[1];
    const optionTwoCheckbox = optionCheckboxes[2];

    userEvent.click(optionTwoCheckbox);

    expect(handleChange).toHaveBeenCalled();
    expect(handleChange).toHaveBeenCalledWith(['two']);

    expect(optionCheckAllCheckbox).not.toBeChecked();
    expect(optionOneCheckbox).not.toBeChecked();
    expect(optionTwoCheckbox).toBeChecked();
  });

  it('unchecked an option in SelectList with multiple options and minCheck', () => {
    const handleChange = jest.fn();
    render(
      <SelectList
        multiple
        minCheck={1}
        defaultValue={['one']}
        onChange={handleChange}
      >
        <SelectOption value="one" label="one" />
        <SelectOption value="two" label="two" />
      </SelectList>
    );

    const optionCheckboxes = screen.getAllByRole('checkbox');
    const optionCheckAllCheckbox = optionCheckboxes[0];
    const optionOneCheckbox = optionCheckboxes[1];
    const optionTwoCheckbox = optionCheckboxes[2];

    // can't uncheck the only checked option when minCheck is 1
    userEvent.click(optionOneCheckbox);

    expect(handleChange).not.toHaveBeenCalled();

    expect(optionCheckAllCheckbox).not.toBeChecked();
    expect(optionOneCheckbox).toBeChecked();
    expect(optionTwoCheckbox).not.toBeChecked();
  });

  it('click on checkAll option in SelectList with multiple options', () => {
    const handleChange = jest.fn();
    render(
      <SelectList multiple showCheckAll onChange={handleChange}>
        <SelectOption value="one" label="one" />
        <SelectOption value="two" label="two" />
      </SelectList>
    );

    const optionCheckboxes = screen.getAllByRole('checkbox');
    const optionCheckAllCheckbox = optionCheckboxes[0];
    const optionOneCheckbox = optionCheckboxes[1];
    const optionTwoCheckbox = optionCheckboxes[2];

    userEvent.click(optionCheckAllCheckbox);

    expect(handleChange).toHaveBeenCalled();
    expect(handleChange).toHaveBeenCalledWith(['one', 'two']);

    expect(optionCheckAllCheckbox).toBeChecked();
    expect(optionOneCheckbox).toBeChecked();
    expect(optionTwoCheckbox).toBeChecked();
  });

  it('click on checkAll option in SelectList with multiple options and minCheck', () => {
    const handleChange = jest.fn();
    render(
      <SelectList
        multiple
        showCheckAll
        defaultValue={['one', 'two']}
        minCheck={1}
        onChange={handleChange}
      >
        <SelectOption value="one" label="one" />
        <SelectOption value="two" label="two" />
      </SelectList>
    );

    const optionCheckboxes = screen.getAllByRole('checkbox');
    const optionCheckAllCheckbox = optionCheckboxes[0];
    const optionOneCheckbox = optionCheckboxes[1];
    const optionTwoCheckbox = optionCheckboxes[2];

    userEvent.click(optionCheckAllCheckbox);

    expect(handleChange).toHaveBeenCalled();
    expect(handleChange).toHaveBeenCalledWith(['one']);

    expect(optionCheckAllCheckbox).not.toBeChecked();
    expect(optionOneCheckbox).toBeChecked();
    expect(optionTwoCheckbox).not.toBeChecked();
  });


  it('reset value of SelectList when multiple prop changes', () => {
    const { rerender } = render(
      <SelectList multiple defaultValue={['option1']} showCheckAll={false}>
        <SelectOption value="option1" label="Option 1" />
        <SelectOption value="option2" label="Option 2" />
      </SelectList>
    );

    rerender(
      <SelectList defaultValue={['option1']}>
        <SelectOption value="option1" label="Option 1" />
        <SelectOption value="option2" label="Option 2" />
      </SelectList>
    );

    const optionCheckboxes = screen.getAllByRole('checkbox');
    const optionOneCheckbox = optionCheckboxes[0];
    const optionTwoCheckbox = optionCheckboxes[1];

    expect(optionOneCheckbox).not.toBeChecked();
    expect(optionTwoCheckbox).not.toBeChecked();
  });

  it('correctly renders nested Option components in React.Fragment', () => {
    render(
      <SelectList value="option1" onChange={() => {}}>
        <>
          <SelectOption value="option1" label="Option 1" />
          <SelectOption value="option2" label="Option 2" />
          <div> other content </div>
        </>
      </SelectList>,
    );

    // Check if options are correctly rendered with valid checked status
    const option1 = screen.getByText('Option 1');
    const option2 = screen.getByText('Option 2');

    expect(option1).toBeInTheDocument();
    expect(option2).toBeInTheDocument();

    const optionCheckboxes = screen.getAllByRole('checkbox');
    const optionOneCheckbox = optionCheckboxes[0];
    const optionTwoCheckbox = optionCheckboxes[1];

    expect(optionOneCheckbox).toBeChecked();
    expect(optionTwoCheckbox).not.toBeChecked();
  });
});
