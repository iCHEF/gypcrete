function componentTemplate(
    { template },
    opts,
    {
        componentName,
        props,
        jsx,
    },
) {
    const code = `
    import React from 'react';
    NEWLINE

    export default function COMPONENT_NAME(PROPS) {
    return JSX;
    }
    `;
    const plugins = ['jsx'];
    if (opts.typescript) {
        plugins.push('typescript');
    }
    const typeScriptTpl = template.smart(code, { plugins });
    return typeScriptTpl({
        COMPONENT_NAME: componentName,
        JSX: jsx,
        PROPS: props,
        NEWLINE: '\n',
    });
}
module.exports = componentTemplate;
