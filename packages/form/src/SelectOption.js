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

function SelectOption({ label, value, readOnly, checked, onChange }) {
    const handleCheckboxChange = (event) => {
        onChange(value, event.target.checked);
    };

    return (
        <ListRow>
            <Checkbox
                checked={checked}
                disabled={readOnly}
                basic={label}
                onChange={handleCheckboxChange} />
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

export default SelectOption;
