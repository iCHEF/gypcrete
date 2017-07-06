import React from 'react';
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
    message: ROOT_BEM.element('message')
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
        return <Icon large type={icon} />;
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

function Popup({
    icon,
    message,
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

                {children}
            </div>
        </div>
    );
}

Popup.propTypes = {
    icon: PropTypes.node,
    message: PropTypes.node
};

Popup.defaultProps = {
    icon: null,
    message: null
};

// export for tests
export { Popup as PurePopup };
export const EscapablePopup = escapable(Popup);

export default renderToLayer(EscapablePopup);
