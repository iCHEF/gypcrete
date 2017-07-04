import React from 'react';

import HeaderRow from 'src/HeaderRow';
import Button from 'src/Button';
import TextLabel from 'src/TextLabel';

import DebugBox from '../DebugBox';

function BasicUsage() {
    const leftBtn = <Button icon="prev" basic="Back" />;
    const rightBtn = <Button basic="Save" />;
    const centerLabel = <TextLabel basic="A slightly longer title" />;

    return (
        <DebugBox width="30rem">
            <HeaderRow
                left={leftBtn}
                center={centerLabel}
                right={rightBtn} />
        </DebugBox>
    );
}

export default BasicUsage;
