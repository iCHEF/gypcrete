import React from 'react';

import List from 'src/List';
import ListRow from 'src/ListRow';

import Button from 'src/Button';
import TextLabel from 'src/TextLabel';

import DebugBox from '../DebugBox';

function NormalList() {
    return (
        <DebugBox width="30rem">
            <List variant="normal">
                <ListRow>
                    <TextLabel basic="Hello World" />
                </ListRow>
                <ListRow>
                    <TextLabel basic="Row 2" />
                </ListRow>
                <ListRow>
                    <Button
                        icon="add"
                        basic="Add row" />
                </ListRow>
            </List>
        </DebugBox>
    );
}

export default NormalList;
