import React from 'react';

import Button from 'src/Button';
import FlexRow from '../FlexRow';

function ButtonWithStatusExample() {
    return (
        <FlexRow>
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
        </FlexRow>
    );
}

export default ButtonWithStatusExample;
