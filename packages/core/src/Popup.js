// @flow
import React, { isValidElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import type { AnyReactElement, ReactChildren } from 'react-flow-types';

import icBEM from './utils/icBEM';
import prefixClass from './utils/prefixClass';
import wrapIfNotElement from './utils/wrapIfNotElement';

import closable from './mixins/closable';
import renderToLayer from './mixins/renderToLayer';

import Button from './Button';
import Icon from './Icon';
import Overlay from './Overlay';
import TextLabel from './TextLabel';

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
    message: ROOT_BEM.element('message'),
    button: ROOT_BEM.element('button'),
    buttonsGroup: ROOT_BEM.element('buttons-group')
};

export type Props = {
    icon?: string | AnyReactElement,
    message?: string | AnyReactElement,
    buttons?: React$Element<*>[],
    buttonsDirection: 'vertical' | 'horizontal',

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

function PopupButton({ className, ...props }) {
    const buttonClass = classNames(BEM.button.toString(), className);

    return (
        <Button
            {...props}
            className={buttonClass}
            minified={false}
            align="center" />
    );
}

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

    const popupButtons = buttons.map((button) => {
        if (isValidElement(button)) {
            return <PopupButton {...button.props} />;
        }
        // Ignore invalid elements
        return null;
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
    message,
    buttons,
    buttonsDirection,
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
    message: StringOrElement,
    buttons: PropTypes.arrayOf(PropTypes.element),
    buttonsDirection: PropTypes.oneOf(Object.values(BUTTONS_DIRECTION)),
};

Popup.defaultProps = {
    icon: null,
    message: null,
    buttons: [],
    buttonsDirection: BUTTONS_DIRECTION.VERTICAL,
};

// export for tests
export { Popup as PurePopup };
export const EscapablePopup = closable({ onEscape: true })(Popup);

export default renderToLayer(EscapablePopup);
