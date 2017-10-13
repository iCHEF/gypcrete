import * as React from 'react';
import * as PropTypes from 'prop-types';

import getComponentName from '@ichef/gypcrete/lib/utils/getComponentName';
import { statusPropTypes } from '@ichef/gypcrete/lib/mixins/withStatus';

const propTypes = {
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,
    desc: PropTypes.node,
    ...statusPropTypes,
    // status
    // statusOptions
    // errorMsg
};

const defaultProps = {
    disabled: false,
    readOnly: false,
    desc: undefined,
};

export const rowPropTypes = PropTypes.shape({
    desc: PropTypes.node,
    ...statusPropTypes,
});

const formRow = (/* mixin options */) => (WrappedComponent) => {
    function FormRow({
        disabled,
        readOnly,
        desc,
        status,
        statusOptions,
        errorMsg,
        ...otherProps,
    }) {
        const ineditable = disabled || readOnly;
        const rowProps = {
            desc,
            status,
            statusOptions,
            errorMsg,
        };

        return (
            <WrappedComponent
                ineditable={ineditable}
                disabled={disabled}
                readOnly={readOnly}
                rowProps={rowProps}
                {...otherProps} />
        );
    }

    FormRow.displayName = `formRow(${getComponentName(WrappedComponent)})`;
    FormRow.propTypes = propTypes;
    FormRow.defaultProps = defaultProps;

    return FormRow;
};

export default formRow;
