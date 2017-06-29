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

const TAG_INPUT = 'input';
const TAG_TEXTAREA = 'textarea';
export const ROW_INPUT_TAGS = {
    INPUT: TAG_INPUT,
    TEXTAREA: TAG_TEXTAREA
};

type AcceptedInput = HTMLInputElement | HTMLTextAreaElement;
type EventWithInput = Event & { currentTarget: AcceptedInput };

export type Props = {
    inputTag: typeof TAG_INPUT | typeof TAG_TEXTAREA,
    value?: string,
    defaultValue?: string,
    readOnly: boolean,
    disabled: boolean,
    status?: string | null,
    placeholder: string,
    onChange: (event?: Event) => void,
    onFocus: (event?: Event) => void,
    onBlur: (event?: Event) => void,
    input: { [string]: any },
    className?: string, // eslint-disable-line react/require-default-props
};

class EditableBasicRow extends PureComponent<Props, Props, any> {
    inputNode: ?AcceptedInput;

    static propTypes = {
        inputTag: PropTypes.oneOf(Object.values(ROW_INPUT_TAGS)),
        value: PropTypes.string,
        defaultValue: PropTypes.string,
        readOnly: PropTypes.bool,
        disabled: PropTypes.bool,
        status: PropTypes.string,
        // <input type="text" /> props
        placeholder: PropTypes.string,
        onChange: PropTypes.func,
        onFocus: PropTypes.func,
        onBlur: PropTypes.func,
        // Use `input` to inject props to the underlying <input>
        input: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    };

    static defaultProps = {
        inputTag: TAG_INPUT,
        value: undefined,
        defaultValue: undefined,
        readOnly: false,
        disabled: false,
        status: undefined,
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
            inputTag: InputTag,
            value,
            defaultValue,
            readOnly,
            disabled,
            status,
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

        const inputType = (InputTag === TAG_INPUT) ? 'text' : undefined;
        const inputTabIndex = (readOnly || disabled) ? -1 : undefined;

        /**
         * Append an extra line-break,
         * or the last empty line in <textarea> will be invisible on browser
         */
        const basicLabel = (
            <span className={BEM.basicLabel}>
                {currentValue || placeholder}
                {'\n'}
            </span>
        );

        return (
            <BasicRow
                {...rowProps}
                basic={basicLabel}
                className={rootClassName}>
                <InputTag
                    ref={(ref) => { this.inputNode = ref; }}
                    type={inputType}
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
