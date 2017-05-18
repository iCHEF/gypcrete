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
        // <TextLabel> props
        icon: TextLabel.propTypes.icon,
        basic: TextLabel.propTypes.basic,
        align: TextLabel.propTypes.align,
        status: TextLabel.propTypes.status,
    };

    static defaultProps = {
        inEdit: false,
        icon: TextLabel.defaultProps.icon,
        basic: TextLabel.defaultProps.basic,
        align: TextLabel.defaultProps.align,
        status: TextLabel.defaultProps.status,
    };

    render() {
        const { inEdit, ...labelProps } = this.props;
        const { icon, basic, align, status } = labelProps;

        if (!inEdit && status !== STATUS.LOADING) {
            return <TextLabel {...labelProps} />;
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
