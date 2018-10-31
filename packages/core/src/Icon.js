import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import icBEM from './utils/icBEM';
import prefixClass from './utils/prefixClass';
import './styles/Icon.scss';

const COMPONENT_NAME = prefixClass('icon');
const ROOT_BEM = icBEM(COMPONENT_NAME);

const GRAY = 'gray';
const BLUE = 'blue';
const RED = 'red';
export const ICON_COLOR = { GRAY, BLUE, RED };

function Icon({
    type,
    color,
    large,
    spinning,
    className,
    ...otherProps
}) {
    let bemClass = ROOT_BEM
        .modifier('large', large)
        .modifier('spin', spinning);

    if (color) {
        bemClass = bemClass.modifier(color);
    }

    const rootClassName = classNames(
        className,
        bemClass.toString(),
        `gyp-icon-${type}`
    );

    return (
        <span
            className={rootClassName}
            role="presentation"
            {...otherProps} />
    );
}

Icon.propTypes = {
    type: PropTypes.string.isRequired,
    color: PropTypes.oneOf(Object.values(ICON_COLOR)),
    large: PropTypes.bool,
    spinning: PropTypes.bool,
};

Icon.defaultProps = {
    color: undefined,
    large: false,
    spinning: false,
};

export default Icon;
