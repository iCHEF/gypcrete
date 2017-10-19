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
export const BEM = {
    root: ROOT_BEM,
    title: ROOT_BEM.element('title'),
    body: ROOT_BEM.element('body'),
    desc: ROOT_BEM.element('desc'),
};

const NORMAL = 'normal';
const SETTING = 'setting';
const BUTTON = 'button';
const LIST_VARIANTS = [NORMAL, SETTING, BUTTON];

export type Props = {
    variant: typeof NORMAL | typeof SETTING | typeof BUTTON,
    title?: string,
    desc?: ReactChildren,

    /* eslint-disable react/require-default-props */
    className?: string,
    children?: ReactChildren,
    /* eslint-enable react/require-default-props */
};

function List({
    variant,
    title,
    desc,
    // React props
    className,
    children,
    ...otherProps,
}: Props) {
    const bemClass = BEM.root.modifier(variant);
    const rootClassName = classNames(bemClass.toString(), className);

    const titleNode = <div className={BEM.title.toString()}>{title}</div>;
    const descNode = <div className={BEM.desc.toString()}>{desc}</div>;

    return (
        <div className={rootClassName} {...otherProps}>
            {title && titleNode}
            <ul className={BEM.body.toString()}>
                {children}
            </ul>
            {desc && descNode}
        </div>
    );
}

List.propTypes = {
    variant: PropTypes.oneOf(Object.values(LIST_VARIANTS)),
    title: PropTypes.string,
    desc: PropTypes.node,
};

List.defaultProps = {
    variant: NORMAL,
    title: undefined,
    desc: undefined,
};

export default List;
