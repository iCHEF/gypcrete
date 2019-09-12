import React from 'react';

import List from '@ichef/gypcrete/src/List';
import SelectRow from '@ichef/gypcrete-form/src/SelectRow';
import Option from '@ichef/gypcrete-form/src/SelectOption';

function MultipleValues() {
    return (
        <List title="Switch rows with customized labels">
            <SelectRow
                multiple
                label="Custom 'All' label"
                asideAllLabel="EVERYHTING SELECTED"
                defaultValue={['opt-a', 'opt-b', 'opt-c']}
            >
                <Option label="Option A" value="opt-a" />
                <Option label="Option B" value="opt-b" />
                <Option label="Option C" value="opt-c" />
            </SelectRow>

            <SelectRow
                multiple
                label="Turn off 'All' label"
                asideAllLabel={false}
                defaultValue={['opt-a', 'opt-b', 'opt-c']}
            >
                <Option label="Option A" value="opt-a" />
                <Option label="Option B" value="opt-b" />
                <Option label="Option C" value="opt-c" />
            </SelectRow>

            <SelectRow
                multiple
                label="Custom 'None' label"
                asideNoneLabel="Nothing"
            >
                <Option label="Option A" value="opt-a" />
                <Option label="Option B" value="opt-b" />
                <Option label="Option C" value="opt-c" />
            </SelectRow>

            <SelectRow
                multiple
                label="Custom separator label"
                asideAllLabel={false}
                asideSeparator=" + "
                defaultValue={['opt-a', 'opt-b', 'opt-c']}
            >
                <Option label="Option A" value="opt-a" />
                <Option label="Option B" value="opt-b" />
                <Option label="Option C" value="opt-c" />
            </SelectRow>
        </List>
    );
}

export default MultipleValues;
