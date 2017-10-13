import * as React from 'react';
import * as PropTypes from 'prop-types';

import {
    ListRow,
    Switch,
    TextLabel,
} from '@ichef/gypcrete';

import formRow, { rowPropTypes } from './mixins/formRow';

/**
 * <Switch>
 * ========
 * A row consisting a text label (on the left) and a switch button (on the right).
 * The aside of left label can be updated with the checked state of switch.
 *
 * All unknown props should go to the `<Switch>` from core package inside.
 */
class SwitchRow extends React.PureComponent {
    static propTypes = {
        label: PropTypes.node.isRequired,
        asideOn: PropTypes.node,
        asideOff: PropTypes.node,
        // input props
        checked: PropTypes.bool,
        defaultChecked: PropTypes.bool,
        onChange: PropTypes.func,
        // from formRow()
        ineditable: PropTypes.bool,
        rowProps: rowPropTypes,
    };

    static defaultProps = {
        asideOn: 'ON',
        asideOff: 'OFF',
        checked: undefined,
        defaultChecked: undefined,
        onChange: () => {},
        ineditable: false,
        rowProps: {},
    };

    state = {
        checked: this.props.defaultChecked || this.props.checked,
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.checked !== this.props.checked) {
            this.setState({ checked: nextProps.checked });
        }
    }

    getIsControlled() {
        const isControlled = this.props.checked !== undefined
            && this.props.checked !== null;

        return isControlled;
    }

    getSwitchAside() {
        const { asideOn, asideOff } = this.props;

        return this.state.checked ? asideOn : asideOff;
    }

    handleSwitchButtonChange = (event) => {
        if (!this.getIsControlled()) {
            this.setState({ checked: event.target.checked });
        }
        this.props.onChange(event);
    }

    render() {
        const {
            label,
            asideOn,
            asideOff,
            // input props
            // checked,
            // defaultChecked,
            onChange,
            // from formRow()
            ineditable,
            rowProps,
            // React props
            className,
            ...switchProps,
        } = this.props;

        return (
            <ListRow className={className} {...rowProps}>
                <TextLabel
                    bold={!ineditable}
                    basic={label}
                    aside={this.getSwitchAside()} />

                <Switch
                    status={null}
                    onChange={this.handleSwitchButtonChange}
                    {...switchProps} />
            </ListRow>
        );
    }
}

export { SwitchRow as PureSwitchRow };
export default formRow()(SwitchRow);
