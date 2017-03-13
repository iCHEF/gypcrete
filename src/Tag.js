import React from 'react';
import classNames from 'classnames';
import './css/Tag.scss';

import icBEM from './utils/icBEM';

const COMPONENT_NAME = 'ic-tag';
const ROOT_BEM = icBEM(COMPONENT_NAME);

function Tag({ className, children }) {
    const rootClass = classNames(`${ROOT_BEM}`, className);

    return <span className={rootClass}>{children}</span>;
}

export default Tag;
