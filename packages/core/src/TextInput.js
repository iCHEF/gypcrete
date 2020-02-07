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


// --------------------
//  Helper components
// --------------------

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

export function InnerInput({
    multiLine,
    minRows,
    maxRows,
    renderInput,
    inputProps,
}) {
    if (renderInput) {
        return renderInput(inputProps);
    }

    if (multiLine) {
        return (
            <AutoSizeTextarea
                minRows={minRows}
                maxRows={maxRows}
                {...inputProps}
            />
        );
    }

    return (
        <input
            type="text"
            {...inputProps}
        />
    );
}

InnerInput.propTypes = {
    multiLine: PropTypes.bool,
    minRows: PropTypes.number,
    maxRows: PropTypes.number,
    renderInput: PropTypes.func,
    inputProps: PropTypes.objectOf(PropTypes.any),
};

InnerInput.defaultProps = {
    multiLine: false,
    minRows: 2,
    maxRows: undefined,
    renderInput: undefined,
    inputProps: {},
};

/**
 * A `<TextInput>` is a specialized `<TextLabel>`, which holds an editable `<input>`
 * as its main part.
 * All unknown props are expected to be passed into the underlying `<input>`.
 *
 * What's different from other row component is:
 *
 *   1. It doesn't have `basic` nor `aside`. Instead it holds `label` and `value`/`defaultValue`.
 *
 *   2. It doesn't support status icons, error message nor tags.
 */

function TextInput({
    label,
    readOnly,
    disabled,
    // <InnerInput> props
    renderInput,
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

    const input = (
        <InnerInput
            multiLine={multiLine}
            minRows={minRows}
            maxRows={maxRows}
            renderInput={renderInput}
            inputProps={{
                className: BEM.input.toString(),
                placeholder: 'Unset',
                readOnly,
                disabled,
                ...inputProps,
            }}
        />
    );

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
    // <InnerInput> props
    renderInput: PropTypes.func,
    multiLine: PropTypes.bool,
    minRows: PropTypes.number,
    maxRows: PropTypes.number,
};

TextInput.defaultProps = {
    label: undefined,
    readOnly: false,
    disabled: false,
    // <InnerInput> props
    renderInput: undefined,
    multiLine: undefined,
    minRows: undefined,
    maxRows: undefined,
};

TextInput.contextTypes = {
    textProps: PropTypes.shape({
        align: PropTypes.oneOf(Object.values(TEXT_ALIGN)),
    }),
};

export { TextInput as PureTextInput };
export default rowComp({ defaultVerticalOrder: VERTICAL_ORDER.REVERSE })(TextInput);
