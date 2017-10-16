// @flow
import React, { isValidElement, cloneElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import type { ReactChildren } from 'react-flow-types';

import icBEM from './utils/icBEM';
import prefixClass from './utils/prefixClass';

import Icon from './Icon';
import Overlay from './Overlay';
import closable from './mixins/closable';
import renderToLayer from './mixins/renderToLayer';

import './styles/Popup.scss';

export const COMPONENT_NAME = prefixClass('popup');
const ROOT_BEM = icBEM(COMPONENT_NAME);
export const BEM = {
    root: ROOT_BEM,
    container: ROOT_BEM.element('container'),
    body: ROOT_BEM.element('body'),
    message: ROOT_BEM.element('message'),
    button: ROOT_BEM.element('button'),
    buttonsGroup: ROOT_BEM.element('buttons-group')
};

export type Props = {
    icon?: string | ReactChildren,
    message?: ReactChildren,
    buttons?: React$Element<*>[],

    /* eslint-disable react/require-default-props */
    className?: string,
    children?: ReactChildren,
    /* eslint-enable react/require-default-props */
};

/**
 * Render popup's icon
 *
 * @param  {String|Element} icon
 * @return {Element}
 */
function renderPopupIcon(icon) {
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
        <div className={BEM.message.toString()}>
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
            const buttonBemClass = BEM.button.toString();

            return cloneElement(button, {
                className: buttonBemClass,
                align: 'center',
                minified: false
            });
        }

        return button;
    });

    return (
        <div className={BEM.buttonsGroup.toString()}>
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
}: Props) {
    const rootClassName = classNames(BEM.root.toString(), className);

    return (
        <div className={rootClassName} {...popupProps}>
            <Overlay />

            <div className={BEM.container.toString()}>
                <div className={BEM.body.toString()}>
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
export const EscapablePopup = closable({ onEscape: true })(Popup);

export default renderToLayer(EscapablePopup);
