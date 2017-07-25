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
    primary,

    // React props
    className,
    children,
    ...otherProps,
}) {
    const bemClass = ROOT_BEM
        .modifier(color)
        .modifier('solid', solid)
        .modifier('primary', primary);

    const rootClassName = classNames(className, `${bemClass}`);

    return (
        <button type="button" className={rootClassName} {...otherProps}>
            {children}
        </button>
    );
}

Button.propTypes = {
    color: PropTypes.oneOf(Object.values(BUTTON_COLOR)),
    solid: PropTypes.bool,
    primary: PropTypes.bool,
};

Button.defaultProps = {
    color: BLUE,
    solid: false,
    primary: false,
};

// export for tests
export { Button as PureButton };

export default rowComp({ defaultMinified: true })(Button);
