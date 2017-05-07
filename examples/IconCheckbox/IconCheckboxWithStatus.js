import React from 'react';

import IconCheckbox from 'src/IconCheckbox';

const flexRowStyle = {
    display: 'flex'
};

function IconCheckboxWithStatusExample() {
    return (
        <div style={flexRowStyle}>
            <IconCheckbox
                defaultChecked
                status="loading" />

            <IconCheckbox
                status="success"
                statusOptions={{ autohide: false }} />

            <IconCheckbox
                status="error"
                errorMsg="Cannot add printer." />
        </div>
    );
}

export default IconCheckboxWithStatusExample;
