import React from 'react';
import { action } from '@storybook/addon-actions';

import Avatar from '@ichef/gypcrete/src/Avatar';
import List from '@ichef/gypcrete/src/List';
import SelectRow from '@ichef/gypcrete-form/src/SelectRow';
import Option from '@ichef/gypcrete-form/src/SelectOption';

function WithAvatar() {
    const loveAvatar = <Avatar alt="Love" src="https://api.adorable.io/avatars/285/love@ichef.tw" />;
    const trumpsAvatar = <Avatar alt="Trumps" src="https://api.adorable.io/avatars/285/trumps@ichef.tw" />;
    const hateAvatar = <Avatar alt="Hate" src="https://api.adorable.io/avatars/285/hate@ichef.tw" />;

    return (
        <List title="Switch rows">
            <SelectRow
                desc="Select One Avatar"
                defaultValues={['Love']}
                onChange={action('change')}>
                <Option label="Love" value="Love" avatar={loveAvatar} />
                <Option label="Trumps" value="Trumps" avatar={trumpsAvatar} />
                <Option label="Hate" value="Hate" avatar={hateAvatar} />
            </SelectRow>
        </List>
    );
}

export default WithAvatar;
