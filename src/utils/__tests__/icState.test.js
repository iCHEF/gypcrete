import icState from '../icState';

it('prefixes passed-in state string', () => {
    expect(icState('foo')).toBe('ic-state-foo');
    expect(icState('bar')).toBe('ic-state-bar');
    expect(icState('what-ever-state')).toBe('ic-state-what-ever-state');
});

it('throws when parameter invalid', () => {
    expect(() => icState()).toThrow();
    expect(() => icState(1)).toThrow();
    expect(() => icState(['a', 'b', 'c'])).toThrow();
    expect(() => icState({ foo: 'bar' })).toThrow();
});
