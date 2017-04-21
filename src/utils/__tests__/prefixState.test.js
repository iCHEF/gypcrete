import prefixState from '../prefixState';

it('prefixes passed-in state string', () => {
    expect(prefixState('foo')).toBe('gyp-state-foo');
    expect(prefixState('bar')).toBe('gyp-state-bar');
    expect(prefixState('what-ever-state')).toBe('gyp-state-what-ever-state');
});

it('throws when parameter invalid', () => {
    expect(() => prefixState()).toThrow();
    expect(() => prefixState(1)).toThrow();
    expect(() => prefixState(['a', 'b', 'c'])).toThrow();
    expect(() => prefixState({ foo: 'bar' })).toThrow();
});
