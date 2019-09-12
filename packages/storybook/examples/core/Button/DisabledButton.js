import React from 'react';

import Button from '@ichef/gypcrete/src/Button';
import FlexRow from 'utils/FlexRow';

function DisabledButtonExample() {
    return (
        <div>
            <FlexRow>
                <Button
                    bold
                    disabled
                    basic="Black"
                    aside="Disabled"
                    tag="tag"
                />
                <Button
                    disabled
                    color="blue"
                    basic="Blue"
                    aside="Disabled"
                    tag="tag"
                />
                <Button
                    disabled
                    color="red"
                    basic="Red"
                    aside="Disabled"
                    tag="tag"
                />
                <Button
                    disabled
                    color="white"
                    basic="White"
                    aside="Disabled"
                    tag="tag"
                />
            </FlexRow>
            <FlexRow>
                <Button
                    bold
                    solid
                    disabled
                    basic="Black"
                    aside="Disabled"
                    tag="tag"
                />
                <Button
                    solid
                    disabled
                    color="blue"
                    basic="Blue"
                    aside="Disabled"
                    tag="tag"
                />
                <Button
                    solid
                    disabled
                    color="red"
                    basic="Red"
                    aside="Disabled"
                    tag="tag"
                />
                <Button
                    solid
                    disabled
                    color="white"
                    basic="White"
                    aside="Disabled"
                    tag="tag"
                />
            </FlexRow>
        </div>
    );
}

export default DisabledButtonExample;
