import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import icBEM from './utils/icBEM';
import prefixClass from './utils/prefixClass';

import anchored from './mixins/anchored';
import closable from './mixins/closable';
import renderToLayer from './mixins/renderToLayer';

import './styles/Popover.scss';

const TOP = 'top';
const RIGHT = 'right';
const BOTTOM = 'bottom';
const LEFT = 'left';
export const POPOVER_PLACEMENT = { TOP, RIGHT, BOTTOM, LEFT };

export const COMPONENT_NAME = prefixClass('popover');
const ROOT_BEM = icBEM(COMPONENT_NAME);
export const BEM = {
    root: ROOT_BEM,
    arrow: ROOT_BEM.element('arrow'),
    container: ROOT_BEM.element('container'),
};

function Popover({
    placement,
    arrowStyle,
    // React props
    className,
    children,
    ...otherProps,
}) {
    const bemClass = BEM.root.modifier(placement);
    const rootClassName = classNames(bemClass.toString(), className);

    return (
        <div className={rootClassName} {...otherProps}>
            <span className={BEM.arrow} style={arrowStyle} />
            <div className={BEM.container}>
                {children}
            </div>
        </div>
    );
}

Popover.propTypes = {
    placement: PropTypes.oneOf(Object.values(POPOVER_PLACEMENT)),
    arrowStyle: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

Popover.defaultProps = {
    placement: BOTTOM,
    arrowStyle: {},
};

export const AnchoredPopover = renderToLayer(
    closable({
        onEscape: true,
        onAnyClick: true,
    })(
        anchored({ padding: 0 })(Popover)
    )
);

export default Popover;
