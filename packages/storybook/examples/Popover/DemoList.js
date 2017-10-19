import React from 'react';

import List from '@ichef/gypcrete/src/List';
import ListRow from '@ichef/gypcrete/src/ListRow';
import TextLabel from '@ichef/gypcrete/src/TextLabel';

function DemoList() {
    return (
        <List>
            <ListRow>
                <TextLabel basic="Row 1" />
            </ListRow>
            <ListRow>
                <TextLabel basic="Row 2" />
            </ListRow>
            <ListRow>
                <TextLabel basic="Row 3" />
            </ListRow>
        </List>
    );
}

export default DemoList;
