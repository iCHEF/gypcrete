import React from 'react';
import PropTypes from 'prop-types';

import icBEM from './utils/icBEM';

import Button, { COMPONENT_NAME } from './Button';
import IconLayout from './IconLayout';

const rootClass = icBEM(COMPONENT_NAME)
    .modifier('icon-only')
    .toString({ stripBlock: true });

function IconButton({ icon, ...otherProps }) {
    return (
        <Button className={rootClass} {...otherProps}>
            <IconLayout icon={icon} />
        </Button>
    );
}

IconButton.propTypes = {
    icon: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element
    ]).isRequired,
};

export default IconButton;
