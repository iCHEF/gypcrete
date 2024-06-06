import SelectOption from 'src/SelectOption';
import RadioSelectOption from 'src/RadioSelectOption';
import parseSelectOptions from '../parseSelectOptions';

it('reads options from React children of <SelectOption>s', () => {
  const singleOption = (
    <SelectOption
      label="Foo"
      value="foo"
    />
  );

  expect(parseSelectOptions(singleOption)).toMatchObject([{ label: 'Foo', value: 'foo' }]);

  const multipleOptions = [
    <SelectOption
      label="Foo"
      value="foo"
      checked
    />,
    <SelectOption
      label="Bar"
      value="bar"
      readOnly
    />,
    <SelectOption
      label="Meh"
      value="meh"
    />,
  ];
  expect(parseSelectOptions(multipleOptions)).toMatchObject([
    { label: 'Foo', value: 'foo', checked: true },
    { label: 'Bar', value: 'bar', readOnly: true },
    { label: 'Meh', value: 'meh' },
  ]);
});

it('reads options from React children of <RadioSelectOption>s', () => {
  const singleOption = (
    <RadioSelectOption
      label="Foo"
      value="foo"
    />
  );

  expect(parseSelectOptions(singleOption)).toMatchObject([{ label: 'Foo', value: 'foo' }]);

  const multipleOptions = [
    <RadioSelectOption
      label="Foo"
      value="foo"
      checked
    />,
    <RadioSelectOption
      label="Bar"
      value="bar"
      readOnly
    />,
    <RadioSelectOption
      label="Meh"
      value="meh"
    />,
  ];
  expect(parseSelectOptions(multipleOptions)).toMatchObject([
    { label: 'Foo', value: 'foo', checked: true },
    { label: 'Bar', value: 'bar', readOnly: true },
    { label: 'Meh', value: 'meh' },
  ]);
});

// #TODO: Add warning for children other than <SelectOption>
it('ignores children that are not <SelectOption>', () => {
  const children = [
    <SelectOption
      label="Foo"
      value="foo"
    />,
    'Hello World!',
    <SelectOption
      label="Bar"
      value="bar"
    />,
  ];

  expect(parseSelectOptions(children)).toMatchObject([
    { label: 'Foo', value: 'foo' },
    { label: 'Bar', value: 'bar' },
  ]);
});
