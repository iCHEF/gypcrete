import React from 'react';
import PropTypes from 'prop-types';

import getComponentName from '../utils/getComponentName';

import StatusIcon, { STATUS_CODE } from '../StatusIcon';

// Status context types
export const statusPropTypes = {
    status: PropTypes.oneOf(Object.values(STATUS_CODE)),
    statusOptions: PropTypes.object,
    errorMsg: PropTypes.string,
};

// prop types for what's going to set on wrapped component
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
