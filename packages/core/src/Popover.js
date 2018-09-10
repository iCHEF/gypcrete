import React from 'react';
import classNames from 'classnames';

import ListSpacingContext from './contexts/listSpacing';

import icBEM from './utils/icBEM';
import prefixClass from './utils/prefixClass';

import anchored, { anchoredPropTypes, ANCHORED_PLACEMENT } from './mixins/anchored';
import closable from './mixins/closable';
import renderToLayer from './mixins/renderToLayer';

import './styles/Popover.scss';

export const COMPONENT_NAME = prefixClass('popover');
const ROOT_BEM = icBEM(COMPONENT_NAME);
export const BEM = {
    root: ROOT_BEM,
    arrow: ROOT_BEM.element('arrow'),
    container: ROOT_BEM.element('container'),
};

function Popover({
    // from anchored()
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
        <ListSpacingContext.Provider value={false}>
            <div className={rootClassName} {...otherProps}>
                <span className={BEM.arrow} style={arrowStyle} />
                <div className={BEM.container}>
                    {children}
                </div>
            </div>
        </ListSpacingContext.Provider>
    );
}

Popover.propTypes = {
    ...anchoredPropTypes,
    // placement
    // arrowStyle
};

Popover.defaultProps = {
    placement: ANCHORED_PLACEMENT.BOTTOM,
    arrowStyle: {},
};

export { Popover as PurePopover };

export default renderToLayer(
    closable({
        onEscape: true,
        onClickOutside: true,
        onClickInside: true,
    })(
        anchored()(Popover)
    )
);
