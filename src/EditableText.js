import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import keycode from 'keycode';

import prefixClass from './utils/prefixClass';
import icBEM from './utils/icBEM';
import withStatus from './mixins/withStatus';
import './styles/EditableText.scss';

import BasicRow from './BasicRow';
import { PureText, BEM as TEXT_BEM } from './Text';

export const COMPONENT_NAME = prefixClass('editable-text');
const ROOT_BEM = icBEM(COMPONENT_NAME);
export const BEM = {
    root: ROOT_BEM,
    input: ROOT_BEM.element('input'),
    basicRow: ROOT_BEM.element('basic-row'),
    basicLabel: ROOT_BEM.element('basic-label'),
};

class EditableText extends PureComponent {
    static propTypes = {
        onEditEnd: PropTypes.func,
        // <input type="text" /> props
        value: PropTypes.string,
        defaultValue: PropTypes.string,
        placeholder: PropTypes.string,
        disabled: PropTypes.bool,
        onFocus: PropTypes.func,
        onBlur: PropTypes.func,
        onChange: PropTypes.func,
        onKeyDown: PropTypes.func,
        // Use `input` to inject props to the underlying <input>
        input: PropTypes.object, // eslint-disable-line react/forbid-prop-types
        // withStatus() props,
        errorMsg: PropTypes.string,
        statusIcon: PropTypes.node,
    };

    static defaultProps = {
        onEditEnd: () => {}, // ({ value: string|number, reset: boolean}) => {}
        // <input> props
        value: undefined,
        defaultValue: undefined,
        placeholder: 'Unset',
        disabled: false,
        onFocus: () => {},
        onBlur: () => {},
        onChange: () => {},
        onKeyDown: () => {},
        input: {},
        errorMsg: undefined,
        statusIcon: undefined,
    };

    state = {
        currentValue: this.props.value || this.props.defaultValue || '',
        focused: false,
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.props.value) {
            this.setState({ currentValue: nextProps.value });
        }
    }

    notifiyEditEnd(event, { reset = false } = {}) {
        this.props.onEditEnd({
            reset,
            value: event.target.value,
        });
    }

    handleInputFocus = (event) => {
        this.setState({ focused: true });
        this.props.onFocus(event);
    }

    handleInputBlur = (event) => {
        this.setState({ focused: false });
        this.notifiyEditEnd(event);

        this.props.onBlur(event);
    }

    handleInputChange = (event) => {
        // Only update if <input> isn't controlled
        if (!this.props.value) {
            this.setState({ currentValue: event.target.value });
        }

        this.props.onChange(event);
    }

    handleInputKeyDown = (event) => {
        switch (event.keyCode) {
            case keycode('Enter'):
                this.notifiyEditEnd(event);
                break;
            case keycode('Escape'):
                this.notifiyEditEnd(event, { reset: true });
                break;
            default:
                break;
        }
    }

    renderBasicRow() {
        const {
            placeholder,
            disabled,
            input: extraInputProps,
        } = this.props;

        const className = classNames(
            TEXT_BEM.row.toString(),
            TEXT_BEM.basic.toString(),
            BEM.basicRow.toString(),
        );

        // 'basic' is required for <BasicRow>, but will be set inside <Text>
        return (
            <BasicRow basic="" className={className}>
                <input
                    ref={(ref) => { this.inputNode = ref; }}
                    type="text"
                    className={BEM.input}
                    value={this.state.currentValue}
                    placeholder={placeholder}
                    disabled={disabled}
                    onFocus={this.handleInputFocus}
                    onBlur={this.handleInputBlur}
                    onChange={this.handleInputChange}
                    onKeyDown={this.handleInputKeyDown}
                    {...extraInputProps} />
            </BasicRow>
        );
    }

    render() {
        const {
            onEditEnd,
            // <input> props
            value,
            defaultValue,
            placeholder,
            disabled,
            onFocus,
            onBlur,
            onChange,
            onKeyDown,
            input,
            // status props
            statusIcon,
            errorMsg,
            // React props,
            className,
            ...textProps,
        } = this.props;

        const { currentValue, focused } = this.state;

        const bemClass = BEM.root
            .modifier('empty', !currentValue)
            .modifier('focused', focused);

        const rootClassName = classNames(`${bemClass}`, className);

        const basicLabel = (
            <span className={BEM.basicLabel}>
                {currentValue || placeholder}
            </span>
        );

        const statusProps = focused ? {} : { statusIcon, errorMsg };

        return (
            <PureText
                className={rootClassName}
                basic={basicLabel}
                basicRow={this.renderBasicRow()}
                {...statusProps}
                {...textProps} />
        );
    }
}

export default withStatus()(EditableText);
export { EditableText as PureEditableText };
