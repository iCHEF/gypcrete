import React from 'react';

import ColumnView from '@ichef/gypcrete/src/ColumnView';
import HeaderRow from '@ichef/gypcrete/src/HeaderRow';
import TextLabel from '@ichef/gypcrete/src/TextLabel';

function ColumnHeader() {
    const label = (
        <TextLabel
            align="center"
            basic="Column Header" />
    );

    return (
        <HeaderRow center={label} />
    );
}

const HEADER = <ColumnHeader />;

function DemoColumnView({ children }) {
    return (
        <ColumnView header={HEADER}>
            {children}
        </ColumnView>
    );
}

export default DemoColumnView;
