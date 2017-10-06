import React from 'react';

import Button from '@ichef/gypcrete/src/Button';
import FlexRow from '../FlexRow';

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
