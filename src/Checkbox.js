import React, { PureComponent } from 'react';
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
    renderCheckboxInput() {
        return (
            <span className={BEM.iconWrapper}>
                <input
                    ref={(ref) => { this.inputRef = ref; }}
                    type="checkbox"
                    className={BEM.input}
                    checked={undefined /* #TODO */}
                    defaultChecked={undefined /* #TODO */}
                    onChange={null /* #TODO */}
                    disabled={false /* #TODO */} />
                <Icon type="empty" className={`${BEM.button}`} />
            </span>
        );
    }

    render() {
        const { className, children, ...otherProps } = this.props;
        const rootClassName = classNames(className, COMPONENT_NAME);

        return (
            <div className={rootClassName} {...otherProps}>
                <RowCompBody>
                    {this.renderCheckboxInput()}
                    {children}
                </RowCompBody>
            </div>
        );
    }
}

export default rowComp()(Checkbox);
export { Checkbox as PureCheckbox };
