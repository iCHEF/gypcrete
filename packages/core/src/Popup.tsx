import React, { useMemo, isValidElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import icBEM from './utils/icBEM';
import prefixClass from './utils/prefixClass';
import wrapIfNotElement from './utils/wrapIfNotElement';

import renderToLayer from './mixins/renderToLayer';

import Icon from './Icon';
import Overlay from './Overlay';

import './styles/_animations.scss';
import './styles/Popup.scss';

export const BUTTONS_DIRECTION = {
    VERTICAL: 'vertical',
    HORIZONTAL: 'horizontal',
};

export const COMPONENT_NAME = prefixClass('popup');
const ROOT_BEM = icBEM(COMPONENT_NAME);
export const BEM = {
    root: ROOT_BEM,
    container: ROOT_BEM.element('container'),
    body: ROOT_BEM.element('body'),
    messageWrapper: ROOT_BEM.element('message-wrapper'),
    messageTitle: ROOT_BEM.element('message-title'),
    messageDesc: ROOT_BEM.element('message-desc'),
    button: ROOT_BEM.element('button'),
    buttonsGroup: ROOT_BEM.element('buttons-group')
};

type PopupIconProps = {
    type: string;
};

export function PopupIcon({ type }: PopupIconProps) {
    return <Icon large type={type} />;
}

type OwnPopupMessageProps = {
    title?: string;
    desc: string;
    bottomArea?: React.ReactNode;
};

type PopupMessageProps = OwnPopupMessageProps & typeof PopupMessage.defaultProps;

export function PopupMessage({ title, desc, bottomArea }: PopupMessageProps) {
    return (
        // @ts-expect-error ts-migrate(2322) FIXME: Type 'BEMFactory' is not assignable to type 'strin... Remove this comment to see the full error message
        <div className={BEM.messageWrapper}>
            {title && (
                // @ts-expect-error ts-migrate(2322) FIXME: Type 'BEMFactory' is not assignable to type 'strin... Remove this comment to see the full error message
                <span className={BEM.messageTitle}>{title}</span>
            )}
            {desc && (
                // @ts-expect-error ts-migrate(2322) FIXME: Type 'BEMFactory' is not assignable to type 'strin... Remove this comment to see the full error message
                <span className={BEM.messageDesc}>{desc}</span>
            )}
            {bottomArea}
        </div>
    );
}
PopupMessage.defaultProps = {
    title: undefined,
    bottomArea: undefined,
};

/**
 * Render popup's buttons
 *
 * @param {Array} buttons
 * @param {'vertical'|'horizontal'} direction
 * @return {Array}
 */
function renderPopupButtons(buttons, direction) {
    if (!buttons || buttons.length === 0) {
        return null;
    }

    const wrapperClass = BEM.buttonsGroup
        .modifier(direction)
        .toString();

    return (
        <div className={wrapperClass}>
            {buttons}
        </div>
    );
}

type OwnPopupProps = {
    large?: boolean;
    // @ts-expect-error ts-migrate(2749) FIXME: 'StringOrElement' refers to a value, but is being ... Remove this comment to see the full error message
    icon?: StringOrElement;
    customMessageNode?: React.ReactNode;
    messageTitle?: string;
    messageDesc?: string;
    // @ts-expect-error ts-migrate(2749) FIXME: 'StringOrElement' refers to a value, but is being ... Remove this comment to see the full error message
    message?: StringOrElement;
    messageBottomArea?: React.ReactNode;
    buttons?: React.ReactElement[];
    buttonsDirection?: any; // TODO: PropTypes.oneOf(Object.values(BUTTONS_DIRECTION))
};

type PopupProps = OwnPopupProps & typeof Popup.defaultProps;

function Popup({
    large, icon,
    // message area props
    customMessageNode, messageTitle, messageDesc, messageBottomArea,
    // message is a legacy prop, should be deprecated in future,
    //   use `messageDesc` instead for string message,
    //   use `customMessageNode` instead for node message
    message,
    // button props
    buttons, buttonsDirection,
    // React props
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'className' does not exist on type 'Popup... Remove this comment to see the full error message
    className, children, ...popupProps
}: PopupProps) {
    const rootClassName = classNames(BEM.root.modifier('large', large).toString(), className);

    const messageArea = useMemo(
        () => {
            if (customMessageNode) {
                return customMessageNode;
            }

            // support for legacy node type `message` prop
            if (message && isValidElement(message)) {
                return message;
            }

            return (
                <PopupMessage
                    // support for legacy string type `message` prop
                    title={messageTitle || message}
                    desc={messageDesc}
                    bottomArea={messageBottomArea} />
            );
        },
        [message, customMessageNode, messageTitle, messageDesc, messageBottomArea]
    );

    return (
        <div className={rootClassName} {...popupProps}>
            <Overlay />

            {/* @ts-expect-error ts-migrate(2322) FIXME: Type 'BEMFactory' is not assignable to type 'strin... Remove this comment to see the full error message */}
            <div className={BEM.container}>
                {/* @ts-expect-error ts-migrate(2322) FIXME: Type 'BEMFactory' is not assignable to type 'strin... Remove this comment to see the full error message */}
                <div className={BEM.body}>
                    {icon && wrapIfNotElement(icon, { with: PopupIcon, via: 'type' })}
                    {messageArea}
                </div>

                {renderPopupButtons(buttons, buttonsDirection)}
                {children}
            </div>
        </div>
    );
}

const StringOrElement = PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
]);

Popup.defaultProps = {
    large: false,
    icon: null,
    customMessageNode: undefined,
    messageTitle: undefined,
    messageDesc: undefined,
    message: null,
    messageBottomArea: undefined,
    buttons: [],
    buttonsDirection: BUTTONS_DIRECTION.VERTICAL,
};

// export for tests
export { Popup as PurePopup };
// @ts-expect-error ts-migrate(4082) FIXME: Default export of the module has or is using priva... Remove this comment to see the full error message
export default renderToLayer(Popup);
