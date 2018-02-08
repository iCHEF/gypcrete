import React, {
  isValidElement,
  cloneElement
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import icBEM from './utils/icBEM';
import prefixClass from './utils/prefixClass';

import anchored, { anchoredPropTypes, ANCHORED_PLACEMENT } from './mixins/anchored';
import closable from './mixins/closable';
import renderToLayer from './mixins/renderToLayer';
import Backdrop from './Backdrop';
import HeaderRow from './HeaderRow';

import './styles/Modal.scss';

export const MODAL_SIZE = ['small', 'large', 'full'];

export const COMPONENT_NAME = prefixClass('modal');
const ROOT_BEM = icBEM(COMPONENT_NAME);
export const BEM = {
    root: ROOT_BEM.modifier('active'),
    backdrop: ROOT_BEM.element('backdrop'),
    container: ROOT_BEM.element('container'),
    header: ROOT_BEM.element('header'),
    footer: ROOT_BEM.element('footer'),
    body: ROOT_BEM.element('body')
};

/**
 * Render Modal Header
 * If string, render <HeaderRow> with label
 * If element, render element with headerClassName
 *
 * @param  {String|Node|Any} header           - Title string or <HeaderRow>
 * @param  {String}          headerClassName  - Header className
 * @return {Node|Any}                         - Header Node or any
 */
function renderHeader(header, headerClassName) {
    if (isValidElement(header)) {
        return cloneElement(header, {
            className: headerClassName
        });
    } else if (typeof header === 'string') {
        return <HeaderRow label={header} />;
    }

    return header;
}

/**
 * Render Modal Footer
 * If element, render with footer className
 *
 * @param  {Node|Any} footer          - Footer node or any
 * @param  {String}   footerClassName - Footer className
 * @return {Node|Any}                 - Footer node or any
 */
function renderFooter(footer, footerClassName) {
    if (isValidElement(footer)) {
        return cloneElement(footer, {
            className: footerClassName
        });
    }

    return footer;
}


function Modal({
    // from anchored()
    placement,
    arrowStyle,
    // React props
    className,
    children,
    // Other props
    header,
    footer,
    size,
    bodyClassName,
    bodyPadding,
    ...otherProps,
}) {
    const bemClass = BEM.root.modifier(placement);
    const rootClassName = classNames(bemClass.toString(), className);

    return (
        <article className={rootClassName} {...otherProps}>
            <Backdrop className={BEM.backdrop} />
            <div className={BEM.container}>
                {renderHeader(header, `${BEM.header}`)}
                <div
                    className={classNames(
                          bodyClassName,
                          `${BEM.body.modifier('padding', bodyPadding)}`
                      )}>
                    {children}
                </div>
                {renderFooter(footer, `${BEM.footer}`)}
            </div>
        </article>
    );
}

Modal.propTypes = {
    ...anchoredPropTypes,
    header: PropTypes.node,
    footer: PropTypes.element,
    size: PropTypes.oneOf(MODAL_SIZE),
    bodyClassName: PropTypes.string,
    bodyPadding: PropTypes.bool,
};

Modal.defaultProps = {
    bodyPadding: false,
    placement: ANCHORED_PLACEMENT.BOTTOM,
};

export { Modal as PureModal };

export default renderToLayer(
    closable({
        onEscape: true,
        onClickOutside: true,
        onClickInside: true,
    })(
        anchored()(Modal)
    )
);
