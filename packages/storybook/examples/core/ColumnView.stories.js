import React from 'react';
import PropTypes from 'prop-types';

import ColumnView from '@ichef/gypcrete/src/ColumnView';
import HeaderRow from '@ichef/gypcrete/src/HeaderRow';
import TextLabel from '@ichef/gypcrete/src/TextLabel';

import List from '@ichef/gypcrete/src/List';
import ListRow from '@ichef/gypcrete/src/ListRow';

export default {
  title: '@ichef/gypcrete|ColumnView',
  component: ColumnView,
};

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

export function BasicUsage() {
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
