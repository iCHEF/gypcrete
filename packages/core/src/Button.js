import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import icBEM from './utils/icBEM';
import prefixClass from './utils/prefixClass';
import rowComp from './mixins/rowComp';
import './styles/Button.scss';

export const COMPONENT_NAME = prefixClass('button');
const ROOT_BEM = icBEM(COMPONENT_NAME);

const BLUE = 'blue';
const RED = 'red';
const WHITE = 'white';
const BLACK = 'black';
export const BUTTON_COLOR = { BLUE, RED, WHITE, BLACK };

function Button({
    color,
    solid,
    tagName: ButtonTag,
    // React props
    className,
    children,
    ...otherProps,
}) {
    const bemClass = ROOT_BEM
        .modifier(color)
        .modifier('solid', solid);

    const rootClassName = classNames(className, `${bemClass}`);

    // #TODO: Restore wrapper to <button> after Safari 11 goes mainstream
    return (
        <ButtonTag className={rootClassName} {...otherProps}>
            {children}
        </ButtonTag>
    );
}

Button.propTypes = {
    color: PropTypes.oneOf(Object.values(BUTTON_COLOR)),
    solid: PropTypes.bool,
    tagName: PropTypes.oneOf(['button', 'a', 'div']),
};

Button.defaultProps = {
    color: BLACK,
    solid: false,
    tagName: 'div',
};

// export for tests
export { Button as PureButton };

const RowCompButton = rowComp({ defaultMinified: true })(Button);
RowCompButton.defaultProps.bold = true;

export default RowCompButton;
