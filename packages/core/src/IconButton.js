import React from 'react';
import PropTypes from 'prop-types';
import EnhancedPropTypes from './utils/enhancedPropTypes';
import icBEM from './utils/icBEM';

import Button, { COMPONENT_NAME } from './Button';
import IconLayout from './IconLayout';

/**
 * color & solid props are not invalid in <IconButton>
 */
function IconButton({ icon, tinted, color, solid, ...buttonProps }) {
    const rootClass = icBEM(COMPONENT_NAME)
        .modifier('icon-only')
        .modifier('tinted', tinted)
        .toString({ stripBlock: true });

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
