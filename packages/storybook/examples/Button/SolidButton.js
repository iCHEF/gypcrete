import React from 'react';

import Button from '@ichef/gypcrete/src/Button';
import FlexRow from '../FlexRow';

function SolidButtonExample() {
    return (
        <FlexRow>
            <Button
                solid
                basic="Blue"
                tag="Solid" />

            <Button
                solid
                color="red"
                basic="Red"
                tag="Solid" />

            <Button
                solid
                color="white"
                basic="White"
                tag="Solid" />

            <Button
                solid
                color="black"
                basic="Black"
                tag="Solid" />
        </FlexRow>
    );
}

export default SolidButtonExample;
