import React, { isValidElement, cloneElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import icBEM from './utils/icBEM';
import prefixClass from './utils/prefixClass';

import Icon from './Icon';
import Overlay from './Overlay';
import escapable from './mixins/escapable';
import renderToLayer from './mixins/renderToLayer';

import './styles/Popup.scss';

export const COMPONENT_NAME = prefixClass('popup');
const ROOT_BEM = icBEM(COMPONENT_NAME);
const BEM = {
    root: ROOT_BEM,
    container: ROOT_BEM.element('container'),
    body: ROOT_BEM.element('body'),
    message: ROOT_BEM.element('message'),
    button: ROOT_BEM.element('button'),
    buttonsGroup: ROOT_BEM.element('buttons-group')
};

/**
 * Render popup's icon
 *
 * @param  {String|Element} icon
 * @return {Element}
 */
function renderPopupIcon(icon) {
    if (!icon) {
        return null;
    }

    if (typeof icon === 'string') {
        return (
            <Icon
                large
                color="blue"
                type={icon} />
        );
    }

    return icon;
}

/**
 * Render popup's message
 *
 * @param  {Element|String} message
 * @return {Element}
 */
function renderPopupMessage(message) {
    if (!message) {
        return null;
    }

    return (
        <div className={BEM.message}>
            {message}
        </div>
    );
}

/**
 * Render popup's buttons
 *
 * @param  {Array} buttons
 * @return {Array}
 */
function renderPopupButtons(buttons) {
    if (!buttons || buttons.length === 0) {
        return null;
    }

    const popupButtons = buttons.map((button) => {
        // Render as expanded button
        if (isValidElement(button)) {
            return cloneElement(button, {
                className: `${BEM.button}`,
                align: 'center',
                minified: false
            });
        }

        return button;
    });

    return (
        <div className={BEM.buttonsGroup}>
            {popupButtons}
        </div>
    );
}

function Popup({
    icon,
    message,
    buttons,
    // React props
    className,
    children,
    ...popupProps
}) {
    const rootClassName = classNames(className, `${BEM.root}`);

    return (
        <div className={rootClassName} {...popupProps}>
            <Overlay />

            <div className={BEM.container}>
                <div className={BEM.body}>
                    {renderPopupIcon(icon)}
                    {renderPopupMessage(message)}
                </div>

                {renderPopupButtons(buttons)}
                {children}
            </div>
        </div>
    );
}

Popup.propTypes = {
    icon: PropTypes.node,
    message: PropTypes.node,
    buttons: PropTypes.arrayOf(PropTypes.element)
};

Popup.defaultProps = {
    icon: null,
    message: null,
    buttons: []
};

// export for tests
export { Popup as PurePopup };
export const EscapablePopup = escapable(Popup);

export default renderToLayer(EscapablePopup);
