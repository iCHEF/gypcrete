import React from 'react';
import classNames from 'classnames';

import icBEM from './utils/icBEM';
import prefixClass from './utils/prefixClass';

import anchored, {
    anchoredPropTypes,
    ANCHORED_PLACEMENT,
} from './mixins/anchored';
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

type OwnProps = {
    placement?: any; // TODO: anchoredPropTypes.placement
    arrowStyle?: any; // TODO: anchoredPropTypes.arrowStyle
    nodeRef?: React.ReactNode;
};

type Props = OwnProps & typeof Tooltip.defaultProps;

function Tooltip({
// from anchored()
    placement, arrowStyle, nodeRef,
    // React props
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'className' does not exist on type 'Props... Remove this comment to see the full error message
    className, children, ...otherProps
}: Props) {
    const bemClass = BEM.root.modifier(placement);
    const rootClassName = classNames(className, `${bemClass}`);

    return (
        <span className={rootClassName} ref={nodeRef} {...otherProps}>
            {children}
            {/* @ts-expect-error ts-migrate(2322) FIXME: Type 'BEMFactory' is not assignable to type 'strin... Remove this comment to see the full error message */}
            <span className={BEM.arrow} style={arrowStyle} />
        </span>
    );
}

Tooltip.defaultProps = {
    placement: TOP,
    arrowStyle: {},
    nodeRef: undefined,
};

export { Tooltip as PureTooltip };

// @ts-expect-error ts-migrate(4082) FIXME: Default export of the module has or is using priva... Remove this comment to see the full error message
export default renderToLayer(
    anchored({
        defaultPlacement: ANCHORED_PLACEMENT.TOP,
        edgePadding: 3,
    })(Tooltip)
);
