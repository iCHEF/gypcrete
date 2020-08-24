import React from 'react';
import classNames from 'classnames';
import './styles/ColumnView.scss';

import prefixClass from './utils/prefixClass';
import icBEM from './utils/icBEM';

export const COMPONENT_NAME = prefixClass('column-view');
const ROOT_BEM = icBEM(COMPONENT_NAME);
export const BEM = {
    root: ROOT_BEM,
    header: ROOT_BEM.element('header'),
    body: ROOT_BEM.element('body'),
    footer: ROOT_BEM.element('footer'),
};

type OwnProps = {
    header?: React.ReactNode;
    footer?: React.ReactNode;
    flexBody?: boolean;
    bodyPadding?: {
        top?: number;
        bottom?: number;
        left?: number;
        right?: number;
    };
};

type Props = OwnProps & typeof ColumnView.defaultProps;

function ColumnView({
    header, footer, flexBody, bodyPadding,
    // React props
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'className' does not exist on type 'Props... Remove this comment to see the full error message
    className, children, ...wrapperProps
}: Props) {
    const rootClassName = classNames(`${BEM.root}`, className);
    const bodyClassName = BEM.body.modifier('flex', flexBody);

    const bodyStyle = {
        paddingTop: bodyPadding.top,
        paddingBottom: bodyPadding.bottom,
        paddingLeft: bodyPadding.left,
        paddingRight: bodyPadding.right,
    };

    return (
        <div className={rootClassName} {...wrapperProps}>
            {header && (
                <div className={`${BEM.header}`}>
                    {header}
                </div>
            )}

            <div className={`${bodyClassName}`} style={bodyStyle}>
                {children}
            </div>

            {footer && (
                <div className={`${BEM.footer}`}>
                    {footer}
                </div>
            )}
        </div>
    );
}

ColumnView.defaultProps = {
    header: undefined,
    footer: undefined,
    flexBody: false,
    bodyPadding: { bottom: 24 },
};

export default ColumnView;
