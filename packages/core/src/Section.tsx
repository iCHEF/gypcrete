import React from 'react';
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

type OwnProps = {
    title?: React.ReactNode;
    desc?: React.ReactNode;
    verticalSpacing?: boolean;
    bodySpacing?: boolean;
    titleSize?: 'base' | 'small';
};

type Props = OwnProps & typeof Section.defaultProps;

function Section({
    title, titleSize, desc, verticalSpacing, // add margin to above and below <Section>
    bodySpacing, // add padding to body for components that are not row-based
    // React props
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'className' does not exist on type 'Props... Remove this comment to see the full error message
    className, children, ...wrapperProps
}: Props) {
    // Class names
    const rootClassName = classNames(
        BEM.root
            .modifier('no-margin', !verticalSpacing)
            .toString(),
        className,
    );
    const bodyClassName = BEM.body
        .modifier('padded', bodySpacing)
        .toString();

    // Conditional parts
    const titleArea = title && (
        <div className={
            BEM.title
                .modifier(titleSize)
                .toString()
        }>
            {title}
        </div>
    );
    const descArea = desc && (
        <div className={BEM.desc.toString()}>
            {desc}
        </div>
    );

    return (
        <div className={rootClassName} {...wrapperProps}>
            {titleArea}
            <div className={bodyClassName}>
                {children}
            </div>
            {descArea}
        </div>
    );
}

Section.defaultProps = {
    title: undefined,
    desc: undefined,
    verticalSpacing: true,
    bodySpacing: true,
    titleSize: 'base',
};

export default Section;
