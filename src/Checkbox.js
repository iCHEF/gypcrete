import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import prefixClass from './utils/prefixClass';
import icBEM from './utils/icBEM';
import rowComp from './mixins/rowComp';
import './styles/Checkbox.scss';

import Icon from './Icon';
import RowCompBody from './RowCompBody';

export const COMPONENT_NAME = prefixClass('checkbox');
const ROOT_BEM = icBEM(COMPONENT_NAME);
const BEM = {
    root: ROOT_BEM,
    input: ROOT_BEM.element('input'),
    button: ROOT_BEM.element('button'),
    iconWrapper: ROOT_BEM.element('icon-wrapper'),
};

class Checkbox extends PureComponent {
    static propTypes = {
        /**
         * Use `input` to inject props to the underlying <input>
         */
        input: PropTypes.object, // eslint-disable-line react/forbid-prop-types

        // <input type="checkbox" /> props
        checked: PropTypes.bool,
        defaultChecked: PropTypes.bool,
        disabled: PropTypes.bool,
        onChange: PropTypes.func,
    };

    static defaultProps = {
        input: {},

        checked: undefined,
        defaultChecked: undefined,
        disabled: false,
        onChange: undefined
    };

    renderCheckboxInput(inputProps) {
        return (
            <span className={BEM.iconWrapper}>
                <input
                    ref={(ref) => { this.inputRef = ref; }}
                    type="checkbox"
                    className={BEM.input}
                    {...inputProps} />

                <Icon type="empty" className={`${BEM.button}`} />
            </span>
        );
    }

    render() {
        const {
            input,
            // <input> props
            checked,
            defaultChecked,
            disabled,
            onChange,
            // React props
            className,
            children,
            ...otherProps,
        } = this.props;

        const inputProps = {
            checked,
            defaultChecked,
            disabled,
            onChange,
            ...input,
        };

        const rootClassName = classNames(className, COMPONENT_NAME);

        return (
            <div className={rootClassName} {...otherProps}>
                <RowCompBody>
                    {this.renderCheckboxInput(inputProps)}
                    {children}
                </RowCompBody>
            </div>
        );
    }
}

export default rowComp()(Checkbox);
export { Checkbox as PureCheckbox };
