import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './styles/Avatar.scss';

import icBEM from './utils/icBEM';
import prefixClass from './utils/prefixClass';

const COMPONENT_NAME = prefixClass('avatar');
const ROOT_BEM = icBEM(COMPONENT_NAME);

const SQUARE = 'square';
const ROUNDED = 'rounded';
const CIRCLE = 'circle';
export const AVATAR_TYPE = { SQUARE, ROUNDED, CIRCLE };
const AVATAR_TYPE_ARRAY = [SQUARE, ROUNDED, CIRCLE];

function Avatar({
    className,
    src,
    alt,
    type,
    ...otherProps
}) {
    const bemClass = ROOT_BEM.modifier(type);

    const rootClassName = classNames(className, `${bemClass}`);

    return (
        <div className={rootClassName} {...otherProps}>
            <img alt={alt} src={src} />
        </div>
    );
}

Avatar.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    type: PropTypes.oneOf(AVATAR_TYPE_ARRAY),
};

Avatar.defaultProps = {
    type: SQUARE,
};

export default Avatar;
