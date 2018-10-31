import React from 'react';

import List from '@ichef/gypcrete/src/List';
import ListRow from '@ichef/gypcrete/src/ListRow';
import TextLabel from '@ichef/gypcrete/src/TextLabel';

import DebugBox from 'utils/DebugBox';

function NestedList() {
    const nestedList2nd = (
        <List>
            <ListRow>
                <TextLabel icon="inventory-item" basic="Nested A" />
            </ListRow>
            <ListRow>
                <TextLabel icon="inventory-item" basic="Nested B" />
            </ListRow>
            <ListRow>
                <TextLabel icon="inventory-item" basic="Nested C" />
            </ListRow>
        </List>
    );

    const nestedList1st = (
        <List>
            <ListRow>
                <TextLabel icon="printer" basic="3rd nested I" />
            </ListRow>
            <ListRow nestedList={nestedList2nd}>
                <TextLabel icon="printer" basic="3rd nested II" />
            </ListRow>
            <ListRow>
                <TextLabel icon="printer" basic="3rd nested III" />
            </ListRow>
        </List>
    );

    return (
        <DebugBox width="30rem">
            <List variant="normal" title="List title" desc="Help text here">
                <ListRow>
                    <TextLabel icon="tickets" basic="Hello World" />
                </ListRow>
                <ListRow nestedList={nestedList1st}>
                    <TextLabel icon="tickets" basic="Row 2" />
                </ListRow>
                <ListRow>
                    <TextLabel icon="tickets" basic="Row 3" />
                </ListRow>
            </List>
        </DebugBox>
    );
}

export default NestedList;
