import React from 'react';

import Button from 'src/Button';

const flexRowStyle = {
    display: 'flex'
};

function DisabledButtonExample() {
    return (
        <div style={flexRowStyle}>
            <Button
                basic="Blue"
                disabled />

            <Button
                solid
                color="black"
                basic="Black"
                tag="Solid"
                disabled />
        </div>
    );
}

export default DisabledButtonExample;
