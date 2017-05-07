import React from 'react';

import Button from 'src/Button';

const flexRowStyle = {
    display: 'flex'
};

function SolidButtonExample() {
    return (
        <div style={flexRowStyle}>
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
        </div>
    );
}

export default SolidButtonExample;
