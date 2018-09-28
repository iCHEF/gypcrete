import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './styles/HeaderRow.scss';

import prefixClass from './utils/prefixClass';
import icBEM from './utils/icBEM';

export const COMPONENT_NAME = prefixClass('header-row');
const ROOT_BEM = icBEM(COMPONENT_NAME);
export const BEM = {
    root: ROOT_BEM,
    left: ROOT_BEM.element('left'),
    center: ROOT_BEM.element('center'),
    right: ROOT_BEM.element('right'),
};

// --------------------
//  Helper Component
// --------------------

export function HeaderArea({ content, ...props }) {
    if (content === false) {
        return null;
    }
    return <div {...props}>{content}</div>;
}

HeaderArea.propTypes = {
    content: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.oneOf([false]),
    ]),
};

HeaderArea.defaultProps = {
    content: undefined,
};

// --------------------
//  Main Component
// --------------------

function HeaderRow({
    left,
    center,
    right,
    // React props
    className,
    children,
    ...otherProps,
}) {
    const rootClassName = classNames(
        BEM.root.toString(),
        className,
    );

    return (
        <div className={rootClassName} {...otherProps}>
            <HeaderArea content={left} className={BEM.left} />
            <HeaderArea content={center} className={BEM.center} />
            <HeaderArea content={right} className={BEM.right} />
            {children}
        </div>
    );
}

HeaderRow.propTypes = {
    left: HeaderArea.propTypes.content,
    center: HeaderArea.propTypes.content,
    right: HeaderArea.propTypes.content,
};

HeaderRow.defaultProps = {
    left: undefined,
    center: undefined,
    right: undefined,
};

export default HeaderRow;
