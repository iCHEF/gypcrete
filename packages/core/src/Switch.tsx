import React, { PureComponent } from 'react';
import classNames from 'classnames';

import prefixClass from './utils/prefixClass';
import icBEM from './utils/icBEM';
import rowComp from './mixins/rowComp';
import './styles/Switch.scss';

import SwitchIcon from './SwitchIcon';
import IconLayout from './IconLayout';

export const COMPONENT_NAME = prefixClass('switch');
const ROOT_BEM = icBEM(COMPONENT_NAME);
export const BEM = {
    root: ROOT_BEM,
    input: ROOT_BEM.element('input'),
    button: ROOT_BEM.element('button'),
    iconWrapper: ROOT_BEM.element('icon-wrapper'),
};

type OwnProps = {
    input?: any;
    checked?: boolean;
    defaultChecked?: boolean;
    disabled?: boolean;
    onChange?: (...args: any[]) => any;
};

type Props = OwnProps & typeof Switch.defaultProps;

/**
 * <Switch>
 * ===
 *
 * A `<Switch>` is a row component which can be turned either on or off,
 * with its underlying `<input type=checkbox>`.`
 */

class Switch extends PureComponent<Props> {
    static defaultProps = {
        input: {},
        checked: undefined,
        defaultChecked: undefined,

        disabled: false,
        onChange: undefined,
    };

    inputRef: any;

    renderSwitchButton(inputProps) {
        const button = <SwitchIcon />;

        return (
            // @ts-expect-error ts-migrate(2322) FIXME: Type 'BEMFactory' is not assignable to type 'strin... Remove this comment to see the full error message
            <span className={BEM.iconWrapper}>
                <input
                    ref={(ref) => { this.inputRef = ref; }}
                    type="checkbox"
                    className={BEM.input}
                    {...inputProps} />

                {/* @ts-expect-error ts-migrate(2769) FIXME: Property 'icon' does not exist on type 'IntrinsicA... Remove this comment to see the full error message */}
                <IconLayout icon={button} tooltip={false} />
            </span>
        );
    }

    render() {
        const {
            input,
            checked,
            defaultChecked,

            // <input> props
            disabled,
            onChange,

            // React props
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'className' does not exist on type 'Reado... Remove this comment to see the full error message
            className,
            children,
            ...otherProps
        } = this.props;

        const rootClassName = classNames(className, `${BEM.root}`);
        const inputProps = {
            checked,
            defaultChecked,
            disabled,
            onChange,
            ...input,
        };

        return (
            <div className={rootClassName} {...otherProps}>
                {this.renderSwitchButton(inputProps)}
                {children}
            </div>
        );
    }
}

// @ts-expect-error ts-migrate(4082) FIXME: Default export of the module has or is using priva... Remove this comment to see the full error message
export default rowComp({ defaultAlign: 'reverse' })(Switch);
export { Switch as PureSwitch };
