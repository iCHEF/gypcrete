import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './styles/Avatar.scss';

import icBEM from './utils/icBEM';
import prefixClass from './utils/prefixClass';

const COMPONENT_NAME = prefixClass('avatar');
const ROOT_BEM = icBEM(COMPONENT_NAME);

function Avatar({ className, src, alt }) {
    const rootClass = classNames(`${ROOT_BEM.toString()}`, className);

    return (
        <div className={rootClass}>
            <img alt={alt} src={src} />
        </div>
    );
}

Avatar.propTypes = {
    src: PropTypes.bool.isRequired,
    alt: PropTypes.bool.isRequired,
};

export default Avatar;
