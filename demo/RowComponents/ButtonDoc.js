import React from 'react';

import Button from 'src/Button';

const flexRowStyle = {
    display: 'flex',
    marginBottom: 10
};

function FlexRow({ children }) {
    return <div style={flexRowStyle}>{children}</div>;
}

function handleButtonClick() {
    console.log('Button clicked'); // eslint-disable-line no-console
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
                    icon="add"
                    onClick={handleButtonClick} />

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

            <FlexRow>
                <Button
                    solid
                    basic="Blue"
                    tag="Solid"
                    disabled />

                <Button
                    solid
                    color="red"
                    basic="Red"
                    tag="Solid"
                    disabled />

                <Button
                    solid
                    color="white"
                    basic="White"
                    tag="Solid"
                    disabled />

                <Button
                    solid
                    color="black"
                    basic="Black"
                    tag="Solid"
                    disabled />
            </FlexRow>

            <FlexRow>
                <Button
                    solid
                    basic="Expanded Button"
                    align="center"
                    minified={false} />

                <Button
                    solid
                    color="red"
                    basic="Expanded Button"
                    align="center"
                    minified={false} />
            </FlexRow>

            <FlexRow>
                <Button
                    basic="Button"
                    tag="Tag"
                    icon="add" />

                <Button
                    basic="Button"
                    tag="Tag"
                    icon="add"
                    status="loading" />

                <Button
                    basic="Button"
                    tag="Tag"
                    icon="add"
                    status="success"
                    statusOptions={{ autohide: false }} />

                <Button
                    basic="Button"
                    tag="Tag"
                    icon="add"
                    status="error"
                    errorMsg="Save failed" />
            </FlexRow>
        </div>
    );
}

export default ButtonDoc;
