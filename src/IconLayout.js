import React, { PropTypes } from 'react';
import withStatus, { withStatusPropTypes } from './mixins/withStatus';
import wrapIfNotElement from './utils/wrapIfNotElement';
import './styles/IconLayout.scss';

import Icon from './Icon';

import { STATUS_POSITION } from './StatusIcon';

export const COMPONENT_NAME = 'ic-iconlayout'; // Prevent from affected by 'ic-icon-*' styles

function IconLayout({
    icon,
    // from withStatus()
    statusIcon,
    errorMsg, // #TODO: Display errorMsg with Tooltip.
}) {
    const iconElement = wrapIfNotElement(icon, { with: Icon, via: 'type' });

    return (
        <span className={COMPONENT_NAME}>
            {iconElement}
            {errorMsg}
            {statusIcon}
        </span>
    );
}

IconLayout.propTypes = {
    icon: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element
    ]).isRequired,

    ...withStatusPropTypes,
    // statusIcon,
    // errorMsg,
};

export default withStatus({ position: STATUS_POSITION.CORNER })(IconLayout);
export { IconLayout as PureIconLayout };
