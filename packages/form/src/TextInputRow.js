/* eslint-disable class-methods-use-this */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { ListRow, TextLabel } from '@ichef/gypcrete';
import AutoSizeTextarea from 'react-textarea-autosize';

import prefixClass from '@ichef/gypcrete/lib/utils/prefixClass';
import icBEM from '@ichef/gypcrete/lib/utils/icBEM';

import formRow, { rowPropTypes } from './mixins/formRow';
import './styles/TextInputRow.scss';

export const COMPONENT_NAME = prefixClass('form-text-input');
const ROOT_BEM = icBEM(COMPONENT_NAME);
export const BEM = {
    root: ROOT_BEM,
    label: ROOT_BEM.element('label'),
    input: ROOT_BEM.element('input'),
};

const isFunction = func => (typeof func === 'function');

class TextInputRow extends PureComponent {
    static propTypes = {
        label: PropTypes.node.isRequired,
        multiLine: PropTypes.bool,
        minRows: PropTypes.number,
        maxRows: PropTypes.number,
        renderInput: PropTypes.func,
        inputComponent: PropTypes.func,
        // input props
        value: PropTypes.string,
        placeholder: PropTypes.string,
        onChange: PropTypes.func,
        onFocus: PropTypes.func,
        onBlur: PropTypes.func,
        // from formRow()
        ineditable: PropTypes.bool,
        rowProps: rowPropTypes,
    };

    static defaultProps = {
        multiLine: false,
        minRows: 2,
        maxRows: undefined,
        renderInput: undefined,
        inputComponent: undefined,
        value: undefined,
        placeholder: 'Unset',
        onChange: () => {},
        onFocus: () => {},
        onBlur: () => {},
        ineditable: false,
        rowProps: {},
    };

    state = {
        focused: false,
    };

    handleInputFocus = (event) => {
        this.setState({ focused: true });
        this.props.onFocus(event);
    }

    handleInputBlur = (event) => {
        this.setState({ focused: false });
        this.props.onBlur(event);
    }

    renderInput({
        multiLine,
        style = {},
        renderInput,
        inputComponent,
        minRows,
        maxRows,
        ...otherProps
    }) {
        const sharedProps = {
            className: BEM.input.toString(),
            style,
            onFocus: this.handleInputFocus,
            onBlur: this.handleInputBlur,
            ...otherProps
        };

        if (multiLine) {
            const textareaProps = {
                ...sharedProps,
                minRows,
                maxRows,
            };

            return <AutoSizeTextarea {...textareaProps} />;
        }

        const inputProps = {
            type: 'text',
            ...sharedProps,
        };

        if (isFunction(renderInput)) {
            return renderInput(inputProps);
        }

        return React.createElement(
            isFunction(inputComponent) ? inputComponent : 'input',
            inputProps
        );
    }

    render() {
        const {
            label,
            onFocus,
            onBlur,
            // row props
            ineditable,
            rowProps,
            // React props
            className,
            children,
            ...renderInputProps
        } = this.props;

        const bemClass = BEM.root
            .modifier('focused', this.state.focused)
            .modifier('ineditable', ineditable);
        const rootClassName = classNames(bemClass.toString(), className);

        const keyLabel = (
            <span className={BEM.label.toString()}>
                {label}
            </span>
        );
        const input = this.renderInput(renderInputProps);

        return (
            <ListRow className={rootClassName} {...rowProps}>
                <TextLabel
                    basic={keyLabel}
                    aside={input}
                />
                {children}
            </ListRow>
        );
    }
}

export { TextInputRow as PureTextInputRow };
export default formRow({ withRef: true })(TextInputRow);
