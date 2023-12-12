import React from 'react';

import Tag from '@ichef/gypcrete/src/Tag';

export default {
  title: 'gypcrete/Tag',
  component: Tag,
};

export function BasicTagExample() {
  return (
    <Tag>tag</Tag>
  );
}

export function WithParentColor() {
  return (
    <div>
      <span style={{ color: 'blue' }}>
        Blue text
        {' '}
        <Tag>Tag</Tag>
      </span>

      <span style={{ color: 'red' }}>
        Red text
        {' '}
        <Tag>Tag</Tag>
      </span>
    </div>
  );
}
