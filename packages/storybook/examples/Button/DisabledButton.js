import React from 'react';

import Button from '@ichef/gypcrete/src/Button';
import FlexRow from 'utils/FlexRow';

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
