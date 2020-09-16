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
  buttonsGroup: ROOT_BEM.element('buttons-group'),
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
      {desc && (
        <span className={BEM.messageDesc}>{desc}</span>
      )}
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

  const wrapperClass = BEM.buttonsGroup
    .modifier(direction)
    .toString();

  return (
    <div className={wrapperClass}>
      {buttons}
    </div>
  );
}

function Popup({
  large,
  icon,

  // message area props
  customMessageNode,
  messageTitle,
  messageDesc,
  messageBottomArea,
  // message is a legacy prop, should be deprecated in future,
  //   use `messageDesc` instead for string message,
  //   use `customMessageNode` instead for node message
  message,

  // button props
  buttons,
  buttonsDirection,

  // React props
  className,
  children,
  ...popupProps
}) {
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
          bottomArea={messageBottomArea}
        />
      );
    },
    [message, customMessageNode, messageTitle, messageDesc, messageBottomArea]
  );

  return (
    <div className={rootClassName} {...popupProps}>
      <Overlay />

      <div className={BEM.container}>
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

Popup.propTypes = {
  large: PropTypes.bool,
  icon: StringOrElement,
  customMessageNode: PropTypes.node,
  messageTitle: PropTypes.string,
  messageDesc: PropTypes.string,
  message: StringOrElement,
  messageBottomArea: PropTypes.node,
  buttons: PropTypes.arrayOf(PropTypes.element),
  buttonsDirection: PropTypes.oneOf(Object.values(BUTTONS_DIRECTION)),
};

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
export default renderToLayer(Popup);
