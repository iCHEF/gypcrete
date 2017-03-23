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

const OldComp = React.createClass({
    render: function() {
        return <div />;
    }
});

const OldCompRev = React.createClass({
    displayName: 'Rev(OldComp)',
    render: function() {
        return <div />;
    }
});

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
    expect(getComponentName(OldComp)).toBe('OldComp');
});

it('reads name from components with custom name', () => {
    expect(getComponentName(OldCompRev)).toBe('Rev(OldComp)');
    expect(getComponentName(FooRev)).toBe('Rev(Foo)');
});

it('throws if no Component passed in', () => {
    expect(() => getComponentName()).toThrow();
});
