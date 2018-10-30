import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import withStatus, { withStatusPropTypes, STATUS_CODE } from './mixins/withStatus';

import EditableBasicRow from './EditableBasicRow';
import { PureText } from './Text';

/**
 * <EditableText>
 * ==============
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
 * ```jsx
 * <EditableText
 *     value="Hello world"
 *     onChange={event => console.log(event.target.value)}
 *     status="loading" />
 * ```
 */
class EditableText extends PureComponent {
    static propTypes = {
        onFocus: PropTypes.func,
        onBlur: PropTypes.func,
        // <PureText> props,
        align: PureText.propTypes.align,
        noGrow: PureText.propTypes.noGrow,

        ...withStatusPropTypes,
        // status,
        // statusIcon,
        // errorMsg,
    };

    static defaultProps = {
        onFocus: () => {},
        onBlur: () => {},
        // <PureText> props,
        align: PureText.defaultProps.align,
        noGrow: PureText.defaultProps.noGrow,
        status: undefined,
        statusIcon: undefined,
        errorMsg: undefined,
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
            className,
            ...editableRowProps,
        } = this.props;

        const textProps = { align, noGrow };
        const statusProps = this.state.focused ? {} : { statusIcon, errorMsg };

        const basicRow = (
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

export default withStatus({ withRawStatus: true })(EditableText);
export { EditableText as PureEditableText };
