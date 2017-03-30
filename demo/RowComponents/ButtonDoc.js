import React from 'react';

import Button from 'src/Button';

function FlexRow({ children }) {
    return <div style={{ display: 'flex' }}>{children}</div>;
}

function ButtonDoc() {
    return (
        <div>
            <h2>&lt;Button&gt;</h2>

            <FlexRow>
                <Button
                    basic="Blue Button"
                    aside="Default color"
                    tag="Tag"
                    icon="add" />

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

                <Button
                    basic="Blue"
                    aside="Disabled"
                    tag="Tag"
                    icon="add"
                    disabled />
            </FlexRow>
        </div>
    );
}

export default ButtonDoc;
