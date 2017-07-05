import React from 'react';

import List from 'src/List';
import ListRow from 'src/ListRow';

import Button from 'src/Button';
import Icon from 'src/Icon';
import TextLabel from 'src/TextLabel';
import TextInput from 'src/TextInput';

import DebugBox from '../DebugBox';

function SettingList() {
    return (
        <DebugBox width="30rem" style={{ padding: '1rem' }}>
            <List variant="setting">
                <ListRow>
                    <TextLabel basic="Hello World" />
                </ListRow>
                <ListRow>
                    <TextLabel basic="Row 2" />
                    <TextInput value="Value" />
                    <Icon type="row-padding" />
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

export default SettingList;
