import React from 'react';

import List from '@ichef/gypcrete/src/List';
import ListRow from '@ichef/gypcrete/src/ListRow';

import Button from '@ichef/gypcrete/src/Button';
import Icon from '@ichef/gypcrete/src/Icon';
import TextLabel from '@ichef/gypcrete/src/TextLabel';
import TextInput from '@ichef/gypcrete/src/TextInput';

import DebugBox from 'utils/DebugBox';

function SettingList() {
    return (
        <DebugBox width="30rem">
            <List variant="setting" title="List title" desc="Help text here">
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
