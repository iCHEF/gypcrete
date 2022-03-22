import getInitScale from '../getInitScale';

it('infers scale from init cropping rect where width ratio is larger', () => {
  expect(getInitScale({
    x: 0,
    y: 0,
    width: 0.6,
    height: 0.4,
  })).toBe(1.7);
});

it('infers scale from init cropping rect where height ratio is larger', () => {
  expect(getInitScale({
    x: 0,
    y: 0,
    width: 0.2,
    height: 0.8,
  })).toBe(1.3);
});

it('returns null if cropping rect is broken', () => {
  expect(getInitScale({})).toBe(null);
});
