import React from 'react';

import List from '@ichef/gypcrete/src/List';
import ListRow from '@ichef/gypcrete/src/ListRow';

import Button from '@ichef/gypcrete/src/Button';
import TextLabel from '@ichef/gypcrete/src/TextLabel';

import DebugBox from 'utils/DebugBox';

function NormalList() {
    return (
        <DebugBox width="30rem">
            <List variant="normal" title="List title" desc="Help text here">
                <ListRow>
                    <TextLabel icon="tickets" basic="Hello World" />
                </ListRow>

                <ListRow
                    desc="Row help message"
                    status="error"
                    errorMsg="Row error message">
                    <TextLabel
                        bold
                        icon="tickets"
                        basic="Hello World"
                        aside="Component aside" />
                </ListRow>

                <ListRow highlight>
                    <TextLabel
                        icon="tickets"
                        basic="Highlighted row"
                        aside="Component aside" />
                </ListRow>
                <ListRow>
                    <TextLabel icon="tickets" basic="Row 3" />
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
