import React from 'react';
import IconButton from 'src/IconButton';

function IconButtonDoc() {
    return (
        <div>
            <h2>&lt;IconButton&gt;</h2>

            <div style={{ display: 'flex' }}>
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
        </div>
    );
}

export default IconButtonDoc;
