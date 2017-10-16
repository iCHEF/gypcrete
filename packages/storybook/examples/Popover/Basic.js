import React from 'react';

import Popover from '@ichef/gypcrete/src/Popover';
import DemoList from './DemoList';

function BasicExample() {
    return (
        <div>
            <Popover>
                <DemoList />
            </Popover>

            <div style={{ height: 50 }} />

            <Popover placement="top">
                <DemoList />
            </Popover>
        </div>
    );
}

export default BasicExample;
