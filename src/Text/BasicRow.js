import React, { PropTypes } from 'react';

import FlexCell from '../FlexCell';
import Tag from '../Tag';
import TextEllipsis from '../TextEllipsis';

import wrapIfNotElement from '../utils/wrapIfNotElement';

function BasicRow({ basic, tag, stateIcon, ...otherProps }) {
    if (!basic) return null;

    return (
        <div {...otherProps}>
            <FlexCell shrink>
                <TextEllipsis>{basic}</TextEllipsis>
            </FlexCell>

            {tag && wrapIfNotElement(tag, { with: Tag })}
            {stateIcon && wrapIfNotElement(stateIcon, { with: 'span' })}
        </div>
    );
}

BasicRow.propTypes = {
    basic: PropTypes.node.isRequired,
    tag: PropTypes.node,
    stateIcon: PropTypes.node,
};

BasicRow.defaultProps = {
    basic: null,
    tag: null,
    stateIcon: null,
};

export default BasicRow;
