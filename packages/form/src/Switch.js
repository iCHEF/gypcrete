import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';

import {
    ListRow,
    Switch as GypSwitch,
    TextLabel,
} from '@ichef/gypcrete';

import formRow, { rowPropTypes } from './mixins/formRow';

function Switch({
    label,
    aside,
    // from formRow()
    ineditable,
    rowProps,
    // React props,
    className,
    ...switchProps,
}) {
    const rootClassName = classNames('', className);

    return (
        <ListRow className={rootClassName} {...rowProps}>
            <TextLabel
                bold={!ineditable}
                basic={label}
                aside={aside} />

            <GypSwitch
                {...switchProps} />
        </ListRow>
    );
}

Switch.propTypes = {
    label: PropTypes.node.isRequired,
    aside: PropTypes.node,
    // from formRow()
    ineditable: PropTypes.bool,
    rowProps: rowPropTypes,
};

Switch.defaultProps = {
    aside: undefined,
    ineditable: false,
    rowProps: {},
};

export { Switch as PureSwitch };
export default formRow()(Switch);
