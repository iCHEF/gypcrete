// @flow
import React from 'react';
import type {
    Component as ComponentType,
    ReactChildren
} from 'react-flow-types';

type Options = {
    with: string | ComponentType<{ [string]: any }>,
    via?: string,
};

/**
 * Wrap the passed-in `content` with a component if it's not a React element,
 * to make sure the result will always be a HTML tag.
 *
 * @param {ReactChildren} content
 * @param {Component} Wrapper
 * @param {String} prop - pass `content` into specified `prop`. Default via 'children'.
 *
 * @return {Element}
 */
function wrapIfNotElement(
    content: ReactChildren,
    { with: Wrapper, via: prop = 'children' }: Options
) {
    if (React.isValidElement(content)) {
        return content;
    }

    const wrapperProps = {
        [prop]: content
    };

    return <Wrapper {...wrapperProps} />;
}

export default wrapIfNotElement;
