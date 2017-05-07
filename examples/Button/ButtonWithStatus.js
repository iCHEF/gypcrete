import React from 'react';

import Button from 'src/Button';

const flexRowStyle = {
    display: 'flex'
};

function ButtonWithStatusExample() {
    return (
        <div style={flexRowStyle}>
            <Button
                basic="Loading"
                tag="Tag"
                icon="add"
                status="loading" />

            <Button
                basic="Success"
                tag="Tag"
                icon="add"
                status="success"
                statusOptions={{ autohide: false }} />

            <Button
                basic="Error"
                tag="Tag"
                icon="add"
                status="error"
                errorMsg="Save failed" />
        </div>
    );
}

export default ButtonWithStatusExample;
