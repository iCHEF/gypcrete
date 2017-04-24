import React from 'react';
import IconCheckbox from 'src/IconCheckbox';

function IconCheckboxDoc() {
    return (
        <div>
            <h2>&lt;IconCheckbox&gt;</h2>

            <div style={{ display: 'flex' }}>
                <IconCheckbox status="loading" />

                <IconCheckbox
                    status="success"
                    statusOptions={{ autohide: false }} />

                <IconCheckbox
                    status="error"
                    errorMsg="Cannot add printer." />
            </div>
        </div>
    );
}

export default IconCheckboxDoc;
