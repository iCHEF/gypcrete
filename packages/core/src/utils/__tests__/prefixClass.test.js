import prefixClass from '../prefixClass';

it('prefixes passed-in className string', () => {
  expect(prefixClass('foo')).toBe('gyp-foo');
  expect(prefixClass('bar')).toBe('gyp-bar');
  expect(prefixClass('what-ever-component')).toBe('gyp-what-ever-component');
});

it('throws when parameter invalid', () => {
  expect(() => prefixClass()).toThrow();
  expect(() => prefixClass(1)).toThrow();
  expect(() => prefixClass(['a', 'b', 'c'])).toThrow();
  expect(() => prefixClass({ foo: 'bar' })).toThrow();
});
