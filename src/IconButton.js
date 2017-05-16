import React from 'react';
import PropTypes from 'prop-types';
import EnhancedPropTypes from './utils/enhancedPropTypes';
import icBEM from './utils/icBEM';

import Button, { COMPONENT_NAME } from './Button';
import IconLayout from './IconLayout';

const rootClass = icBEM(COMPONENT_NAME)
    .modifier('icon-only')
    .toString({ stripBlock: true });

/**
 * color & solid props are not invalid in <IconButton>
 */
function IconButton({ icon, color, solid, ...buttonProps }) {
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
    color: EnhancedPropTypes.empty,
    solid: EnhancedPropTypes.empty
};

IconButton.defaultProps = {
    color: undefined,
    solid: undefined
};

export default IconButton;
