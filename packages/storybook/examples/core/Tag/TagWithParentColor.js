import React from 'react';

import Tag from '@ichef/gypcrete/src/Tag';

function TagWithParentColorExample() {
    return (
        <div>
            <span style={{ color: 'blue' }}>
                Blue text <Tag>Tag</Tag>
            </span>

            <span style={{ color: 'red' }}>
                Red text <Tag>Tag</Tag>
            </span>
        </div>
    );
}

export default TagWithParentColorExample;
