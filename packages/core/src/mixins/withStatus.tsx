import React, { Component } from 'react';
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

// prop types for what's going to set on wrapped component
export const withStatusPropTypes = {
    status: statusPropTypes.status,
    statusIcon: PropTypes.node,
    errorMsg: statusPropTypes.errorMsg,
};

// @ts-expect-error ts-migrate(4025) FIXME: Exported variable 'withStatus' has or is using pri... Remove this comment to see the full error message
const withStatus = ({
    withRef = false,
    withRawStatus = false,
    ...defaultStatusOptions
} = {}) => (WrappedComponent) => {
    const componentName = getComponentName(WrappedComponent);

    class WithStatus extends Component {
        static displayName = `withStatus(${componentName})`;

        static contextTypes = {
            ...statusPropTypes,
            // status,
            // statusOptions,
            // errorMsg,
        };

        getRenderedComponent() {
            // @ts-expect-error ts-migrate(2551) FIXME: Property 'renderedComponentRef' does not exist on ... Remove this comment to see the full error message
            return this.renderedComponentRef;
        }

        getOptionalProps() {
            const props = {};

            if (withRawStatus) {
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'status' does not exist on type '{}'.
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
                // @ts-expect-error ts-migrate(2551) FIXME: Property 'renderedComponentRef' does not exist on ... Remove this comment to see the full error message
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
    }

    return WithStatus;
};

export default withStatus;
