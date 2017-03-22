import React, { PropTypes } from 'react';
import getComponentName from '../utils/getComponentName';
import { statusPropTypes } from './rowComp';

import StatusIcon from '../StatusIcon';

export const withStatusPropTypes = {
    statusIcon: PropTypes.node,
    errorMsg: PropTypes.string,
};

const withStatus = (defaultOptions = {}) => (WrappedComponent) => {
    const componentName = getComponentName(WrappedComponent);

    function WithStatus(props, context) {
        const { status, statusOptions = {}, errorMsg } = context;

        const statusIcon = status && (
            <StatusIcon
                status={status}
                {...defaultOptions}
                {...statusOptions} />
        );

        return (
            <WrappedComponent
                {...props}
                statusIcon={statusIcon}
                errorMsg={errorMsg} />
        );
    }
    WithStatus.displayName = `withStatus(${componentName})`;

    WithStatus.contextTypes = {
        ...statusPropTypes,
        // status,
        // statusOptions,
        // errorMsg,
    };

    return WithStatus;
};

export default withStatus;
