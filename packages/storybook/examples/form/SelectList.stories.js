import React from 'react';
import { action } from '@storybook/addon-actions';

import SelectList from '@ichef/gypcrete-form/src/SelectList';
import SelectOption from '@ichef/gypcrete-form/src/SelectOption';

export default {
    title: '@ichef/gypcrete-form|SelectList',
    component: SelectList,
    subcomponents: { SelectOption },
};

export const singleUncontrolled = () => (
    <SelectList defaultValue="1" onChange={action('change')}>
        <SelectOption label="Option A" value="1" />
        <SelectOption label="Option B" value="2" />
        <SelectOption label="Option C" value="3" />
    </SelectList>
);
singleUncontrolled.story = {
    name: 'Single-value (uncontrolled)',
};

export const singleControlled = () => (
    <SelectList value="1" onChange={action('change')}>
        <SelectOption label="Option A" value="1" />
        <SelectOption label="Option B" value="2" />
        <SelectOption label="Option C" value="3" />
    </SelectList>
);
singleControlled.story = {
    name: 'Single-value (controlled)',
    parameters: {
        docs: {
            storyDescription: 'Observe its onChange() should be firing with user-clicked option',
        },
    },
};

export const multipleUncontrolled = () => (
    <SelectList
        multiple
        defaultValue={['1']}
        onChange={action('change')}>
        <SelectOption label="Option A" value="1" />
        <SelectOption label="Option B" value="2" />
        <SelectOption label="Option C" value="3" />
    </SelectList>
);
multipleUncontrolled.story = {
    name: 'Multiple-values (uncontrolled)',
};

export const multipleControlled = () => (
    <SelectList
        multiple
        value={['1', '2']}
        onChange={action('change')}>
        <SelectOption label="Option A" value="1" />
        <SelectOption label="Option B" value="2" />
        <SelectOption label="Option C" value="3" />
    </SelectList>
);
multipleControlled.story = {
    name: 'Multiple-values (controlled)',
    parameters: {
        docs: {
            storyDescription: 'Observe its onChange() should be firing with user-clicked option',
        },
    },
};

export const multipleWithoutCheckAll = () => (
    <SelectList
        multiple
        showCheckAll={false}
        defaultValue={['1']}
        onChange={action('change')}>
        <SelectOption label="Option A" value="1" />
        <SelectOption label="Option B" value="2" />
        <SelectOption label="Option C" value="3" />
    </SelectList>
);
multipleWithoutCheckAll.story = {
    name: 'Without Check-All option',
};

export const multipleWithReadOnly = () => (
    <SelectList
        multiple
        defaultValue={['1']}
        onChange={action('change')}>
        <SelectOption label="Option A" value="1" readOnly />
        <SelectOption label="Option B" value="2" />
        <SelectOption label="Option C" value="3" />
    </SelectList>
);
multipleWithReadOnly.story = {
    name: 'With Read-only options',
};

export const minimumChecksRequired = () => (
    <SelectList
        multiple
        minCheck={1}
        defaultValue={['1']}
        onChange={action('change')}>
        <SelectOption label="Option A" value="1" />
        <SelectOption label="Option B" value="2" />
        <SelectOption label="Option C" value="3" />
    </SelectList>
);
minimumChecksRequired.story = {
    parameters: {
        docs: {
            storyDescription: `
                Requires how many options should be chekced at least.
                Options cannot be unchecked if eqaul or less than required count.
            `.trim(),
        },
    },
};
