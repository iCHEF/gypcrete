import getStateClassnames from '../getStateClassnames';

it('can generates a single class name', () => {
  expect(getStateClassnames({ active: true })).toBe('gyp-state-active');
  expect(getStateClassnames({ highlight: true })).toBe('gyp-state-highlight');
  expect(getStateClassnames({ error: true })).toBe('gyp-state-error');
  expect(getStateClassnames({ disabled: true })).toBe('gyp-state-disabled');
  expect(getStateClassnames({ untouchable: true })).toBe('gyp-state-untouchable');
  expect(getStateClassnames({ muted: true })).toBe('gyp-state-muted');
});

it('can generate a set of class names', () => {
  expect(getStateClassnames({ active: true, highlight: true, muted: true })).toBe(
    'gyp-state-active gyp-state-highlight gyp-state-muted',
  );

  expect(getStateClassnames({ error: true, disabled: true, untouchable: true })).toBe(
    'gyp-state-error gyp-state-disabled gyp-state-untouchable',
  );
});
