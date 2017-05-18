import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { getTextLayoutProps } from './mixins/rowComp';

import EditableText from './EditableText';
import Icon from './Icon';
import TextLabel from './TextLabel';

import { STATUS_CODE as STATUS } from './StatusIcon';

class EditableTextLabel extends PureComponent {
    static propTypes = {
        inEdit: PropTypes.bool,
        // Custom callbacks
        onEditRequest: PropTypes.func,
        // <TextLabel> props
        icon: TextLabel.propTypes.icon,
        basic: TextLabel.propTypes.basic,
        align: TextLabel.propTypes.align,
        status: TextLabel.propTypes.status,
    };

    static defaultProps = {
        inEdit: false,
        onEditRequest: () => {},
        icon: TextLabel.defaultProps.icon,
        basic: TextLabel.defaultProps.basic,
        align: TextLabel.defaultProps.align,
        status: TextLabel.defaultProps.status,
    };

    handleDoubleClick = () => {
        /**
         * Request edit via double-click is not favored,
         * because users can hardly find out this interaction.
         *
         * This is kept for compatibility reasons.
         *
         * Currently I have no plan for supporting the simulated double-click detection
         * on mobile devices. It's even harder for users to figure out,
         * and it's not a common UI pattern.
         *
         * We should rely on visible buttons or menus to trigger edit.
         */
        this.props.onEditRequest();
    }

    render() {
        const {
            inEdit,
            onEditRequest,
            ...labelProps,
        } = this.props;
        const { icon, basic, align, status } = labelProps;

        if (!inEdit && status !== STATUS.LOADING) {
            return (
                <TextLabel
                    onDoubleClick={this.handleDoubleClick}
                    {...labelProps} />
            );
        }

        const layoutProps = getTextLayoutProps(align, !!icon);

        return (
            <TextLabel {...labelProps}>
                {icon && <Icon type={icon} />}
                <EditableText
                    defaultValue={basic}
                    {...layoutProps} />
            </TextLabel>
        );
    }
}

export default EditableTextLabel;
