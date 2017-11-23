import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import getComponentName from '@ichef/gypcrete/lib/utils/getComponentName';
import { statusPropTypes } from '@ichef/gypcrete/lib/mixins/withStatus';

export const rowPropTypes = PropTypes.shape({
    desc: PropTypes.node,
    ...statusPropTypes,
});

const formRow = ({
    withRef = false,
} = {}) => (WrappedComponent) => {
    class FormRow extends PureComponent {
        static displayName = `formRow(${getComponentName(WrappedComponent)})`;

        static propTypes = {
            disabled: PropTypes.bool,
            readOnly: PropTypes.bool,
            desc: PropTypes.node,
            ...statusPropTypes,
            // status
            // statusOptions
            // errorMsg
        };

        static defaultProps = {
            disabled: false,
            readOnly: false,
            desc: undefined,
        };

        getWrappedComponent() {
            return this.componentRef;
        }

        handleRef = (ref) => {
            if (withRef) {
                this.componentRef = ref;
            }
        }

        render() {
            const {
                disabled,
                readOnly,
                desc,
                status,
                statusOptions,
                errorMsg,
                ...otherProps,
            } = this.props;

            const ineditable = disabled || readOnly;
            const rowProps = {
                desc,
                status,
                statusOptions,
                errorMsg,
            };

            return (
                <WrappedComponent
                    ref={this.handleRef}
                    ineditable={ineditable}
                    disabled={disabled}
                    readOnly={readOnly}
                    rowProps={rowProps}
                    {...otherProps} />
            );
        }
    }

    return FormRow;
};

export default formRow;
