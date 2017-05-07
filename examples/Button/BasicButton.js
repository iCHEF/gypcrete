import React from 'react';

import Button from 'src/Button';

const flexRowStyle = {
    display: 'flex'
};

function handleButtonClick() {
    // eslint-disable-next-line no-console
    console.log('Button clicked');
}

function BasicButtonExample() {
    return (
        <div style={flexRowStyle}>
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
        </div>
    );
}

export default BasicButtonExample;
