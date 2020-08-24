import React from 'react';
import classNames from 'classnames';

import ListSpacingContext from './contexts/listSpacing';

import icBEM from './utils/icBEM';
import prefixClass from './utils/prefixClass';

import anchored, {
    anchoredPropTypes,
    ANCHORED_PLACEMENT,
} from './mixins/anchored';
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

type OwnProps = {
    onClick?: (...args: any[]) => any;
    placement?: any; // TODO: anchoredPropTypes.placement
    arrowStyle?: any; // TODO: anchoredPropTypes.arrowStyle
    nodeRef?: React.ReactNode;
    onInsideClick: (...args: any[]) => any;
};

type Props = OwnProps & typeof Popover.defaultProps;

function Popover({
    onClick,
    // from anchored()
    placement, arrowStyle, nodeRef,
    // from closable()
    onInsideClick,
    // React props
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'className' does not exist on type 'Props... Remove this comment to see the full error message
    className, children, ...otherProps
}: Props) {
    const bemClass = BEM.root.modifier(placement);
    const rootClassName = classNames(bemClass.toString(), className);

    const handleWrapperClick = (event) => {
        onInsideClick(event);
        onClick(event);
    };

    return (
        <ListSpacingContext.Provider value={false}>
            <div
                role="presentation"
                className={rootClassName}
                ref={nodeRef}
                onClick={handleWrapperClick}
                {...otherProps}>
                {/* @ts-expect-error ts-migrate(2322) FIXME: Type 'BEMFactory' is not assignable to type 'strin... Remove this comment to see the full error message */}
                <span className={BEM.arrow} style={arrowStyle} />
                {/* @ts-expect-error ts-migrate(2322) FIXME: Type 'BEMFactory' is not assignable to type 'strin... Remove this comment to see the full error message */}
                <div className={BEM.container}>
                    {children}
                </div>
            </div>
        </ListSpacingContext.Provider>
    );
}

Popover.defaultProps = {
    onClick: () => {},
    placement: ANCHORED_PLACEMENT.BOTTOM,
    arrowStyle: {},
    nodeRef: undefined,
};

export { Popover as PurePopover };

// @ts-expect-error ts-migrate(4082) FIXME: Default export of the module has or is using priva... Remove this comment to see the full error message
export default renderToLayer(
    closable({
        onEscape: true,
        onClickOutside: true,
        onClickInside: true,
    })(
        anchored()(Popover)
    )
);
