import React from 'react';
import { action } from '@storybook/addon-actions';

import List from '@ichef/gypcrete/src/List';
import { PureTextInput } from '@ichef/gypcrete/src/TextInput';
import TextInputRow, { PureTextInputRow } from '@ichef/gypcrete-form/src/TextInputRow';

export default {
    title: '@ichef/gypcrete-form|TextInputRow',
    component: PureTextInputRow,
    subcomponents: {
        'formRow()': TextInputRow,
        TextInput: PureTextInput,
    },
};

export const basicUsage = () => (
    <List>
        <TextInputRow
            label="Module name"
            defaultValue="Points module"
            onChange={action('change')}
        />
    </List>
);

export const controlledInput = () => (
    <List>
        <TextInputRow
            label="Controlled input"
            value="input value"
            onChange={action('change')}
        />
    </List>
);
controlledInput.story = {
    parameters: {
        docs: {
            storyDescription: 'Observe its onChange() should be firing with user input',
        },
    },
};

export const readOnlyRow = () => (
    <List>
        <TextInputRow
            readOnly
            label="Read-only input"
            defaultValue="input value"
            onChange={action('change')}
        />
    </List>
);

export const disabledRow = () => (
    <List>
        <TextInputRow
            disabled
            label="Disabled input"
            defaultValue="input value"
            onChange={action('change')}
        />
    </List>
);

export const errorState = () => (
    <List>
        <TextInputRow
            label="Secret code"
            value="Foo bar"
            status="error"
            errorMsg="Cannot authenticate with this code."
            onChange={action('change')}
        />
    </List>
);

export const multiLinesUsage = () => {
    const EXAMPLE_TEXT = `
Lorem ipsum dolor sit amet,

consectetur adipiscing elit.
Donec vitae nibh sem.
    `.trim();

    return (
        <List>
            <TextInputRow
                multiLine
                label="Module name"
                defaultValue={EXAMPLE_TEXT} />

            <TextInputRow
                multiLine
                disabled
                label="Disabled row"
                value={EXAMPLE_TEXT} />

            <TextInputRow
                multiLine
                readOnly
                label="Read-only row"
                value={EXAMPLE_TEXT} />


            <TextInputRow
                multiLine
                label="Secret code"
                value={EXAMPLE_TEXT}
                status="error"
                errorMsg="Cannot authenticate with this code." />
        </List>
    );
};
multiLinesUsage.story = {
    name: 'Multi-lines Usage',
};
