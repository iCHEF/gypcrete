import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import {
  ListRow,
  Switch,
  TextLabel,
} from '@ichef/gypcrete';

import prefixClass from '@ichef/gypcrete/lib/utils/prefixClass';
import icBEM from '@ichef/gypcrete/lib/utils/icBEM';

import formRow, { rowPropTypes } from './mixins/formRow';
import './styles/SwitchRow.scss';

export const COMPONENT_NAME = prefixClass('form-switch');
const ROOT_BEM = icBEM(COMPONENT_NAME);
export const BEM = {
  root: ROOT_BEM,
  switch: ROOT_BEM.element('switch'),
};

/**
 * A row consisting a text label (on the left) and a switch button (on the right).
 * The left value label (`asideOn/Off`) can be updated with the checked state of switch.
 *
 * All unknown props should go to the `<Switch>` from `@ichef/gypcrete` core package.
 */
class SwitchRow extends PureComponent {
    static propTypes = {
      /** row label */
      label: PropTypes.node.isRequired,
      /** descriptive value label when switch is turned __on__ */
      asideOn: PropTypes.node,
      /** descriptive value label when switch is turned __off__ */
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

    // eslint-disable-next-line react/no-deprecated
    componentWillReceiveProps(nextProps) {
      this.setState({ checked: nextProps.checked });
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
        children,
        ...switchProps
      } = this.props;

      return (
        <ListRow className={className} {...rowProps}>
          <TextLabel
            disabled={ineditable}
            verticalOrder="reverse"
            basic={this.getSwitchAside()}
            aside={label}
          />

          <Switch
            status={null}
            onChange={this.handleSwitchButtonChange}
            className={BEM.switch.toString()}
            {...switchProps}
          />

          {children}
        </ListRow>
      );
    }
}

export { SwitchRow as PureSwitchRow };
export default formRow()(SwitchRow);
