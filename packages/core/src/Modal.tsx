import React from 'react';
import classNames from 'classnames';
import memoize from 'memoize-one';

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

// -----------------
//  Helpers
// -----------------

const createHandleOverlayClick = memoize(
    onClose => (event) => {
        // Prevent onClick events being propagated to outer modals
        event.stopPropagation();
        onClose();
    }
);

type DefaultHeaderProps = {
    title: string;
};

// -----------------
//  Sub-component
// -----------------

export function DefaultHeader({ title }: DefaultHeaderProps) {
    const label = <TextLabel align="center" basic={title} />;

    return <HeaderRow center={label} />;
}

type OwnModalProps = {
    header?: React.ReactNode;
    centered?: boolean;
    onClose?: (...args: any[]) => any;
    flexBody?: any; // TODO: ColumnView.propTypes.flexBody
    bodyPadding?: any; // TODO: ColumnView.propTypes.bodyPadding
};

type ModalProps = OwnModalProps & typeof Modal.defaultProps;

// -----------------
//  Main Component
// -----------------

function Modal({
    header, centered, onClose,
    // <ColumnView> props
    flexBody, bodyPadding,
    // React props
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'className' does not exist on type 'Modal... Remove this comment to see the full error message
    className, children, ...wrapperProps
}: ModalProps) {
    const rootBem = BEM.root
        .modifier('centered', centered)
        .toString();

    const rootClassName = classNames(rootBem, className);

    const headerRow = header && wrapIfNotElement(header, {
        with: DefaultHeader,
        via: 'title',
    });

    const handleOverlayClick = createHandleOverlayClick(onClose);

    return (
        <div className={rootClassName} {...wrapperProps}>
            {/* @ts-expect-error ts-migrate(2769) FIXME: Property 'onClick' does not exist on type 'Intrins... Remove this comment to see the full error message */}
            <Overlay onClick={handleOverlayClick} />

            {/* @ts-expect-error ts-migrate(2322) FIXME: Property 'children' does not exist on type 'Intrin... Remove this comment to see the full error message */}
            <ColumnView
                header={headerRow}
                className={`${BEM.container}`}
                flexBody={flexBody}
                bodyPadding={bodyPadding}>
                {children}
            </ColumnView>
        </div>
    );
}

Modal.defaultProps = {
    header: undefined,
    centered: false,
    onClose: () => {},
    // <ColumnView> props
    flexBody: ColumnView.defaultProps.flexBody,
    bodyPadding: ColumnView.defaultProps.bodyPadding,
};

export { Modal as PureModal };
// @ts-expect-error ts-migrate(4082) FIXME: Default export of the module has or is using priva... Remove this comment to see the full error message
export default renderToLayer(Modal);
