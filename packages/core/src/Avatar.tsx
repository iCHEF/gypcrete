import React, { HTMLAttributes } from 'react';
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

export interface AvatarPropTypes extends HTMLAttributes<HTMLDivElement> {
    src: string,
    alt: string,
    type?: typeof SQUARE | typeof ROUNDED | typeof CIRCLE
}

const Avatar: React.FunctionComponent<AvatarPropTypes> = ({
    className,
    src,
    alt,
    type = SQUARE,
    ...otherProps
}) => {
    const bemClass = ROOT_BEM.modifier(type);

    const rootClassName = classNames(className, `${bemClass}`);

    return (
        <div className={rootClassName} {...otherProps}>
            <img alt={alt} src={src} />
        </div>
    );
};

Avatar.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    type: PropTypes.oneOf([SQUARE, ROUNDED, CIRCLE]),
};

Avatar.defaultProps = {
    type: SQUARE,
};

export default Avatar;
