import React from 'react';

import HeaderRow from '@ichef/gypcrete/src/HeaderRow';
import Button from '@ichef/gypcrete/src/Button';
import TextLabel from '@ichef/gypcrete/src/TextLabel';
import TextEllipsis from '@ichef/gypcrete/src/TextEllipsis';

import DebugBox from 'utils/DebugBox';

function BasicUsage() {
    const leftBtn = <Button icon="prev" basic="Back" />;
    const rightBtn = <Button align="reverse" icon="row-padding" basic="Save" />;
    const centerLabel = (
        <TextLabel
            align="center"
            basic={
                <TextEllipsis>Lorem ipsum a slightly longer title</TextEllipsis>
            }
        />
    );

    return (
        <DebugBox>
            <HeaderRow
                left={leftBtn}
                center={centerLabel}
                right={rightBtn}
            />
        </DebugBox>
    );
}

export default BasicUsage;
