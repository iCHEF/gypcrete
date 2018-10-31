import React from 'react';
import { action } from '@storybook/addon-actions';

import Button from '@ichef/gypcrete/src/Button';
import List from '@ichef/gypcrete/src/List';
import ListRow from '@ichef/gypcrete/src/ListRow';

function ButtonRow(props) {
    return (
        <ListRow>
            <Button
                minified={false}
                {...props} />
        </ListRow>
    );
}

function DemoList() {
    return (
        <List>
            <ButtonRow basic="Row 1" onClick={action('click.1')} />
            <ButtonRow basic="Row 2" onClick={action('click.2')} />
            <ButtonRow basic="Row 3" onClick={action('click.3')} />

            <ButtonRow basic="Link row" tagName="a" href="https://apple.com" />
        </List>
    );
}

export default DemoList;
