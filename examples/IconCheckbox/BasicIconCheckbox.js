import React from 'react';

import IconCheckbox from 'src/IconCheckbox';

const flexRowStyle = {
    display: 'flex'
};

function BasicIconCheckboxExample() {
    return (
        <div style={flexRowStyle}>
            <IconCheckbox />

            <IconCheckbox indeterminate />
        </div>
    );
}

export default BasicIconCheckboxExample;
