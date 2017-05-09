import React from 'react';
import PropTypes from 'prop-types';

const defaultBoxStyle = {
    boxShadow: '0 0 1px red',
    marginBottom: 15,
    position: 'relative',
};

function DebugBox({ width, height, children }) {
    const style = {
        ...defaultBoxStyle,
        width,
        height,
    };

    return (
        <div style={style}>
            {children}
        </div>
    );
}

DebugBox.propTypes = {
    width: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),
    height: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),
};

DebugBox.defaultProps = {
    width: '20rem',
    height: 'auto',
};

export default DebugBox;
