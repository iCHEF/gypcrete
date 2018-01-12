import React from 'react';

import Button from '@ichef/gypcrete/src/Button';
import FlexRow from 'utils/FlexRow';

function SolidButtonExample() {
    return (
        <FlexRow>
            <Button
                solid
                basic="Black"
                aside="Aside text"
                tag="Solid" />

            <Button
                solid
                color="blue"
                basic="Blue"
                aside="Aside text"
                tag="Solid" />

            <Button
                solid
                color="red"
                basic="Red"
                aside="Aside text"
                tag="Solid" />

            <Button
                solid
                color="white"
                basic="White"
                aside="Aside text"
                tag="Solid" />
        </FlexRow>
    );
}

export default SolidButtonExample;
