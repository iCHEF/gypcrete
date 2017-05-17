import React from 'react';
import PropTypes from 'prop-types';

import FlexCell from './FlexCell';
import Tag from './Tag';
import TextEllipsis from './TextEllipsis';

import wrapIfNotElement from './utils/wrapIfNotElement';

function BasicRow({ basic, tag, statusIcon, children, ...otherProps }) {
    return (
        <div {...otherProps}>
            <FlexCell shrink>
                <TextEllipsis>{basic}</TextEllipsis>
            </FlexCell>

            {tag && wrapIfNotElement(tag, { with: Tag })}
            {statusIcon && wrapIfNotElement(statusIcon, { with: 'span' })}
            {children}
        </div>
    );
}

BasicRow.propTypes = {
    basic: PropTypes.node.isRequired,
    tag: PropTypes.node,
    statusIcon: PropTypes.node,
};

BasicRow.defaultProps = {
    tag: null,
    statusIcon: null,
};

export default BasicRow;
