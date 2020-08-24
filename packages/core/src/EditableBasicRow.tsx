import React, { PureComponent } from 'react';
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

type OwnProps = {
    inputTag?: any; // TODO: PropTypes.oneOf(Object.values(ROW_INPUT_TAGS))
    value?: string;
    defaultValue?: string;
    placeholder?: string;
    readOnly?: boolean;
    disabled?: boolean;
    onChange?: (...args: any[]) => any;
    onFocus?: (...args: any[]) => any;
    onBlur?: (...args: any[]) => any;
    status?: string;
    statusIcon?: React.ReactElement;
};

type State = any;

type Props = OwnProps & typeof EditableBasicRow.defaultProps;

/**
 * <EditableBasicRow>
 * ==================
 * The core control of input in an editable component.
 *
 * It renders an `<input>` by default, and can be switched to a `<textarea>`
 * for multi-lines support.
 *
 * The “basic text” is updated with the current value of the underlying input,
 * and is hidden when the input is focused. That way the label can be properly
 * truncated and appended with ellipsis (in single-line mode), and can maintain
 * reasonable width in a CSS Flexbox.
 *
 * Since the input is the core concern of this component,
 * all unknown props should be passed to the input.
 *
 * @example
 * Single-line mode (default)
 * ```jsx
 * <EditableBasicRow
 *     value="Text to be edited"
 *     onChange={(event) => console.log(event.target.value)} />
 * ```
 *
 * Multi-lines mode
 * ```jsx
 * <EditableBasicRow
 *     inputTag="textarea"
 *     value="Text to be edited"
 *     onChange={(event) => console.log(event.target.value)} />
 * ```
 */

class EditableBasicRow extends PureComponent<Props, State> {
    static defaultProps = {
        inputTag: TAG_INPUT,
        value: undefined,
        defaultValue: undefined,
        placeholder: 'Unset',
        readOnly: false,
        disabled: false,
        onChange: () => {},
        onFocus: () => {},
        onBlur: () => {},
        status: undefined,
        statusIcon: undefined,
    };

    inputNode: any;

    state = {
        currentValue: this.props.value || this.props.defaultValue || '',
        focused: false,
    };

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.value !== this.props.value) {
            this.setState({ currentValue: nextProps.value });
        }
    }

    handleInputFocus = (event) => {
        this.setState({ focused: true });
        this.props.onFocus(event);
    }

    handleInputBlur = (event) => {
        this.setState({ focused: false });
        this.props.onBlur(event);
    }

    handleInputChange = (event) => {
        // Only update if <input> isn't controlled
        if (!this.props.value) {
            this.setState({ currentValue: event.currentTarget.value });
        }

        this.props.onChange(event);
    }

    render() {
        const {
            inputTag: InputTag,
            // <input> props
            placeholder,
            readOnly,
            disabled,
            // event handlers, should not go into <input> directly
            onChange,
            onFocus,
            onBlur,
            // status props
            status, // digested by this component and should not go into <input>
            statusIcon,
            // React props
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'className' does not exist on type 'Reado... Remove this comment to see the full error message
            className,
            // <BasicRow> props from <Text>, should ignore
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'basic' does not exist on type 'Readonly<... Remove this comment to see the full error message
            basic, // eslint-disable-line react/prop-types
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'tag' does not exist on type 'Readonly<Pr... Remove this comment to see the full error message
            tag, // eslint-disable-line react/prop-types
            ...inputProps
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
            // @ts-expect-error ts-migrate(2322) FIXME: Type 'BEMFactory' is not assignable to type 'strin... Remove this comment to see the full error message
            <span className={BEM.basicLabel}>
                {currentValue || placeholder}
                {InputTag === TAG_TEXTAREA && '\n'}
            </span>
        );

        return (
            // @ts-expect-error ts-migrate(2322) FIXME: Property 'children' does not exist on type 'Intrin... Remove this comment to see the full error message
            <BasicRow
                className={rootClassName}
                basic={basicLabel}
                statusIcon={statusIcon}>
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
