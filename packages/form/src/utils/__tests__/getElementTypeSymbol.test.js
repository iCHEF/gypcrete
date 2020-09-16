import React from 'react';
import getElementTypeSymbol from '../getElementTypeSymbol';

const SYMBOL = Symbol('foo');

it('looks for typeSymbol from a React.Element', () => {
  const NormalComponent = () => null;
  expect(getElementTypeSymbol(<NormalComponent />)).toBeNull();

  const ComponentWithSymbol = () => null;
  ComponentWithSymbol.typeSymbol = SYMBOL;
  expect(getElementTypeSymbol(<ComponentWithSymbol />)).toBe(SYMBOL);
});

it('returns null for anything other than React.Element', () => {
  expect(getElementTypeSymbol(undefined)).toBeNull();
  expect(getElementTypeSymbol('string')).toBeNull();
  expect(getElementTypeSymbol(123)).toBeNull();
});
