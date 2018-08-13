import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import icBEM from './utils/icBEM';
import prefixClass from './utils/prefixClass';
import './styles/Section.scss';

export const COMPONENT_NAME = prefixClass('section');
const ROOT_BEM = icBEM(COMPONENT_NAME);
export const BEM = {
    root: ROOT_BEM,
    title: ROOT_BEM.element('title'),
    body: ROOT_BEM.element('body'),
    desc: ROOT_BEM.element('desc'),
};

function Section({
    title,
    desc,
    // React props
    className,
    children,
}) {
    const bemClass = BEM.root;
    const rootClassName = classNames(bemClass.toString(), className);

    const titleArea = title && (
        <div className={BEM.title.toString()}>
            {title}
        </div>
    );

    const descArea = desc && (
        <div className={BEM.desc.toString()}>
            {desc}
        </div>
    );

    return (
        <div className={rootClassName}>
            {titleArea}
            <div className={BEM.body.toString()}>
                {children}
            </div>
            {descArea}
        </div>
    );
}

Section.propTypes = {
    title: PropTypes.node,
    desc: PropTypes.node,
};

Section.defaultProps = {
    title: undefined,
    desc: undefined,
};

export default Section;
