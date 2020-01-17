import { extractProps } from '@storybook/addon-docs/dist/frameworks/react/extractProps';

function formatValue(value) {
    switch (typeof value) {
        case 'string':
            return `'${value}'`;
        case 'function':
            return '[function]';
        default:
            return JSON.stringify(value);
    }
}

export default function getComponentProps(component) {
    const extractedProps = extractProps(component).rows;

    if (!extractedProps.length) {
        const inferredProps = Object.keys(component.propTypes || {})
            .map((propName) => {
                const required = !(typeof component.propTypes[propName].isRequired === 'function');
                const defaultValue = formatValue((component.defaultProps || {})[propName]);

                return {
                    name: propName,
                    required,
                    defaultValue: (
                        defaultValue === undefined ? undefined : { summary: defaultValue }
                    ),
                };
            });

        return {
            sections: {
                'Inffered props (not from docgen)': inferredProps
            },
        };
    }

    return { rows: extractedProps };
}
