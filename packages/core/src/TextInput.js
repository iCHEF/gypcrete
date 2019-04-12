import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import AutoSizeTextarea from 'react-textarea-autosize';

import prefixClass from './utils/prefixClass';
import icBEM from './utils/icBEM';
import rowComp from './mixins/rowComp';

import { PureText, TEXT_ALIGN, VERTICAL_ORDER } from './Text';
import './styles/TextInput.scss';

export const COMPONENT_NAME = prefixClass('text-input');
const ROOT_BEM = icBEM(COMPONENT_NAME);

export const BEM = {
    input: ROOT_BEM.element('input'),
};

export function TextInputBasicRow({ basic, className }) {
    return (
        <div className={className}>
            {basic}
        </div>
    );
}

TextInputBasicRow.propTypes = {
    basic: PropTypes.node,
};

TextInputBasicRow.defaultProps = {
    basic: undefined,
};

/**
 * A `<TextInput>` is a specialized `<TextLabel>`, which holds an editable `<input>`
 * as its main part.
 * All unknown props are expected to be passed into the underlying `<input>`.
 *
 * What's different from other row component is:
 *   1. It doesn't have `basic` nor `aside`. Instead it holds `label` and `value`/`defaultValue`.
 *   2. It doesn't support status icons, error message nor tags
 *
 * @example
```jsx
<TextInput
    label="Welcome msg"
    value="Hello world"
    placeholder="(Unset)"
    onChange={event => console.log(event.target.value)} />
```
 */

function TextInput({
    label,
    readOnly,
    disabled,
    renderInput,
    // multi-line mode
    multiLine,
    minRows,
    maxRows,
    // React props
    className,
    children,
    ...inputProps
}, context) {
    const rootClassName = classNames(className, COMPONENT_NAME);
    const { textProps } = context;

    const input = (() => {
        const sharedInputProps = {
            className: BEM.input.toString(),
            placeholder: 'Unset',
            readOnly,
            disabled,
            ...inputProps,
        };

        if (renderInput) {
            return renderInput(sharedInputProps);
        }

        if (multiLine) {
            return (
                <AutoSizeTextarea
                    minRows={minRows}
                    maxRows={maxRows}
                    {...sharedInputProps}
                />
            );
        }

        return (
            <input
                type="text"
                {...sharedInputProps}
            />
        );
    })();

    const isEditable = !(readOnly || disabled);

    return (
        <div className={rootClassName}>
            <PureText
                {...textProps}
                basicRow={<TextInputBasicRow />}
                bold={isEditable}
                basic={input}
                aside={label}
            />
        </div>
    );
}

TextInput.propTypes = {
    label: PropTypes.node,
    readOnly: PropTypes.bool,
    disabled: PropTypes.bool,
    renderInput: PropTypes.func,
    // multi-line mode
    multiLine: PropTypes.bool,
    minRows: PropTypes.number,
    maxRows: PropTypes.number,
};

TextInput.defaultProps = {
    label: undefined,
    readOnly: false,
    disabled: false,
    renderInput: undefined,
    // multi-line mode
    multiLine: false,
    minRows: 2,
    maxRows: undefined,
};

TextInput.contextTypes = {
    textProps: PropTypes.shape({
        align: PropTypes.oneOf(Object.values(TEXT_ALIGN)),
    }),
};

export { TextInput as PureTextInput };
export default rowComp({ defaultVerticalOrder: VERTICAL_ORDER.REVERSE })(TextInput);
