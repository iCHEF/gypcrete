import { extractProps } from '@storybook/addon-docs/dist/frameworks/react/extractProps';

function formatValue(value) {
    switch (typeof value) {
        case 'string':
            return `'${value}'`;
        case 'boolean':
            return `${value}`;
        case 'function':
            return '[function]';
        default:
            return value;
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
                    defaultValue: defaultValue && ({ summary: defaultValue }),
                };
            });

        return inferredProps;
    }

    return extractedProps;
}
