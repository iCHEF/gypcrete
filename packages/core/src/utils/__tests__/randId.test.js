import randId from '../randId';

const defaultPrefix = 'node-';
const fooPrefix = 'foo-';

it('generates a random ID, prefixed by "node-" by default', () => {
    const result = randId();
    expect(result).toEqual(expect.stringMatching(/^node-/));
});

it('generates a random ID at length of 10 chars (+5 for prefix) by default', () => {
    const result = randId();
    expect(result).toHaveLength(defaultPrefix.length + 10);
});

it('can change output prefix', () => {
    const result = randId({ prefix: fooPrefix });
    expect(result).toEqual(expect.stringMatching(/^foo-/));
});

it('can change output length', () => {
    const result = randId({ length: 6 });
    expect(result).toHaveLength(defaultPrefix.length + 6);
});

it('can change both output prefix and length', () => {
    const result = randId({ prefix: fooPrefix, length: 12 });
    expect(result).toEqual(expect.stringMatching(/^foo-/));
    expect(result).toHaveLength(fooPrefix.length + 12 + 1);
});
