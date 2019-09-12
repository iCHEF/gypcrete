import React from 'react';

import HeaderRow from '@ichef/gypcrete/src/HeaderRow';
import Button from '@ichef/gypcrete/src/Button';
import TextLabel from '@ichef/gypcrete/src/TextLabel';

import DebugBox from 'utils/DebugBox';

function OptionalArea() {
    const rightBtn = <Button align="reverse" icon="row-padding" basic="Save" />;
    const centerLabel = <TextLabel basic="Header Title" />;

    return (
        <DebugBox>
            <HeaderRow
                left={false}
                center={centerLabel}
                right={rightBtn}
            />
        </DebugBox>
    );
}

export default OptionalArea;
