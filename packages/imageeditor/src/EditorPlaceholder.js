import React from 'react';
import PropTypes from 'prop-types';

import { Icon } from '@ichef/gypcrete';

const PICTURE = 'picture';
const LOADING = 'loading';

function CenterIcon({ type, ...props }) {
    return (
        <Icon
            type={type}
            spinning={type === LOADING}
            {...props} />
    );
}
CenterIcon.propTypes = {
    type: PropTypes.string.isRequired,
};

function EditorPlaceholder({
    canvasHeight,
    loading,
    ...wrapperProps,
}) {
    const wrapperStyle = {
        height: canvasHeight,
    };

    const iconType = loading ? LOADING : PICTURE;
    const iconStyle = {
        // 8 for total border size (4+4)
        fontSize: Math.min(canvasHeight - 8, 96),
    };

    return (
        <div style={wrapperStyle} {...wrapperProps}>
            <CenterIcon
                type={iconType}
                style={iconStyle} />
        </div>
    );
}

EditorPlaceholder.propTypes = {
    canvasHeight: PropTypes.number.isRequired,
    loading: PropTypes.bool,
};

EditorPlaceholder.defaultProps = {
    loading: false,
};

export default EditorPlaceholder;
