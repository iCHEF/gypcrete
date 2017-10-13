import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';

import {
    ListRow,
    Switch as SwitchButton,
    TextLabel,
} from '@ichef/gypcrete';

import formRow, { rowPropTypes } from './mixins/formRow';

/**
 * <Switch>
 * ========
 * A row consisting a text label (on the left) and a switch button (on the right).
 * The aside of left label can be updated with the checked state of switch.
 *
 * All unknown props should go to the `<SwitchButton>` inside.
 */
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

            <SwitchButton
                status={null}
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
