import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import prefixClass from './utils/prefixClass';
import icBEM from './utils/icBEM';
import rowComp from './mixins/rowComp';
import './styles/Switch.scss';

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
         * Use `input` to inject props to the underlying <input>
         */
        input: PropTypes.object, // eslint-disable-line react/forbid-prop-types
        turnedOn: PropTypes.bool,
        defaultTurnedOn: PropTypes.bool,

        // <input type="checkbox" /> props
        disabled: PropTypes.bool,
        onChange: PropTypes.func,
    };

    static defaultProps = {
        input: {},
        turnedOn: undefined,
        defaultTurnedOn: undefined,

        disabled: false,
        onChange: undefined,
    };

    renderSwitchButton(inputProps = {}) {
        const button = <span className={BEM.button} />;

        return (
            <span className={BEM.iconWrapper}>
                <input
                    ref={(ref) => { this.inputRef = ref; }}
                    type="checkbox"
                    className={BEM.input}
                    {...inputProps} />

                <IconLayout icon={button} />
            </span>
        );
    }

    render() {
        const {
            input,
            turnedOn,
            defaultTurnedOn,

            // <input> props
            disabled,
            onChange,

            // React props
            className,
            children,
        } = this.props;

        const rootClassName = classNames(className, `${BEM.root}`);
        const inputProps = {
            checked: turnedOn,
            defaultChecked: defaultTurnedOn,
            disabled,
            onChange,
            ...input,
        };

        return (
            <div className={rootClassName}>
                {this.renderSwitchButton(inputProps)}
                {children}
            </div>
        );
    }
}

export default rowComp({ defaultAlign: 'reverse' })(Switch);
