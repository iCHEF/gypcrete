import React from 'react';
import PropTypes from 'prop-types';

import {
    Checkbox,
    ListRow,
} from '@ichef/gypcrete';

export const valueType = PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
]);

export const TYPE_SYMBOL = Symbol('SelectOption');

function SelectOption({
    label,
    value,
    avatar,
    readOnly,
    checked,
    onChange,
    ...checkboxProps
}) {
    const handleCheckboxChange = (event) => {
        onChange(value, event.target.checked);
    };

    return (
        <ListRow>
            <Checkbox
                checked={checked}
                disabled={readOnly}
                basic={label}
                avatar={avatar}
                onChange={handleCheckboxChange}
                {...checkboxProps} />
        </ListRow>
    );
}

SelectOption.propTypes = {
    label: PropTypes.node.isRequired,
    value: valueType,
    readOnly: PropTypes.bool,
    // Set by <SelectList>
    checked: PropTypes.bool,
    onChange: PropTypes.func,
};

SelectOption.defaultProps = {
    value: null,
    readOnly: false,
    checked: false,
    onChange: () => {},
};

/**
 * `react-hot-loader` v4 wraps every single component with a proxy for its
 * internal uses. This breaks the comparison of this component and type from
 * any React.Element, because the later will always be a hot-loader proxy.
 *
 * I'm trying to add a new way for comparison so we can still be sure if an
 * element is created from <SelectOption>.
 */
SelectOption.typeSymbol = TYPE_SYMBOL;

export default SelectOption;
