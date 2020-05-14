import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import warning from 'warning';

import { Map as ImmutableMap } from 'immutable';

import {
    List,
} from '@ichef/gypcrete';

import Option, {
    valueType,
    TYPE_SYMBOL as OPTION_TYPE_SYMBOL,
} from './SelectOption';

import parseSelectOptions from './utils/parseSelectOptions';
import getElementTypeSymbol from './utils/getElementTypeSymbol';

function getInitialCheckedState(selectedValue, multiple = true) {
    const checkedState = new ImmutableMap();

    return checkedState.withMutations((map) => {
        const valueArray = (multiple) ? selectedValue : [selectedValue];
        valueArray.forEach(optionValue => map.set(optionValue, true));
    });
}

/**
 * A List providing multiple options for user to pick from.
 * It can be in either **single** or **multiple** response mode.
 */

class SelectList extends PureComponent {
    static propTypes = {
        multiple: PropTypes.bool,
        showCheckAll: PropTypes.bool,
        minCheck: PropTypes.number,
        checkAllLabel: PropTypes.node,
        value: PropTypes.oneOfType([
            valueType,
            PropTypes.arrayOf(valueType),
        ]),
        defaultValue: PropTypes.oneOfType([
            valueType,
            PropTypes.arrayOf(valueType),
        ]),
        onChange: PropTypes.func,
        title: PropTypes.string,
        desc: PropTypes.node,
    };

    static defaultProps = {
        multiple: false,
        showCheckAll: true,
        minCheck: 0,
        checkAllLabel: 'All',
        value: undefined,
        defaultValue: undefined,
        onChange: () => {},
        title: undefined,
        desc: undefined,
    };

    state = {
        checkedState: getInitialCheckedState(
            this.getInitialValue(),
            this.props.multiple
        ),
    };

    componentWillReceiveProps(nextProps) {
        warning(
            this.getIsControlled(this.props) === this.getIsControlled(nextProps),
            '<SelectList> should not switch from controlled to uncontrolled (or vice versa).'
        );

        if (this.getIsControlled(nextProps)) {
            this.setState({
                checkedState: getInitialCheckedState(nextProps.value, nextProps.multiple),
            });
        } else if (this.props.multiple !== nextProps.multiple) {
            warning(false, '<SelectList>: you should not change `multiple` prop while it is uncontrolled. Its value will be reset now.');
            this.setState({
                checkedState: getInitialCheckedState([])
            });
        }
    }

    getInitialValue() {
        const { value, defaultValue, multiple } = this.props;

        if (value !== undefined) {
            return value;
        }

        if (multiple && defaultValue === undefined) {
            return [];
        }

        return defaultValue;
    }

    getIsControlled(fromProps = this.props) {
        return fromProps.value !== undefined;
    }

    getIsAllChecked() {
        const { checkedState } = this.state;
        const allOptions = this.getOptions();

        return allOptions.every(option => checkedState.get(option.value));
    }

    getOptions(fromProps = this.props) {
        return parseSelectOptions(fromProps.children);
    }

    // eslint-disable-next-line react/destructuring-assignment
    getValues(fromCheckedState = this.state.checkedState) {
        const allOptions = this.getOptions();

        return allOptions
            .filter(option => fromCheckedState.get(option.value))
            .map(option => option.value);
    }

    handleChange(nextCheckedState) {
        const { onChange, multiple } = this.props;
        const nextValues = this.getValues(nextCheckedState);

        if (!this.getIsControlled()) {
            this.setState({ checkedState: nextCheckedState });
        }
        onChange(multiple ? nextValues : nextValues[0]);
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
        const { minCheck } = this.props;
        const { checkedState } = this.state;

        const variableOptions = this.getOptions()
            .filter(option => !option.readOnly);

        const nextState = checkedState.withMutations((map) => {
            variableOptions.forEach(option => map.set(option.value, isChecked));

            const nextCheckedSize = map.filter(value => value).size;
            const checksNeeded = minCheck - nextCheckedSize;

            // Check options until matching minCheck
            if (checksNeeded > 0) {
                variableOptions.slice(0, checksNeeded)
                    .forEach(option => map.set(option.value, true));
            }
        });

        this.handleChange(nextState);
    }

    renderOptions(children = this.props.children) {
        const { checkedState } = this.state;

        return React.Children.map(children, (child) => {
            if (getElementTypeSymbol(child) === OPTION_TYPE_SYMBOL) {
                return React.cloneElement(child, {
                    checked: checkedState.get(child.props.value),
                    onChange: this.handleOptionChange,
                });
            }

            if (child && child.type === React.Fragment) {
                return this.renderOptions(child.props.children);
            }

            return child;
        });
    }

    renderCheckAllOption() {
        const { checkAllLabel } = this.props;
        const isAllChecked = this.getIsAllChecked();

        return (
            <Option
                label={checkAllLabel}
                value={null}
                checked={isAllChecked}
                onChange={this.handleCheckAllOptionChange} />
        );
    }

    render() {
        const {
            multiple,
            showCheckAll,
            title,
            desc,
            ...wrapperProps
        } = this.props;

        return (
            <List title={title} desc={desc} {...wrapperProps}>
                {multiple && showCheckAll && this.renderCheckAllOption()}
                {this.renderOptions()}
            </List>
        );
    }
}

export default SelectList;
