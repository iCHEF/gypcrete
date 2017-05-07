import React from 'react';

import Icon from 'src/Icon';

function IconColorsExample() {
    return (
        <div>
            <Icon type="drag" color="gray" />
            <Icon type="edit" color="blue" />
            <Icon type="trashcan" color="red" />
            <Icon type="add" style={{ color: '#78c878' }} />
        </div>
    );
}

export default IconColorsExample;
