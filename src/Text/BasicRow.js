import React, { PropTypes } from 'react';

import FlexCell from '../FlexCell';
import Tag from '../Tag';
import TextEllipsis from '../TextEllipsis';

function wrapIfNotElement(content, { with: Wrapper }) {
    if (React.isValidElement(content)) {
        return content;
    }
    return <Wrapper>{content}</Wrapper>;
}

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
    basic: PropTypes.node,
    tag: PropTypes.node,
    stateIcon: PropTypes.node,
};

BasicRow.defaultProps = {
    basic: null,
    tag: null,
    stateIcon: null,
};

export default BasicRow;
