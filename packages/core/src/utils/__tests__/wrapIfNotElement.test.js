import React from 'react';
import wrapIfNotElement from '../wrapIfNotElement';

function Bar({ children }) {
    return <span className="bar">{children}</span>;
}

it('returns untouched input if already a React Element', () => {
    const element1 = <span>foo</span>;
    const element2 = <img src="bar.jpg" alt="bar" />;

    expect(wrapIfNotElement(element1, { with: 'div' })).toEqual(element1);
    expect(wrapIfNotElement(element2, { with: 'span' })).toEqual(element2);
});

it('wraps non-element input with specified component', () => {
    expect(wrapIfNotElement('foo', { with: 'span' })).toEqual(<span>foo</span>);
    expect(wrapIfNotElement(22, { with: Bar })).toEqual(<Bar>{22}</Bar>);
});


it('can render content in given Component via certain prop', () => {
    expect(wrapIfNotElement(22, { with: Bar, via: 'foo' })).toEqual(<Bar foo={22} />);
});
