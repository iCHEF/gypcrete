import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import SplitView from '@ichef/gypcrete/src/SplitView';
import SplitViewColumn from '@ichef/gypcrete/src/SplitViewColumn';

import DebugBox from 'utils/DebugBox';
import { getAddonOptions } from 'utils/getPropTables';

import BasicUsage from './BasicUsage';
import ContainsColumnView from './ContainsColumnView';
import InsideColumnView from './InsideColumnView';

storiesOf('@ichef/gypcrete|SplitView', module)
    .addDecorator((storyFn, { parameters = {} }) => {
        if (parameters.debugBox === false) {
            return storyFn();
        }
        return (
            <DebugBox width="40rem" height="24rem">
                {storyFn()}
            </DebugBox>
        );
    })
    .addDecorator(withInfo)

    .add('basic usage', BasicUsage)
    .add('contains <ColumnView>', ContainsColumnView)
    .add('inside <ColumnView>', InsideColumnView)
    .add(
        'props',
        () => <div />,
        {
            info: getAddonOptions([SplitView, SplitViewColumn]),
            debugBox: false,
        }
    );
