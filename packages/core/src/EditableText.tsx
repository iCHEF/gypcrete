import React, { PureComponent } from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import withStatus, { withStatusPropTypes, STATUS_CODE } from './mixins/withStatus';

import EditableBasicRow from './EditableBasicRow';
import { PureText } from './Text';

type OwnProps = {
    onFocus?: (...args: any[]) => any;
    onBlur?: (...args: any[]) => any;
    align?: any; // TODO: PureText.propTypes.align
    noGrow?: any; // TODO: PureText.propTypes.noGrow
    status?: any; // withStatusPropTypes.status
    statusIcon?: any; // TODO: withStatusPropTypes.statusIcon
    errorMsg?: any; // TODO: withStatusPropTypes.errorMsg
};

type State = any;

type Props = OwnProps & typeof EditableText.defaultProps;

/**
 * <EditableText>
 * ==============
 *
 * The visual element which stands as an input version of `<Text>`.
 *
 * It actually renders a `<Text>` inside, but swaps its basic row to an editable version.
 * Since input is the main task of this element, all unknown props are expected
 * to be passed to the underlying input. (That is, the `<EditableBasicRow>`.)
 *
 * It also hides status icon when the underlying input is being focused, leaving the
 * whole space for input.
 *
 * Another difference between `<EditableText>` and the traditional `<Text>` is that
 * `<EditableText>` does not take the `basic` prop as the later. Its _basic label_
 * are supposed to be rendered by the value of input.
 *
 * Besides these, it does take layout props (`align` and `noGrow`) and status props.
 *
 * @example
 *
 * ```jsx
 * <EditableText
 *     value="Hello world"
 *     onChange={event => console.log(event.target.value)}
 *     status="loading" />
 * ```
 */
class EditableText extends PureComponent<Props, State> {
    static defaultProps = {
        onFocus: () => {},
        onBlur: () => {},
        // <PureText> props,
        align: PureText.defaultProps.align,
        noGrow: PureText.defaultProps.noGrow,
        // withStatus() props
        status: undefined,
        statusIcon: undefined,
        errorMsg: undefined,
    };

    state = {
        focused: false,
    };

    handleInputFocus = (event) => {
        const { onFocus } = this.props;

        this.setState({ focused: true });
        onFocus(event);
    }

    handleInputBlur = (event) => {
        const { onBlur } = this.props;

        this.setState({ focused: false });
        onBlur(event);
    }

    render() {
        const {
            // <PureText> props
            align,
            noGrow,
            // status props
            status,
            statusIcon,
            errorMsg,
            // React props,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'className' does not exist on type 'Reado... Remove this comment to see the full error message
            className,
            ...editableRowProps
        } = this.props;

        const { focused: isFocused } = this.state;

        const textProps = { align, noGrow };
        const statusProps = isFocused ? {} : { statusIcon, errorMsg };

        const basicRow = (
            // @ts-expect-error ts-migrate(2769) FIXME: Type '(event: any) => void' is not assignable to t... Remove this comment to see the full error message
            <EditableBasicRow
                {...editableRowProps}
                status={status}
                readOnly={status === STATUS_CODE.LOADING}
                onFocus={this.handleInputFocus}
                onBlur={this.handleInputBlur} />
        );

        return (
            <PureText
                basicRow={basicRow}
                {...textProps}
                {...statusProps} />
        );
    }
}

// @ts-expect-error ts-migrate(4082) FIXME: Default export of the module has or is using priva... Remove this comment to see the full error message
export default withStatus({ withRawStatus: true })(EditableText);
export { EditableText as PureEditableText };
