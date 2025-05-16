import getInitPosition from '../getInitPosition';

it('calculates position based on init cropping rect', () => {
  expect(
    getInitPosition({
      x: 0.1,
      y: 0.3,
      width: 0.6,
      height: 0.4,
    }),
  ).toEqual({
    x: 0.4,
    y: 0.5,
  });

  expect(
    getInitPosition({
      x: 0.35,
      y: 0.24,
      width: 0.45,
      height: 0.6,
    }),
  ).toEqual({
    x: 0.575,
    y: 0.54,
  });
});
