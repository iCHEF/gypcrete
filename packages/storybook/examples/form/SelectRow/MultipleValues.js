import React from 'react';
import { action } from '@storybook/addon-actions';

import List from '@ichef/gypcrete/src/List';
import SelectRow from '@ichef/gypcrete-form/src/SelectRow';
import Option from '@ichef/gypcrete-form/src/SelectOption';

function MultipleValues() {
    return (
        <List title="Switch rows with multiple selection">
            <SelectRow
                multiple
                label="Enabled modules"
                onChange={action('change')}>
                <Option label="Module 1" value="mod1" />
                <Option label="Module 2" value="mod2" />
                <Option label="Module 3" value="mod3" />
                <Option label="Module 4" value="mod4" />
                <Option label="Module 5" value="mod5" />
            </SelectRow>

            <SelectRow
                multiple
                label="Minimal selection: 2"
                minCheck={2}
                defaultValue={['opt-c', 'opt-d']}>
                <Option label="Option A" value="opt-a" />
                <Option label="Option B" value="opt-b" />
                <Option label="Option C" value="opt-c" />
                <Option label="Option D" value="opt-d" />
                <Option label="Option E" value="opt-e" />
            </SelectRow>

            <SelectRow
                multiple
                label="Multiple selection with no options" />
        </List>
    );
}

export default MultipleValues;
