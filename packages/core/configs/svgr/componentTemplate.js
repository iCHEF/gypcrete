/**
 * Receive params from svgr, return component template.
 * The `template` param is from babel-template (https://babeljs.io/docs/en/next/babel-template.html)
 * See svgr document (https://react-svgr.com/docs/custom-templates/#custom-index-template)
 */
function componentTemplate(
    { template },
    opts,
    {
        componentName,
        props,
        jsx,
    },
) {
    /**
     * Because we cannot keep line break with template.ast (https://babeljs.io/docs/en/next/babel-template.html#ast-1),
     * we have to write it like this to inject newline and other arguments.
     * See usage: https://babeljs.io/docs/en/next/babel-template.html#string-usage
     */
    const code = `
    import React from 'react';
    NEWLINE

    export default function COMPONENT_NAME(PROPS) {
    return JSX;
    }
    `;
    const plugins = ['jsx'];
    const componentTpl = template.smart(code, { plugins });
    return componentTpl({
        COMPONENT_NAME: componentName,
        JSX: jsx,
        PROPS: props,
        NEWLINE: '\n',
    });
}
module.exports = componentTemplate;
