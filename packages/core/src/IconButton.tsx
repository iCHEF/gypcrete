import React from 'react';
import classNames from 'classnames';

import EnhancedPropTypes from './utils/enhancedPropTypes';
import icBEM from './utils/icBEM';

import Button, { COMPONENT_NAME } from './Button';
import IconLayout from './IconLayout';

type OwnProps = {
    icon: string | React.ReactElement;
    tinted?: boolean;
    color?: any; // TODO: EnhancedPropTypes.isEmpty
    solid?: any; // TODO: EnhancedPropTypes.isEmpty
};

type Props = OwnProps & typeof IconButton.defaultProps;

/**
 * <IconButton>
 * ===
 *
 * `<IconButton>` is a variant of `<Button>`.
 *
 * However, `color` & `solid` props are invalid in `<IconButton>`
 */
function IconButton({
    icon, tinted, color, solid,
    // React props
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'className' does not exist on type 'Props... Remove this comment to see the full error message
    className, ...buttonProps
}: Props) {
    const bemClass = icBEM(COMPONENT_NAME)
        .modifier('icon-only')
        .modifier('tinted', tinted)
        .toString({ stripBlock: true });

    const rootClass = classNames(bemClass, className);

    return (
        // @ts-expect-error ts-migrate(2769) FIXME: Property 'className' does not exist on type 'Intri... Remove this comment to see the full error message
        <Button className={rootClass} {...buttonProps}>
            {/* @ts-expect-error ts-migrate(2769) FIXME: Property 'icon' does not exist on type 'IntrinsicA... Remove this comment to see the full error message */}
            <IconLayout icon={icon} />
        </Button>
    );
}

IconButton.defaultProps = {
    tinted: false,
    color: undefined,
    solid: undefined,
};

export default IconButton;
