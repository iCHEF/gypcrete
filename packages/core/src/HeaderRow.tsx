import React from 'react';
import classNames from 'classnames';
import './styles/HeaderRow.scss';

import prefixClass from './utils/prefixClass';
import icBEM from './utils/icBEM';

export const COMPONENT_NAME = prefixClass('header-row');
const ROOT_BEM = icBEM(COMPONENT_NAME);
export const BEM = {
    root: ROOT_BEM,
    left: ROOT_BEM.element('left'),
    center: ROOT_BEM.element('center'),
    right: ROOT_BEM.element('right'),
};

type OwnHeaderAreaProps = {
    content?: React.ReactNode | any; // TODO: PropTypes.oneOf([false])
};

type HeaderAreaProps = OwnHeaderAreaProps & typeof HeaderArea.defaultProps;

// --------------------
//  Helper Component
// --------------------

export function HeaderArea({ content, ...props }: HeaderAreaProps) {
    if (content === false) {
        return null;
    }
    return <div {...props}>{content}</div>;
}

HeaderArea.defaultProps = {
    content: undefined,
};

type OwnHeaderRowProps = {
    left?: any; // TODO: HeaderArea.propTypes.content
    center?: any; // TODO: HeaderArea.propTypes.content
    right?: any; // TODO: HeaderArea.propTypes.content
};

type HeaderRowProps = OwnHeaderRowProps & typeof HeaderRow.defaultProps;

// --------------------
//  Main Component
// --------------------

function HeaderRow({
    left, center, right,
    // React props
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'className' does not exist on type 'Heade... Remove this comment to see the full error message
    className, children, ...otherProps
}: HeaderRowProps) {
    const rootClassName = classNames(
        BEM.root.toString(),
        className,
    );

    return (
        <div className={rootClassName} {...otherProps}>
            {/* @ts-expect-error ts-migrate(2322) FIXME: Property 'className' does not exist on type 'Intri... Remove this comment to see the full error message */}
            <HeaderArea content={left} className={BEM.left} />
            {/* @ts-expect-error ts-migrate(2322) FIXME: Property 'className' does not exist on type 'Intri... Remove this comment to see the full error message */}
            <HeaderArea content={center} className={BEM.center} />
            {/* @ts-expect-error ts-migrate(2322) FIXME: Property 'className' does not exist on type 'Intri... Remove this comment to see the full error message */}
            <HeaderArea content={right} className={BEM.right} />
            {children}
        </div>
    );
}

HeaderRow.defaultProps = {
    left: undefined,
    center: undefined,
    right: undefined,
};

export default HeaderRow;
