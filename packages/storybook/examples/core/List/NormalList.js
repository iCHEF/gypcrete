import React from 'react';

import Avatar from '@ichef/gypcrete/src/Avatar';
import List from '@ichef/gypcrete/src/List';
import ListRow from '@ichef/gypcrete/src/ListRow';

import Button from '@ichef/gypcrete/src/Button';
import IconButton from '@ichef/gypcrete/src/IconButton';
import TextLabel from '@ichef/gypcrete/src/TextLabel';

import DebugBox from 'utils/DebugBox';

function NormalList() {
    return (
        <DebugBox width="30rem">
            <List variant="normal" title="List title" desc="Help text here">
                <ListRow>
                    <Avatar alt="iCHEF" src="https://api.adorable.io/avatars/285/hello@ichef.tw" />
                    <TextLabel basic="Hello World" />
                </ListRow>

                <ListRow>
                    <TextLabel icon="tickets" basic="Hello World" />
                </ListRow>

                <ListRow
                    desc="Row help message"
                    status="error"
                    errorMsg="Row error message"
                >
                    <TextLabel
                        bold
                        icon="tickets"
                        basic="Hello World"
                        aside="Component aside"
                        status={null}
                    />
                    <IconButton icon="edit" />
                    <IconButton tinted icon="drag" />
                </ListRow>

                <ListRow highlight>
                    <TextLabel
                        icon="tickets"
                        basic="Highlighted row"
                        aside="Component aside"
                    />
                    <IconButton icon="edit" />
                    <IconButton tinted icon="drag" />
                </ListRow>
                <ListRow>
                    <TextLabel icon="tickets" basic="Row 3" />
                    <IconButton icon="edit" />
                    <IconButton tinted icon="drag" />
                </ListRow>
                <ListRow>
                    <Button
                        icon="add"
                        basic="Add row"
                    />
                </ListRow>
            </List>
        </DebugBox>
    );
}

export default NormalList;
