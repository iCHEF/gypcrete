import React, { Component } from 'react';

import getComponentName from '../getComponentName';

/* eslint-disable */
class Foo extends Component {
    render() {
        return <div />;
    }
}

function Bar() {
    return <div />;
}

class FooRev extends Component {
    static displayName = 'Rev(Foo)';

    render() {
        return <span />;
    }
}
/* eslint-enable */

it('reads name from React components', () => {
    expect(getComponentName(Foo)).toBe('Foo');
    expect(getComponentName(Bar)).toBe('Bar');
});

it('reads name from components with custom name', () => {
    expect(getComponentName(FooRev)).toBe('Rev(Foo)');
});

it('uses fallback name for anonymous components', () => {
    expect(getComponentName(() => <div />)).toBe('Component');
});

it('throws if no Component passed in', () => {
    expect(() => getComponentName()).toThrowError(/Cannot read name/);
});
