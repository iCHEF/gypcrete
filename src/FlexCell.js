import React, { PropTypes } from 'react';

function FlexCell({ shrink, grow, basis, children }) {
    const flexStyles = {
        flexShrink: Number(shrink),
        flexGrow: Number(grow),
        flexBasis: basis,
    };

    return <div style={flexStyles}>{children}</div>;
}

FlexCell.propTypes = {
    shrink: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.number
    ]),
    grow: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.number
    ]),
    basis: PropTypes.string,
};

FlexCell.defaultProps = {
    shrink: false,
    grow: false,
    basis: 'auto',
};

export default FlexCell;
