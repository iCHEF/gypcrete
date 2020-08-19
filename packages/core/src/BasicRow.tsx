import React, { HTMLAttributes } from 'react';
import PropTypes from 'prop-types';

import FlexCell from './FlexCell';
import Tag from './Tag';

import wrapIfNotElement from './utils/wrapIfNotElement';

export interface BasicRowProps extends HTMLAttributes<HTMLDivElement> {
    basic?: React.ReactNode,
    tag?: React.ReactNode,
    statusIcon?: React.ReactNode
}

const BasicRow: React.FunctionComponent<BasicRowProps> = ({
    basic,
    tag,
    statusIcon,
    children,
    ...otherProps
}) => {
    if (!basic) {
        return null;
    }

    return (
        <div {...otherProps}>
            <FlexCell shrink>{basic}</FlexCell>

            {tag && wrapIfNotElement(tag, { with: Tag })}
            {statusIcon && wrapIfNotElement(statusIcon, { with: 'span' })}
            {children}
        </div>
    );
};

BasicRow.propTypes = {
    basic: PropTypes.node,
    tag: PropTypes.node,
    statusIcon: PropTypes.node,
};

BasicRow.defaultProps = {
    basic: undefined,
    tag: undefined,
    statusIcon: undefined,
};

export default BasicRow;
