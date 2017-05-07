import React from 'react';

import Button from 'src/Button';

const flexRowStyle = {
    display: 'flex',
    marginBottom: 10
};

function FlexRow({ children }) {
    return <div style={flexRowStyle}>{children}</div>;
}

function ExpandedButtonExample() {
    return (
        <div>
            <FlexRow>
                <Button
                    basic="Expanded Button"
                    align="center"
                    minified={false} />
            </FlexRow>

            <FlexRow>
                <Button
                    solid
                    color="red"
                    basic="Expanded Button"
                    align="center"
                    minified={false} />
            </FlexRow>
        </div>
    );
}

export default ExpandedButtonExample;
