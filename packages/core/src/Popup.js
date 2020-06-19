import React, { isValidElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import icBEM from './utils/icBEM';
import prefixClass from './utils/prefixClass';
import wrapIfNotElement from './utils/wrapIfNotElement';

import renderToLayer from './mixins/renderToLayer';

import PopupButton from './PopupButton';

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

export function PopupIcon({ type }) {
    return <Icon large type={type} />;
}
PopupIcon.propTypes = {
    type: PropTypes.string.isRequired,
};

export function PopupMessage({ title, desc, bottomArea }) {
    return (
        <div className={BEM.messageWrapper}>
            {title && (
                <span className={BEM.messageTitle}>{title}</span>
            )}
            <span className={BEM.messageDesc}>{desc}</span>
            {bottomArea}
        </div>
    );
}
PopupMessage.propTypes = {
    title: PropTypes.string,
    desc: PropTypes.string.isRequired,
    bottomArea: PropTypes.node,
};
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

    /**
     * `<Popup>` expects an array of pre-configured `<PopupButton>`s.
     * This transforms `<Button>` into `<PopupButton>` for compatibility.
     *
     * Should remove in v2 release.
     * @deprecated
     */
    const popupButtons = buttons.map((button) => {
        if (button.type === PopupButton) {
            return button;
        }
        return (
            <PopupButton
                key={button.key}
                {...button.props} />
        );
    });

    const wrapperClass = BEM.buttonsGroup
        .modifier(direction)
        .toString();

    return (
        <div className={wrapperClass}>
            {popupButtons}
        </div>
    );
}

function Popup({
    icon,

    // message area props
    messageArea,
    messageTitle,
    messageDesc,
    messageBottomArea,
    // message is a legacy prop, should be deprecated in future,
    //   use `messageDesc` instead for string message,
    //   use `messageArea` instead for node message
    message,

    // button props
    buttons,
    buttonsDirection,

    // React props
    className,
    children,
    ...popupProps
}) {
    const rootClassName = classNames(BEM.root.toString(), className);

    return (
        <div className={rootClassName} {...popupProps}>
            <Overlay />

            <div className={BEM.container}>
                <div className={BEM.body}>
                    {icon && wrapIfNotElement(icon, { with: PopupIcon, via: 'type' })}
                    {messageArea}
                    {(!messageArea && message) && isValidElement(message)
                        ? message
                        : (
                            <PopupMessage
                                title={messageTitle}
                                desc={messageDesc || message}
                                bottomArea={messageBottomArea} />
                        )}
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

Popup.propTypes = {
    icon: StringOrElement,
    messageArea: PropTypes.node,
    messageTitle: PropTypes.string,
    messageDesc: PropTypes.string,
    message: StringOrElement,
    messageBottomArea: PropTypes.node,
    buttons: PropTypes.arrayOf(PropTypes.element),
    buttonsDirection: PropTypes.oneOf(Object.values(BUTTONS_DIRECTION)),
};

Popup.defaultProps = {
    icon: null,
    messageArea: undefined,
    messageTitle: undefined,
    messageDesc: undefined,
    message: null,
    messageBottomArea: undefined,
    buttons: [],
    buttonsDirection: BUTTONS_DIRECTION.VERTICAL,
};

// export for tests
export { Popup as PurePopup };
export default renderToLayer(Popup);
