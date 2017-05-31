/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Story } from '@storybook/addon-info';

const DEFAULT_OPTIONS = {
    inline: true,
    header: false,
    source: false,
    propTables: []
};

/* eslint-disable no-underscore-dangle */
class PropsTableStory extends Story {
    // override render method
    render() {
        return (
            <div style={this.state.stylesheet.infoPage}>
                <div style={this.state.stylesheet.infoBody}>
                    {this._getPropTables()}
                    {this._getInfoContent()}
                </div>
            </div>
        );
    }
}
/* eslint-enable */

export default {
    addPropsTable(storyFn, defaultInfo, defaultExtraPropTables = []) {
        const storyName = 'propTypes';
        let info = defaultInfo;
        let extraPropTables = defaultExtraPropTables;

        /**
         * If second param is an array,
         * take it as extraPropTables
         */
        if (Array.isArray(info)) {
            extraPropTables = info;
            info = '';
        }

        const options = {
            ...DEFAULT_OPTIONS,
            propTables: extraPropTables
        };

        // Modified from @storybook/addon-info
        return this.add(storyName, (context) => {
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
                <PropsTableStory {...props}>
                    {storyFn(context)}
                </PropsTableStory>
            );
        });
    }
};
