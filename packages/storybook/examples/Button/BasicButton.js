import React from 'react';
import { action } from '@storybook/addon-actions';

import Button from '@ichef/gypcrete/src/Button';
import FlexRow from '../FlexRow';

function BasicButtonExample() {
    return (
        <FlexRow>
            <Button
                primary
                basic="Blue Button"
                aside="Default color"
                tag="Tag"
                icon="add"
                onClick={action('clicked')} />

            <Button
                color="red"
                basic="Red"
                aside="Variants"
                tag="Tag"
                icon="add" />

            <Button
                color="white"
                basic="White"
                aside="Variants"
                tag="Tag"
                icon="add" />

            <Button
                color="black"
                basic="Black"
                aside="Variants"
                tag="Tag"
                icon="add" />
        </FlexRow>
    );
}

export default BasicButtonExample;
