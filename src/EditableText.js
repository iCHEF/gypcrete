import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import prefixClass from './utils/prefixClass';
import icBEM from './utils/icBEM';
import './styles/EditableText.scss';

import BasicRow from './BasicRow';
import Text, { BEM as TEXT_BEM } from './Text';

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
        // <input type="text" /> props
        value: PropTypes.string,
        defaultValue: PropTypes.string,
        placeholder: PropTypes.string,
        disabled: PropTypes.bool,
        onChange: PropTypes.func,
        // Use `input` to inject props to the underlying <input>
        input: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    };

    static defaultProps = {
        // <input> props
        value: undefined,
        defaultValue: undefined,
        placeholder: 'Unset',
        disabled: false,
        onChange: () => {},
        input: {},
    };

    state = {
        currentValue: this.props.value || this.props.defaultValue || ''
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.props.value) {
            this.setState({ currentValue: nextProps.value });
        }
    }

    handleInputChange = (event) => {
        // Only update if <input> isn't controlled
        if (!this.props.value) {
            this.setState({ currentValue: event.target.value });
        }

        this.props.onChange(event);
    }

    renderBasicRow() {
        const {
            value,
            defaultValue,
            placeholder,
            disabled,
            input: extraInputProps,
        } = this.props;

        const inputProps = {
            value,
            defaultValue,
            placeholder,
            disabled,
        };

        const className = classNames(
            TEXT_BEM.row.toString(),
            TEXT_BEM.basic.toString(),
            BEM.basicRow.toString(),
        );

        return (
            <BasicRow className={className}>
                <input
                    ref={(ref) => { this.inputNode = ref; }}
                    type="text"
                    className={BEM.input}
                    onChange={this.handleInputChange}
                    {...inputProps}
                    {...extraInputProps} />
            </BasicRow>
        );
    }

    render() {
        const {
            value,
            defaultValue,
            placeholder,
            disabled,
            onChange,
            input,
            // React props,
            className,
            ...textProps,
        } = this.props;

        const { currentValue } = this.state;

        const bemClass = BEM.root
            .modifier('empty', !currentValue);

        const rootClassName = classNames(`${bemClass}`, className);

        const basicLabel = (
            <span className={BEM.basicLabel}>
                {currentValue || placeholder}
            </span>
        );

        return (
            <Text
                className={rootClassName}
                basic={basicLabel}
                basicRow={this.renderBasicRow()}
                {...textProps} />
        );
    }
}

export default EditableText;
