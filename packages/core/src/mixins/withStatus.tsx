/* eslint-disable indent */
import React, { Component, ComponentElement } from 'react';
import PropTypes from 'prop-types';

import getComponentName from '../utils/getComponentName';

import StatusIcon, { STATUS_CODE } from '../StatusIcon';

export { STATUS_CODE };

// Status context types
export const statusPropTypes = {
    status: PropTypes.oneOf(Object.values(STATUS_CODE)),
    statusOptions: PropTypes.object,
    errorMsg: PropTypes.string,
};

export interface StatusProps {
    /**
     * FIXME: Use type in StatusIcon
     */
    status?: 'loading' | 'success' | 'error'
    /**
     * FIXME: Refine this type after we type StatusIcon
     */
    statusOptions?: object
    errorMsg?: string
}

// prop types for what's going to set on wrapped component
export const withStatusPropTypes = {
    status: statusPropTypes.status,
    statusIcon: PropTypes.node,
    errorMsg: statusPropTypes.errorMsg,
};

export type WithStatusProps = {
    status?: StatusProps['status']
    statusIcon?: React.ReactNode
    errorMsg?: StatusProps['errorMsg']
}

const withStatus = <P, >({
    withRef = false,
    withRawStatus = false,
    ...defaultStatusOptions
} = {}) => (WrappedComponent: React.ComponentType<P>) => {
    const componentName = getComponentName(WrappedComponent);

    return class WithStatus extends Component<P & WithStatusProps> {
        static displayName = `withStatus(${componentName})`;

        static contextTypes = {
            ...statusPropTypes,
            // status,
            // statusOptions,
            // errorMsg,
        };

        renderedComponentRef: React.Ref<React.ReactNode>

        getRenderedComponent() {
            return this.renderedComponentRef;
        }

        getOptionalProps(): { status?: StatusProps['status']} {
            const props: { status?: StatusProps['status']} = {};

            if (withRawStatus) {
                props.status = this.context.status;
            }

            return props;
        }

        render() {
            const { status, statusOptions = {}, errorMsg } = this.context;

            const statusIcon = status && (
                <StatusIcon
                    status={status}
                    {...defaultStatusOptions}
                    {...statusOptions} />
            );

            const refProps = !withRef ? {} : {
                ref: (ref) => { this.renderedComponentRef = ref; },
            };
            const optionalProps = this.getOptionalProps();

            return (
                <WrappedComponent
                    {...refProps}
                    {...this.props}
                    {...optionalProps}
                    statusIcon={statusIcon}
                    errorMsg={errorMsg} />
            );
        }
    };
};

export default withStatus;
