import { isValidElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import icBEM from './utils/icBEM';
import prefixClass from './utils/prefixClass';

import renderToLayer from './mixins/renderToLayer';

import Icon from './Icon';
import Overlay from './Overlay';

import './styles/_animations.scss';
import './styles/Popup.scss';

export const POPUP_SIZE = {
  SMALL: 'small',
  LARGE: 'large',
};

export const COMPONENT_NAME = prefixClass('popup');
const ROOT_BEM = icBEM(COMPONENT_NAME);
export const BEM = {
  root: ROOT_BEM,
  container: ROOT_BEM.element('container'),
  icon: ROOT_BEM.element('icon'),
  body: ROOT_BEM.element('body'),
  messageTitle: ROOT_BEM.element('message-title'),
  messageDesc: ROOT_BEM.element('message-desc'),
  messageDescWithTitle: ROOT_BEM.element('message-desc').modifier('with-title'),
  button: ROOT_BEM.element('button'),
  buttonsGroup: ROOT_BEM.element('buttons-group'),
};

export function PopupIcon({ icon, color }) {
  if (!icon) {
    return null;
  }

  return (
    <div className={BEM.icon}>
      {isValidElement(icon) ? (
        icon
      ) : (
        <Icon
          large
          type={icon}
          color={color}
        />
      )}
    </div>
  );
}
PopupIcon.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  color: PropTypes.string,
};
PopupIcon.defaultProps = {
  icon: undefined,
  color: undefined,
};

export function PopupMessage({ title, message }) {
  // variant: title + desc
  if (title) {
    return (
      <>
        <div className={BEM.messageTitle}>{title}</div>
        <div className={BEM.messageDescWithTitle}>{message}</div>
      </>
    );
  }

  // variant: simple message
  return <div className={BEM.messageDesc}>{message}</div>;
}
PopupMessage.propTypes = {
  title: PropTypes.node,
  message: PropTypes.node.isRequired,
};
PopupMessage.defaultProps = {
  title: undefined,
};

function Popup({
  size,
  icon,
  iconColor,
  title,
  message,
  messageBottomArea,
  buttons,
  className,
  ...popupProps
}) {
  const rootBEM = BEM.root.modifier(size).toString();
  const rootClassName = classNames(rootBEM, className);

  return (
    <div
      className={rootClassName}
      {...popupProps}
    >
      <Overlay />

      <div className={BEM.container}>
        <PopupIcon
          icon={icon}
          color={iconColor}
        />

        <div className={BEM.body}>
          <PopupMessage
            title={title}
            message={message}
          />
          {messageBottomArea}
        </div>

        {buttons && <div className={BEM.buttonsGroup}>{buttons}</div>}
      </div>
    </div>
  );
}

Popup.propTypes = {
  size: PropTypes.oneOf([POPUP_SIZE.SMALL, POPUP_SIZE.LARGE]),
  icon: PopupIcon.propTypes.icon,
  iconColor: PopupIcon.propTypes.color,
  title: PopupMessage.propTypes.title,
  message: PopupMessage.propTypes.message,
  messageBottomArea: PropTypes.node,
  buttons: PropTypes.node,
};

Popup.defaultProps = {
  size: POPUP_SIZE.SMALL,
  icon: PopupIcon.defaultProps.icon,
  iconColor: PopupIcon.defaultProps.color,
  title: PopupMessage.defaultProps.title,
  message: PopupMessage.defaultProps.message,
  messageBottomArea: undefined,
  buttons: undefined,
};

// export for tests
export { Popup as PurePopup };
export default renderToLayer(Popup);
