import React from 'react';
import { Story } from '@kadira/react-storybook-addon-info';

const DEFAULT_OPTIONS = {
    inline: true,
    header: false,
    source: false,
    propTables: []
};

export default {
    addPropsTable(storyFn, info, extraPropTables = []) {
        const storyName = 'propTypes';

        if (Array.isArray(info)) {
            extraPropTables = info;
            info = '';
        }

        const options = {
            ...DEFAULT_OPTIONS,
            propTables: extraPropTables
        };

        // Modified from @kadira/react-storybook-addon-info
        return this.add(storyName, context => {
            const props = {
                info,
                context,
                showInline: Boolean(options.inline),
                showHeader: Boolean(options.header),
                showSource: Boolean(options.source),
                propTables: options.propTables,
                styles: typeof options.styles === 'function' ? options.styles : s => s,
            };

            return (
                <Story {...props}>
                    <div style={{ display: 'none' }}>
                        {storyFn(context)}
                    </div>
                </Story>
            );
        });
    }
};
