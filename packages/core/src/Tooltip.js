import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import icBEM from './utils/icBEM';
import prefixClass from './utils/prefixClass';

import anchored, { ANCHORED_PLACEMENT } from './mixins/anchored';
import renderToLayer from './mixins/renderToLayer';
import './styles/Tooltip.scss';

export const COMPONENT_NAME = prefixClass('tooltip');
const ROOT_BEM = icBEM(COMPONENT_NAME);
const BEM = {
    root: ROOT_BEM,
    arrow: ROOT_BEM.element('arrow')
};

const TOP = 'top';
const BOTTOM = 'bottom';
export const TOOLTIP_PLACEMENT = { TOP, BOTTOM };

function Tooltip({
    placement,
    arrowStyle,
    // React props
    className,
    children,
    ...otherProps,
}) {
    const bemClass = BEM.root.modifier(placement);
    const rootClassName = classNames(className, `${bemClass}`);

    return (
        <span className={rootClassName} {...otherProps}>
            {children}
            <span className={BEM.arrow} style={arrowStyle} />
        </span>
    );
}

Tooltip.propTypes = {
    placement: PropTypes.oneOf(Object.values(TOOLTIP_PLACEMENT)),
    arrowStyle: PropTypes.objectOf(PropTypes.number),
};

Tooltip.defaultProps = {
    placement: TOP,
    arrowStyle: {},
};

export { Tooltip as PureTooltip };

export default renderToLayer(
    anchored({
        defaultPlacement: ANCHORED_PLACEMENT.TOP,
        edgePadding: 3,
    })(Tooltip)
);
