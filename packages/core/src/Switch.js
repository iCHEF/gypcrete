import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
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

class Switch extends PureComponent {
    static propTypes = {
        /**
         * Use `input` to inject props to the underlying `<input>`
         */
        input: PropTypes.object, // eslint-disable-line react/forbid-prop-types
        checked: PropTypes.bool,
        defaultChecked: PropTypes.bool,

        // <input type="checkbox" /> props
        disabled: PropTypes.bool,
        onChange: PropTypes.func,
    };

    static defaultProps = {
        input: {},
        checked: undefined,
        defaultChecked: undefined,

        disabled: false,
        onChange: undefined,
    };

    renderSwitchButton(inputProps) {
        const button = <SwitchIcon />;

        return (
            <span className={BEM.iconWrapper}>
                <input
                    ref={(ref) => { this.inputRef = ref; }}
                    type="checkbox"
                    className={BEM.input}
                    {...inputProps} />

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

export default rowComp({ defaultAlign: 'reverse' })(Switch);
export { Switch as PureSwitch };
