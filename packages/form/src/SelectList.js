import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Map as ImmutableMap } from 'immutable';

import {
    List,
} from '@ichef/gypcrete';

import Option, { valueType } from './SelectOption';

function getInitialCheckedState(fromValues) {
    const checkedState = new ImmutableMap();

    return checkedState.withMutations((map) => {
        fromValues.forEach(optionValue => map.set(optionValue, true));
    });
}

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
        checkedState: getInitialCheckedState(this.props.values || this.props.defaultValues),
    };

    componentWillReceiveProps(nextProps) {
        if (this.getIsControlled(nextProps)) {
            this.setState({
                checkedState: getInitialCheckedState(nextProps.values),
            });
        }
    }

    getIsControlled(fromProps = this.props) {
        return Array.isArray(fromProps.values);
    }

    getIsAllChecked() {
        const { checkedState } = this.state;
        const allOptions = this.getOptions();

        return allOptions.every(option => checkedState.get(option.value));
    }

    getOptions(fromProps = this.props) {
        const options = [];

        fromProps.children.forEach((child) => {
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

    handleChange(nextCheckedState) {
        const nextValues = this.getValues(nextCheckedState);

        if (!this.getIsControlled()) {
            this.setState({ checkedState: nextCheckedState });
        }
        this.props.onChange(nextValues);
    }

    handleOptionChange = (optionValue, isChecked) => {
        const { multiple, minCheck } = this.props;
        const { checkedState } = this.state;

        let nextState = checkedState;

        if (multiple) {
            nextState = nextState.set(optionValue, isChecked);

            const nextCheckedSize = nextState.filter(value => value).size;

            if (nextCheckedSize < minCheck) {
                // Cancel this operation
                return;
            }
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

        this.handleChange(nextState);
    }

    handleCheckAllOptionChange = (ignoreThis, isChecked) => {
        const variableOptions = this.getOptions()
            .filter(option => !option.readOnly);

        const nextState = this.state.checkedState.withMutations((map) => {
            variableOptions.forEach(option => map.set(option.value, isChecked));

            const nextCheckedSize = map.filter(value => value).size;
            const checksNeeded = this.props.minCheck - nextCheckedSize;

            // Check options until matching minCheck
            if (checksNeeded > 0) {
                variableOptions.slice(0, checksNeeded)
                    .forEach(option => map.set(option.value, true));
            }
        });

        this.handleChange(nextState);
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

    renderCheckAllOption() {
        const isAllChecked = this.getIsAllChecked();

        return (
            <Option
                label="All"
                value={null}
                checked={isAllChecked}
                onChange={this.handleCheckAllOptionChange} />
        );
    }

    render() {
        return (
            <List>
                {this.props.multiple && this.renderCheckAllOption()}
                {this.renderOptions()}
            </List>
        );
    }
}

export default SelectList;
