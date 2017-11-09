import React from 'react';
import { action } from '@storybook/addon-actions';

import Button from '@ichef/gypcrete/src/Button';
import List from '@ichef/gypcrete/src/List';
import ListRow from '@ichef/gypcrete/src/ListRow';

function DemoButton(props) {
    return (
        <Button
            bold
            minified={false}
            color="black"
            {...props} />
    );
}

function DemoList() {
    return (
        <List>
            <ListRow>
                <DemoButton basic="Row 1" onClick={action('click.1')} />
            </ListRow>
            <ListRow>
                <DemoButton basic="Row 2" onClick={action('click.2')} />
            </ListRow>
            <ListRow>
                <DemoButton basic="Row 3" onClick={action('click.3')} />
            </ListRow>
        </List>
    );
}

export default DemoList;
