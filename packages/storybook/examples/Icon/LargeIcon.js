import React from 'react';

import Icon from '@ichef/gypcrete/src/Icon';

function LargeIconExample() {
    return (
        <div>
            <Icon type="loading" large spinning />
            <Icon type="success" large color="blue" />
            <Icon type="error" large color="red" />
        </div>
    );
}

export default LargeIconExample;
