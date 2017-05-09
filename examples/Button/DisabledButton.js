import React from 'react';

import Button from 'src/Button';
import FlexRow from '../FlexRow';

function DisabledButtonExample() {
    return (
        <FlexRow>
            <Button
                basic="Blue"
                disabled />

            <Button
                solid
                color="black"
                basic="Black"
                tag="Solid"
                disabled />
        </FlexRow>
    );
}

export default DisabledButtonExample;
