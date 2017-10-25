import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Map as ImmutableMap } from 'immutable';

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
        multiple: PropTypes.bool,
        minCheck: PropTypes.number,
        values: PropTypes.arrayOf(valueType),
        defaultValues: PropTypes.arrayOf(valueType),
        onChange: PropTypes.func,
    };

    static defaultProps = {
        multiple: false,
        minCheck: 0,
        values: undefined,
        defaultValues: [],
        onChange: () => {},
    };

    state = {
        checkedState: this.getInitialCheckedState(this.props.defaultValues || this.props.values),
    };

    componentWillReceiveProps(nextProps) {
        if (this.getIsControlled(nextProps)) {
            this.setState({
                checkedState: this.getInitialCheckedState(nextProps.values),
            });
        }
    }

    getIsControlled(fromProps = this.props) {
        return Array.isArray(fromProps.values);
    }

    getInitialCheckedState(fromValues = this.props.values) {
        const checkedState = new ImmutableMap();

        return checkedState.withMutations((map) => {
            fromValues.forEach(optionValue => map.set(optionValue, true));
        });
    }

    getOptions() {
        const options = [];

        this.props.children.forEach((child) => {
            if (child && child.type === Option) {
                options.push(child.props);
            }
        });

        return options;
    }

    getValues(fromCheckedState = this.state.checkedState) {
        return fromCheckedState
            .filter(optionValue => optionValue) // all the checked values
            .keySeq()
            .toArray();
    }

    handleOptionChange = (optionValue, isChecked) => {
        const { multiple, minCheck } = this.props;
        const { checkedState } = this.state;

        let nextState = checkedState;

        if (multiple) {
            // #TODO: implement multi-select
        } else {
            const currentCheckedOptionValue = checkedState.findKey(value => value);

            if (optionValue === currentCheckedOptionValue) {
                // Does not consider a change
                return;
            }
            nextState = nextState
                .set(currentCheckedOptionValue, false)
                .set(optionValue, isChecked);
        }

        const nextValues = this.getValues(nextState);

        if (!this.getIsControlled()) {
            this.setState({ checkedState: nextState });
        }
        this.props.onChange(nextValues);
    }

    renderOptions() {
        return React.Children.map(this.props.children, (child) => {
            if (child && child.type === Option) {
                return React.cloneElement(child, {
                    checked: this.state.checkedState.get(child.props.value),
                    onChange: this.handleOptionChange,
                });
            }
            return child;
        });
    }

    render() {
        return (
            <List>
                {this.renderOptions()}
            </List>
        );
    }
}

export default SelectList;
