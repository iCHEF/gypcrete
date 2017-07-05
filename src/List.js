// @flow
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import type { ReactChildren } from 'react-flow-types';
import './styles/List.scss';

import prefixClass from './utils/prefixClass';
import icBEM from './utils/icBEM';

export const COMPONENT_NAME = prefixClass('list');
const ROOT_BEM = icBEM(COMPONENT_NAME);

const NORMAL = 'normal';
const SETTING = 'setting';
const BUTTON = 'button';
const LIST_VARIANTS = [NORMAL, SETTING, BUTTON];

export type Props = {
    variant: typeof NORMAL | typeof SETTING | typeof BUTTON,

    /* eslint-disable react/require-default-props */
    className?: string,
    children?: ReactChildren,
    /* eslint-enable react/require-default-props */
};

function List({
    variant,
    // React props
    className,
    children,
    ...otherProps,
}: Props) {
    const bemClass = ROOT_BEM.modifier(variant);
    const rootClassName = classNames(bemClass.toString(), className);

    return (
        <ul className={rootClassName} {...otherProps}>
            {children}
        </ul>
    );
}

List.propTypes = {
    variant: PropTypes.oneOf(Object.values(LIST_VARIANTS)),
};

List.defaultProps = {
    variant: NORMAL,
};

export default List;
