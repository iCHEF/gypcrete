import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import Section from '@ichef/gypcrete/src/Section';

import getPropTables from 'utils/getPropTables';
import DebugBox from 'utils/DebugBox';
import DemoContent from './DemoContent';

storiesOf('@ichef/gypcrete|Section', module)
    .add('Plain section', withInfo('Plain <Section> with spacing around container')(() => (
        <DebugBox>
            <Section>
                <DemoContent />
            </Section>
        </DebugBox>
    )))
    .add('With title & desc', withInfo('<Section> with title and desc areas')(() => (
        <DebugBox>
            <Section title="Section title" desc="Description text">
                <DemoContent />
            </Section>
        </DebugBox>
    )))
    .add('Without vertical spacing', withInfo('Removes spacing above and below <Section>')(() => (
        <DebugBox>
            <Section
                verticalSpacing={false}
                title="Section title"
                desc="Description text"
            >
                <DemoContent />
            </Section>
        </DebugBox>
    )))
    .add('Without body padding', withInfo(
        'Removes horizontal padding for Section body, usually for <List>'
    )(() => (
        <DebugBox>
            <Section
                bodySpacing={false}
                title="Section title"
                desc="Description text"
            >
                <DemoContent />
            </Section>
        </DebugBox>
    )))

    .add('PropTypes', getPropTables([Section]));
