import { isValidElement } from 'react';

/**
 * Wrap the passed-in `content` with a component if it's not a React element,
 * to make sure the result will always be a HTML tag.
 */
function wrapIfNotElement(content, { with: Wrapper, via: prop = 'children' }) {
  if (isValidElement(content)) {
    return content;
  }

  const wrapperProps = {
    [prop]: content,
  };

  return <Wrapper {...wrapperProps} />;
}

export default wrapIfNotElement;
