import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import prefixClass from './utils/prefixClass';
import icBEM from './utils/icBEM';
import rowComp from './mixins/rowComp';
import './styles/Checkbox.scss';

import Icon from './Icon';

export const COMPONENT_NAME = prefixClass('checkbox');
const ROOT_BEM = icBEM(COMPONENT_NAME);
export const BEM = {
    root: ROOT_BEM,
    input: ROOT_BEM.element('input'),
    button: ROOT_BEM.element('button'),
    iconWrapper: ROOT_BEM.element('icon-wrapper'),
};

export const CHECKBOX_BUTTON = <Icon type="empty" className={`${BEM.button}`} />;

class Checkbox extends PureComponent {
    static propTypes = {
        /**
         * Use this to inject props to the underlying `<input />`
         */
        input: PropTypes.object, // eslint-disable-line react/forbid-prop-types
        indeterminate: PropTypes.bool,
        overrideButton: PropTypes.element,

        // <input type="checkbox" /> props
        checked: PropTypes.bool,
        defaultChecked: PropTypes.bool,
        disabled: PropTypes.bool,
        onChange: PropTypes.func,
    };

    static defaultProps = {
        input: {},
        indeterminate: false,
        overrideButton: null,

        checked: undefined,
        defaultChecked: undefined,
        disabled: false,
        onChange: undefined
    };

    componentDidMount() {
        this.updateInputIndeterminate();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.indeterminate !== this.props.indeterminate) {
            this.updateInputIndeterminate();
        }
    }

    getInputRef() {
        return this.inputRef;
    }

    updateInputIndeterminate() {
        const inputNode = this.getInputRef();
        inputNode.indeterminate = this.props.indeterminate;
    }

    renderCheckboxInput(inputProps, overrideButton) {
        return (
            <span className={BEM.iconWrapper}>
                <input
                    ref={(ref) => { this.inputRef = ref; }}
                    type="checkbox"
                    className={BEM.input}
                    {...inputProps} />

                {overrideButton || CHECKBOX_BUTTON}
            </span>
        );
    }

    render() {
        const {
            input,
            indeterminate,
            overrideButton,
            // <input> props
            checked,
            defaultChecked,
            disabled,
            onChange,
            // React props
            className,
            children,
            ...otherProps
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
                {this.renderCheckboxInput(inputProps, overrideButton)}
                {children}
            </div>
        );
    }
}

export default rowComp()(Checkbox);
export { Checkbox as PureCheckbox };
