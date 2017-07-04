import React from 'react';

import HeaderRow from 'src/HeaderRow';
import Button from 'src/Button';
import TextLabel from 'src/TextLabel';
import TextEllipsis from 'src/TextEllipsis';

import DebugBox from '../DebugBox';

function BasicUsage() {
    const leftBtn = <Button icon="prev" basic="Back" />;
    const rightBtn = <Button basic="Save" />;
    const centerLabel = (
        <TextLabel
            align="center"
            basic={
                <TextEllipsis>Lorem ipsum a slightly longer title</TextEllipsis>
            } />
    );

    return (
        <DebugBox>
            <HeaderRow
                left={leftBtn}
                center={centerLabel}
                right={rightBtn} />
        </DebugBox>
    );
}

export default BasicUsage;
