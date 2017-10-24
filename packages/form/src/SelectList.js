import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import {
    Checkbox,
    List,
    ListRow,
} from '@ichef/gypcrete';

const valueType = PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
]);

export function Option({ label, value, readOnly, checked, onChange }) {
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

Option.propTypes = {
    label: PropTypes.node.isRequired,
    value: valueType.isRequired,
    readOnly: PropTypes.bool,
    // Set by <SelectList>
    checked: PropTypes.bool,
    onChange: PropTypes.func,
};

Option.defaultProps = {
    readOnly: false,
    checked: false,
    onChange: () => {},
};

/**
 * <SelectList>
 * ============
 * A List providing multiple options for user to pick from.
 * It can be in either *single* or *multiple* response mode.
 *
 * @example
 * Single response:
 * ```jsx
 * <SelectList values={[1]}>
 *     <Option label="Option A" value="1" readOnly />
 *     <Option label="Option B" value="2" />
 *     <Option label="Option C" value="3" />
 * </SelectList>
 * ```
 *
 * Multiple responses:
 * ```jsx
 * <SelectList multiple values={[1, 2]} minCheck={0}>
 *     <Option label="Option A" value="1" readOnly />
 *     <Option label="Option B" value="2" />
 *     <Option label="Option C" value="3" />
 * </SelectList>
 * ```
 */

class SelectList extends PureComponent {
    static propTypes = {
        values: PropTypes.arrayOf(valueType),
        onChange: PropTypes.func,
    };

    static defaultProps = {
        values: [],
        onChange: () => {},
    };

    getOptions() {
        const options = [];

        this.props.children.forEach((child) => {
            if (child && child.type === Option) {
                options.push(child.props);
            }
        });

        return options;
    }

    render() {
        return (
            <List>
                {this.props.children}
            </List>
        );
    }
}

export default SelectList;
