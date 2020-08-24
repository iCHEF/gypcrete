import React, { PureComponent } from 'react';
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

// @ts-expect-error ts-migrate(2322) FIXME: Property 'className' does not exist on type 'Intri... Remove this comment to see the full error message
export const CHECKBOX_BUTTON = <Icon type="empty" className={`${BEM.button}`} />;

type OwnProps = {
    input?: any;
    indeterminate?: boolean;
    overrideButton?: React.ReactElement;
    checked?: boolean;
    defaultChecked?: boolean;
    disabled?: boolean;
    onChange?: (...args: any[]) => any;
};

type Props = OwnProps & typeof Checkbox.defaultProps;

class Checkbox extends PureComponent<Props> {
    static defaultProps = {
        input: {},
        indeterminate: false,
        overrideButton: null,

        checked: undefined,
        defaultChecked: undefined,
        disabled: false,
        onChange: undefined
    };

    inputRef: any;

    componentDidMount() {
        this.updateInputIndeterminate();
    }

    componentDidUpdate(prevProps: Props) {
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
            // @ts-expect-error ts-migrate(2322) FIXME: Type 'BEMFactory' is not assignable to type 'strin... Remove this comment to see the full error message
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
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'className' does not exist on type 'Reado... Remove this comment to see the full error message
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

// @ts-expect-error ts-migrate(4082) FIXME: Default export of the module has or is using priva... Remove this comment to see the full error message
export default rowComp()(Checkbox);
export { Checkbox as PureCheckbox };
