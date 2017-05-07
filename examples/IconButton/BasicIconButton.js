import React from 'react';
import IconButton from 'src/IconButton';

const flexRowStyle = {
    display: 'flex'
};

function BasicIconButtonExample() {
    return (
        <div style={flexRowStyle}>
            <IconButton
                icon="printer" />

            <IconButton
                solid
                icon="edit" />
        </div>
    );
}

export default BasicIconButtonExample;
