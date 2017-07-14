// @flow
import React from 'react';
import classNames from 'classnames';
import type { ReactChildren } from 'react-flow-types';
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

export type Props = {
    left?: ReactChildren,
    center?: ReactChildren,
    right?: ReactChildren,
    className?: string, // eslint-disable-line react/require-default-props
};

function HeaderRow({
    left,
    center,
    right,
    // React props
    className,
    ...otherProps,
}: Props) {
    const rootClassName = classNames(
        BEM.root.toString(),
        className,
    );

    return (
        <div className={rootClassName} {...otherProps}>
            <div className={BEM.left}>{left}</div>
            <div className={BEM.center}>{center}</div>
            <div className={BEM.right}>{right}</div>
        </div>
    );
}

HeaderRow.defaultProps = {
    left: undefined,
    center: undefined,
    right: undefined,
};

export default HeaderRow;
