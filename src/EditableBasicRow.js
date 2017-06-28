// @flow
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './styles/EditableBasicRow.scss';

import prefixClass from './utils/prefixClass';
import icBEM from './utils/icBEM';

import BasicRow from './BasicRow';

export const COMPONENT_NAME = prefixClass('editable-basic-row');
const ROOT_BEM = icBEM(COMPONENT_NAME);

export const BEM = {
    root: ROOT_BEM,
    input: ROOT_BEM.element('input'),
    basicLabel: ROOT_BEM.element('basic-label'),
};

type EventWithInput = Event & { currentTarget: HTMLInputElement };

export type Props = {
    status?: any,
    value?: string,
    defaultValue?: string,
    readOnly: boolean,
    disabled: boolean,
    placeholder: string,
    onChange: (event?: Event) => void,
    onFocus: (event?: Event) => void,
    onBlur: (event?: Event) => void,
    input: { [string]: any },
    className?: string, // eslint-disable-line react/require-default-props
};

class EditableBasicRow extends PureComponent<Props, Props, any> {
    inputNode: ?HTMLInputElement;

    static propTypes = {
        status: PropTypes.string,
        value: PropTypes.string,
        defaultValue: PropTypes.string,
        readOnly: PropTypes.bool,
        disabled: PropTypes.bool,
        // <input type="text" /> props
        placeholder: PropTypes.string,
        onChange: PropTypes.func,
        onFocus: PropTypes.func,
        onBlur: PropTypes.func,
        // Use `input` to inject props to the underlying <input>
        input: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    };

    static defaultProps = {
        status: undefined,
        value: undefined,
        defaultValue: undefined,
        readOnly: false,
        disabled: false,
        placeholder: 'Unset',
        onChange: () => {},
        onFocus: () => {},
        onBlur: () => {},
        input: {},
    };

    state = {
        currentValue: this.props.value || this.props.defaultValue || '',
        focused: false,
    };

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.value !== this.props.value) {
            this.setState({ currentValue: nextProps.value });
        }

        if (this.inputNode && nextProps.status !== this.props.status) {
            this.inputNode.blur();
        }
    }

    handleInputFocus = (event: Event) => {
        this.setState({ focused: true });
        this.props.onFocus(event);
    }

    handleInputBlur = (event: Event) => {
        this.setState({ focused: false });
        this.props.onBlur(event);
    }

    handleInputChange = (event: EventWithInput) => {
        // Only update if <input> isn't controlled
        if (!this.props.value) {
            this.setState({ currentValue: event.currentTarget.value });
        }

        this.props.onChange(event);
    }

    render() {
        const {
            status,
            value,
            defaultValue,
            readOnly,
            disabled,
            // <input type="text" /> props
            placeholder,
            onChange,
            onFocus,
            onBlur,
            input: inputProps,
            // React props
            className,
            ...rowProps,
        } = this.props;
        const { currentValue, focused } = this.state;

        const bemClass = BEM.root
            .modifier('empty', !currentValue)
            .modifier('focused', focused)
            .modifier('disabled', disabled);
        const rootClassName = classNames(bemClass.toString(), className);

        const inputTabIndex = (readOnly || disabled) ? -1 : undefined;

        const basicLabel = (
            <span className={BEM.basicLabel}>
                {currentValue || placeholder}
            </span>
        );

        return (
            <BasicRow
                {...rowProps}
                basic={basicLabel}
                className={rootClassName}>
                <input
                    ref={(ref) => { this.inputNode = ref; }}
                    type="text"
                    value={currentValue}
                    placeholder={placeholder}
                    className={BEM.input.toString()}
                    readOnly={readOnly}
                    disabled={disabled}
                    tabIndex={inputTabIndex}
                    onChange={this.handleInputChange}
                    onFocus={this.handleInputFocus}
                    onBlur={this.handleInputBlur}
                    {...inputProps} />
            </BasicRow>
        );
    }
}

export default EditableBasicRow;
