import React, {
  cloneElement,
  isValidElement
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Overlay from './Overlay';
import HeaderRow from './HeaderRow';
import TextLabel from './TextLabel';
import icBEM from './utils/icBEM';
import prefixClass from './utils/prefixClass';
import renderToLayer from './mixins/renderToLayer';

import './styles/Modal.scss';

export const MODAL_SIZE = ['small', 'large', 'full'];

export const COMPONENT_NAME = prefixClass('modal');
const ROOT_BEM = icBEM(COMPONENT_NAME);
export const BEM = {
    root: ROOT_BEM.modifier('active'),
    closable: ROOT_BEM.element('closable'),
    container: ROOT_BEM.element('container'),
    header: ROOT_BEM.element('header'),
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
        const label = <TextLabel align="center" basic={header} />;
        return <HeaderRow className={headerClassName} center={label} />;
    }

    return header;
}

export const ModalContent = ({
    header,
    bodyClassName,
    bodyPadding,
    // React props
    children,
}) => {
    const cNames = classNames(
                      bodyClassName,
                      `${BEM.body.modifier('padding', bodyPadding)}`);
    return (
        <div className={BEM.container}>
            {renderHeader(header, `${BEM.header}`)}
            <div
                className={cNames}>
                {children}
            </div>
        </div>
    );
};

ModalContent.propTypes = {
    header: PropTypes.node,
    bodyClassName: PropTypes.string,
    bodyPadding: PropTypes.bool,
};

ModalContent.defaultProps = {
    bodyPadding: false,
};

function Modal({
    size,
    header,
    bodyClassName,
    bodyPadding,
    onClose,
    // React props
    className,
    children,
}) {
    const bemClass = BEM.root.modifier(size);
    const rootClassName = classNames(bemClass.toString(), className);

    return (
        <article className={rootClassName}>
            <Overlay />
            <ModalContent
                className={BEM.closable}
                header={header} bodyClassName={bodyClassName}
                bodyPadding={bodyPadding} onClose={onClose}>
                {children}
            </ModalContent>
        </article>
    );
}

Modal.propTypes = {
    size: PropTypes.oneOf(MODAL_SIZE),
    header: PropTypes.node,
    bodyClassName: PropTypes.string,
    bodyPadding: PropTypes.bool,
    onClose: PropTypes.func,
};

export { Modal as PureModal };

export default renderToLayer(Modal);
