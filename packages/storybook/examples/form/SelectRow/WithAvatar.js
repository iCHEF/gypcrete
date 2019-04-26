import React from 'react';
import { action } from '@storybook/addon-actions';

import Avatar from '@ichef/gypcrete/src/Avatar';
import List from '@ichef/gypcrete/src/List';
import SelectRow from '@ichef/gypcrete-form/src/SelectRow';
import Option from '@ichef/gypcrete-form/src/SelectOption';

function WithAvatar() {
    const rdAvatar = <Avatar type="square" alt="Avatar of RD" src="https://api.adorable.io/avatars/285/rd@ichef.tw" />;
    const designAvatar = <Avatar alt="Avatar of Design" src="https://api.adorable.io/avatars/285/design@ichef.tw" />;

    return (
        <List title="Switch rows">
            <SelectRow
                desc="Default is off"
                defaultValues={['RD']}
                onChange={action('change')}>
                <Option label="RD" value="RD" avatar={rdAvatar} />
                <Option label="Design" value="Design" avatar={designAvatar} />
            </SelectRow>
        </List>
    );
}

export default WithAvatar;
