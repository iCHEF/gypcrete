import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import ColumnView from './ColumnView';
import HeaderRow from './HeaderRow';
import Overlay from './Overlay';
import TextLabel from './TextLabel';

import icBEM from './utils/icBEM';
import prefixClass from './utils/prefixClass';
import wrapIfNotElement from './utils/wrapIfNotElement';
import renderToLayer from './mixins/renderToLayer';

import './styles/_animations.scss';
import './styles/Modal.scss';

export const MODAL_SIZE = ['small', 'large', 'full'];

export const COMPONENT_NAME = prefixClass('modal');
const ROOT_BEM = icBEM(COMPONENT_NAME);
export const BEM = {
    root: ROOT_BEM,
    container: ROOT_BEM.element('container'),
};

function DefaultHeader({ title }) {
    const label = <TextLabel align="center" basic={title} />;

    return <HeaderRow center={label} />;
}

DefaultHeader.propTypes = {
    title: PropTypes.string.isRequired,
};

class Modal extends PureComponent {
    static propTypes = {
        header: PropTypes.node,
        onClose: PropTypes.func,
        centered: PropTypes.bool,
        // <ColumnView> props
        flexBody: ColumnView.propTypes.flexBody,
        bodyPadding: ColumnView.propTypes.bodyPadding,
    };

    static defaultProps = {
        header: undefined,
        onClose: () => {},
        centered: false,
        // <ColumnView> props
        flexBody: ColumnView.defaultProps.flexBody,
        bodyPadding: ColumnView.defaultProps.bodyPadding,
    };

    handleOverlayClick = (event) => {
        const { onClose } = this.props;
        // Prevent onClick events being propagated to outer modals
        event.stopPropagation();
        onClose();
    }

    render() {
        const {
            header,
            centered,
            // <ColumnView> props
            flexBody,
            bodyPadding,
            // React props
            className,
            children,
        } = this.props;

        const rootBem = BEM.root
            .modifier('centered', centered)
            .toString();

        const rootClassName = classNames(rootBem, className);

        const headerRow = header && wrapIfNotElement(header, {
            with: DefaultHeader,
            via: 'title',
        });

        return (
            <div className={rootClassName}>
                <Overlay onClick={this.handleOverlayClick} />

                <ColumnView
                    header={headerRow}
                    className={`${BEM.container}`}
                    flexBody={flexBody}
                    bodyPadding={bodyPadding}
                >
                    {children}
                </ColumnView>
            </div>
        );
    }
}

export { Modal as PureModal };
export default renderToLayer(Modal);
