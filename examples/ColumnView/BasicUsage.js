import React from 'react';
import PropTypes from 'prop-types';

import ColumnView from 'src/ColumnView';
import HeaderRow from 'src/HeaderRow';
import TextLabel from 'src/TextLabel';

import List from 'src/List';
import ListRow from 'src/ListRow';

function DemoRow({ label }) {
    return (
        <ListRow>
            <TextLabel icon="tickets" basic={label} />
        </ListRow>
    );
}
DemoRow.propTypes = {
    label: PropTypes.string.isRequired,
};

function BasicUsage() {
    const headerLabel = <TextLabel align="center" basic="Header Title" />;
    const header = <HeaderRow center={headerLabel} />;
    const rows = [];

    for (let i = 0; i < 50; i += 1) {
        rows.push(<DemoRow key={`row-${i}`} label={`Row ${i}`} />);
    }

    return (
        <div style={{ height: 500 }}>
            <ColumnView header={header}>
                <List title="Settings" variant="setting">
                    {rows}
                </List>
            </ColumnView>
        </div>
    );
}

export default BasicUsage;
