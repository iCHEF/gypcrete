import React from 'react';

/**
 * Wrap the passed-in `content` with a component if it's not a React element,
 * to make sure the result will always be a HTML tag.
 *
 * @param {Any} content
 * @param {Component} Wrapper
 *
 * @return {Element}
 */
function wrapIfNotElement(content, { with: Wrapper }) {
    if (React.isValidElement(content)) {
        return content;
    }
    return <Wrapper>{content}</Wrapper>;
}

export default wrapIfNotElement;
