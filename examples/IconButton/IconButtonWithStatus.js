import React from 'react';
import IconButton from 'src/IconButton';

const flexRowStyle = {
    display: 'flex'
};

function IconButtonWithStatusExample() {
    return (
        <div style={flexRowStyle}>
            <IconButton
                icon="printer"
                status="loading" />

            <IconButton
                icon="printer"
                status="success"
                statusOptions={{ autohide: false }} />

            <IconButton
                icon="printer"
                status="error"
                errorMsg="Cannot add printer." />
        </div>
    );
}

export default IconButtonWithStatusExample;
