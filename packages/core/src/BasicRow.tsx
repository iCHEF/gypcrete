import React from 'react';
import PropTypes from 'prop-types';

import FlexCell from './FlexCell';
import Tag from './Tag';

import wrapIfNotElement from './utils/wrapIfNotElement';

type OwnProps = {
    basic?: React.ReactNode;
    tag?: React.ReactNode;
    statusIcon?: React.ReactNode;
};

type Props = OwnProps & typeof BasicRow.defaultProps;

// @ts-expect-error ts-migrate(2339) FIXME: Property 'children' does not exist on type 'Props'... Remove this comment to see the full error message
function BasicRow({ basic, tag, statusIcon, children, ...otherProps }: Props) {
    if (!basic) {
        return null;
    }

    return (
        <div {...otherProps}>
            {/* @ts-expect-error ts-migrate(2322) FIXME: Property 'children' does not exist on type 'Intrin... Remove this comment to see the full error message */}
            <FlexCell shrink>{basic}</FlexCell>

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
