import React, {
    cloneElement,
    isValidElement,
    PureComponent
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
    }
    if (typeof header === 'string') {
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
        `${BEM.body.modifier('padding', bodyPadding)}`
    );
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
    header: undefined,
    bodyClassName: '',
    bodyPadding: false,
};

class Modal extends PureComponent {
    handleOverlayClick = (event) => {
        const { onClose } = this.props;
        // Prevent onClick events being propagated to outer modals
        event.stopPropagation();
        if (onClose) { onClose(); }
    }

    render() {
        const {
            size,
            header,
            bodyClassName,
            bodyPadding,
            onClose,
            // React props
            className,
            children,
        } = this.props;
        const bemClass = BEM.root.modifier(size);
        const rootClassName = classNames(bemClass.toString(), className);

        return (
            <article className={rootClassName}>
                <Overlay onClick={this.handleOverlayClick} />
                <ModalContent
                    header={header}
                    bodyClassName={bodyClassName}
                    bodyPadding={bodyPadding}
                    onClose={onClose}>
                    {children}
                </ModalContent>
            </article>
        );
    }
}

Modal.propTypes = {
    size: PropTypes.oneOf(MODAL_SIZE),
    onClose: PropTypes.func,
    header: ModalContent.propTypes.header,
    bodyClassName: ModalContent.propTypes.bodyClassName,
    bodyPadding: ModalContent.propTypes.bodyPadding,
};

Modal.defaultProps = {
    size: undefined,
    onClose: () => {},
    header: ModalContent.defaultProps.header,
    bodyClassName: ModalContent.defaultProps.bodyClassName,
    bodyPadding: ModalContent.defaultProps.bodyPadding,
};

export { Modal as PureModal };

export default renderToLayer(Modal);
