import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import EnhancedPropTypes from './utils/enhancedPropTypes';
import icBEM from './utils/icBEM';

import Button, { COMPONENT_NAME } from './Button';
import IconLayout from './IconLayout';

/**
 * <IconButton>
 * ===
 *
 * `<IconButton>` is a variant of `<Button>`.
 *
 * However, `color` & `solid` props are invalid in `<IconButton>`
 */
function IconButton({
    icon,
    tinted,
    color,
    solid,
    // React props
    className,
    ...buttonProps
}) {
    const bemClass = icBEM(COMPONENT_NAME)
        .modifier('icon-only')
        .modifier('tinted', tinted)
        .toString({ stripBlock: true });

    const rootClass = classNames(bemClass, className);

    return (
        <Button className={rootClass} {...buttonProps}>
            <IconLayout icon={icon} />
        </Button>
    );
}

IconButton.propTypes = {
    icon: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element
    ]).isRequired,
    tinted: PropTypes.bool,
    color: EnhancedPropTypes.isEmpty,
    solid: EnhancedPropTypes.isEmpty,
};

IconButton.defaultProps = {
    tinted: false,
    color: undefined,
    solid: undefined,
};

export default IconButton;
