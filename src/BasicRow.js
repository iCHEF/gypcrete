// @flow
import React from 'react';
import PropTypes from 'prop-types';
import type { ReactChildren } from 'react-flow-types';

import FlexCell from './FlexCell';
import Tag from './Tag';
import TextEllipsis from './TextEllipsis';

import wrapIfNotElement from './utils/wrapIfNotElement';

export type Props = {
    basic?: ReactChildren,
    tag?: ReactChildren,
    statusIcon?: ReactChildren,
    children?: ReactChildren, // eslint-disable-line react/require-default-props
};

function BasicRow({ basic, tag, statusIcon, children, ...otherProps }: Props) {
    if (!basic) {
        return null;
    }

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
