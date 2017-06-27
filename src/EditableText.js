import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import withStatus, { withStatusPropTypes, STATUS_CODE } from './mixins/withStatus';

import EditableBasicRow from './EditableBasicRow';
import { PureText } from './Text';

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
        // Status props
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
