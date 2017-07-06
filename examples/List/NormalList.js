import React from 'react';

import List from 'src/List';
import ListRow from 'src/ListRow';

import Button from 'src/Button';
import TextLabel from 'src/TextLabel';

import DebugBox from '../DebugBox';

function NormalList() {
    return (
        <DebugBox width="30rem">
            <List variant="normal" title="List title" desc="Help text here">
                <ListRow>
                    <TextLabel icon="tickets" basic="Hello World" />
                </ListRow>
                <ListRow>
                    <TextLabel icon="tickets" basic="Row 2" />
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
