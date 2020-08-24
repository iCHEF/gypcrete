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

type OwnTextInputBasicRowProps = {
    basic?: React.ReactNode;
};

type TextInputBasicRowProps = OwnTextInputBasicRowProps & typeof TextInputBasicRow.defaultProps;


// --------------------
//  Helper components
// --------------------

// @ts-expect-error ts-migrate(2339) FIXME: Property 'className' does not exist on type 'TextI... Remove this comment to see the full error message
export function TextInputBasicRow({ basic, className }: TextInputBasicRowProps) {
    return (
        <div className={className}>
            {basic}
        </div>
    );
}

TextInputBasicRow.defaultProps = {
    basic: undefined,
};

type OwnInnerInputProps = {
    multiLine?: boolean;
    minRows?: number;
    maxRows?: number;
    renderInput?: (...args: any[]) => any;
    inputProps?: {
        [key: string]: any;
    };
};

type InnerInputProps = OwnInnerInputProps & typeof InnerInput.defaultProps;

export function InnerInput({ multiLine, minRows, maxRows, renderInput, inputProps, }: InnerInputProps) {
    if (renderInput) {
        return renderInput(inputProps);
    }

    if (multiLine) {
        return (
            <AutoSizeTextarea
                minRows={minRows}
                maxRows={maxRows}
                {...inputProps} />
        );
    }

    return (
        <input
            type="text"
            {...inputProps} />
    );
}

InnerInput.defaultProps = {
    multiLine: false,
    minRows: 2,
    maxRows: undefined,
    renderInput: undefined,
    inputProps: {},
};

type TextInputProps = {
    label?: React.ReactNode;
    readOnly?: boolean;
    disabled?: boolean;
    renderInput?: (...args: any[]) => any;
    multiLine?: boolean;
    minRows?: number;
    maxRows?: number;
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
    label, readOnly, disabled,
    // <InnerInput> props
    renderInput, multiLine, minRows, maxRows,
    // React props
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'className' does not exist on type 'TextI... Remove this comment to see the full error message
    className, children, ...inputProps
}: TextInputProps, context) {
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
            }} />
    );

    const isEditable = !(readOnly || disabled);

    return (
        <div className={rootClassName}>
            <PureText
                {...textProps}
                basicRow={<TextInputBasicRow />}
                bold={isEditable}
                basic={input}
                aside={label} />
        </div>
    );
}

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
// @ts-expect-error ts-migrate(4082) FIXME: Default export of the module has or is using priva... Remove this comment to see the full error message
export default rowComp({ defaultVerticalOrder: VERTICAL_ORDER.REVERSE })(TextInput);
