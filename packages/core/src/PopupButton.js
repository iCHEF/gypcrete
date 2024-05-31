import React from 'react';
import classNames from 'classnames';

import prefixClass from './utils/prefixClass';
import Button from './Button';
import './styles/PopupButton.scss';

export const COMPONENT_NAME = prefixClass('popup-button');

function PopupButton({ className, ...props }) {
  const buttonClass = classNames(COMPONENT_NAME, className);

  return (
    <Button
      bold
      className={buttonClass}
      minified={false}
      align="center"
      {...props}
    />
  );
}

export default PopupButton;
