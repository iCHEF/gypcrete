// @flow
import React, { isValidElement, cloneElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import type { AnyReactElement, ReactChildren } from 'react-flow-types';

import icBEM from './utils/icBEM';
import prefixClass from './utils/prefixClass';
import wrapIfNotElement from './utils/wrapIfNotElement';

import closable from './mixins/closable';
import renderToLayer from './mixins/renderToLayer';

import Icon from './Icon';
import Overlay from './Overlay';
import TextLabel from './TextLabel';

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
    icon?: string | AnyReactElement,
    message?: string | AnyReactElement,
    buttons?: React$Element<*>[],

    /* eslint-disable react/require-default-props */
    className?: string,
    children?: ReactChildren,
    /* eslint-enable react/require-default-props */
};

function PopupIcon({ type }) {
    return <Icon large type={type} />;
}
PopupIcon.propTypes = {
    type: PropTypes.string.isRequired,
};

function PopupMessage({ text }) {
    return <TextLabel align="center" basic={text} />;
}
PopupMessage.propTypes = {
    text: PropTypes.string.isRequired,
};

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
    ...popupProps,
}: Props) {
    const rootClassName = classNames(BEM.root.toString(), className);

    return (
        <div className={rootClassName} {...popupProps}>
            <Overlay />

            <div className={BEM.container}>
                <div className={BEM.body}>
                    {icon && wrapIfNotElement(icon, { with: PopupIcon, via: 'type' })}
                    {message && wrapIfNotElement(message, { with: PopupMessage, via: 'text' })}
                </div>

                {renderPopupButtons(buttons)}
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
    message: StringOrElement,
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
