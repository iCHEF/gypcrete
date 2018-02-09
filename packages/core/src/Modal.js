import React, {
  cloneElement,
  isValidElement
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Backdrop from './Backdrop';
import HeaderRow from './HeaderRow';
import closable from './mixins/closable';
import icBEM from './utils/icBEM';
import prefixClass from './utils/prefixClass';
import renderToLayer from './mixins/renderToLayer';

import './styles/Modal.scss';

export const MODAL_SIZE = ['small', 'large', 'full'];

export const COMPONENT_NAME = prefixClass('modal');
const ROOT_BEM = icBEM(COMPONENT_NAME);
export const BEM = {
    root: ROOT_BEM.modifier('active'),
    backdrop: ROOT_BEM.element('backdrop'),
    closable: ROOT_BEM.element('closable'),
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


const ModalContent = ({
    // React props
    children,
    // Other props
    header,
    footer,
    bodyClassName,
    bodyPadding,
}) => (
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
    );

ModalContent.propTypes = {
    header: PropTypes.node,
    footer: PropTypes.element,
    bodyClassName: PropTypes.string,
    bodyPadding: PropTypes.bool,
};

ModalContent.defaultProps = {
    bodyPadding: false,
};

const ClosableModalContent = closable({
    onEscape: true,
    onClickOutside: true,
    onClickInside: false,
})(ModalContent);


function Modal(props) {
    const {
        // React props
        className,
        // Other props
        size,
        ...otherProps,
    } = props;
    const rootClassName = classNames(BEM.root.toString(), className);

    return (
        <article className={classNames(rootClassName, `${BEM.root.modifier(size)}`)} {...otherProps}>
            <Backdrop className={BEM.backdrop} />
            <ClosableModalContent className={BEM.closable} {...props} />
        </article>
    );
}

Modal.propTypes = {
    size: PropTypes.oneOf(MODAL_SIZE),
};

export { Modal as PureModal };

export default renderToLayer(Modal);
