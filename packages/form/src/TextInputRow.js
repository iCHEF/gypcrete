import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
    ListRow,
    TextLabel,
} from '@ichef/gypcrete';

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

class TextInputRow extends PureComponent {
    static propTypes = {
        label: PropTypes.node.isRequired,
        multiLine: PropTypes.bool,
        // input props
        placeholder: PropTypes.string,
        onFocus: PropTypes.func,
        onBlur: PropTypes.func,
        // from formRow()
        ineditable: PropTypes.bool,
        rowProps: rowPropTypes,
    };

    static defaultProps = {
        multiLine: false,
        placeholder: 'Unset',
        onFocus: () => {},
        onBlur: () => {},
        ineditable: false,
        rowProps: {},
    };

    state = {
        focused: false,
        inputHeight: 'auto',
    };

    setInputRef = (ref) => {
        this.inputRef = ref;
    }

    getInputRef = () => this.inputRef;

    /**
     * Use `getInputRef()` instead.
     * Should remove in v2.
     * @deprecated
     */
    getInputNode = this.getInputRef;

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
        style: inputStyle = {},
        ...inputProps
    }) {
        const sharedProps = {
            ref: this.setInputRef,
            className: BEM.input.toString(),
            onFocus: this.handleInputFocus,
            onBlur: this.handleInputBlur,
        };

        const textareaStyle = {
            ...inputStyle,
            height: this.state.inputHeight,
        };

        if (multiLine) {
            return (
                <textarea
                    style={textareaStyle}
                    {...sharedProps}
                    {...inputProps} />
            );
        }

        return (
            <input
                type="text"
                {...sharedProps}
                {...inputProps} />
        );
    }

    render() {
        const {
            label,
            // multiLine,
            // input props
            // placeholder,
            onFocus,
            onBlur,
            // row props
            ineditable,
            rowProps,
            // React props
            className,
            children,
            ...renderInputProps,
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
                    aside={input} />
                {children}
            </ListRow>
        );
    }
}

export { TextInputRow as PureTextInputRow };
export default formRow({ withRef: true })(TextInputRow);
