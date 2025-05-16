import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import icBEM from './utils/icBEM';
import prefixClass from './utils/prefixClass';
import rowComp from './mixins/rowComp';
import Icon from './Icon';
import './styles/Radio.scss';

export const COMPONENT_NAME = prefixClass('radio');
const ROOT_BEM = icBEM(COMPONENT_NAME);
export const BEM = {
  root: ROOT_BEM,
  iconWrapper: ROOT_BEM.element('icon-wrapper'),
  input: ROOT_BEM.element('input'),
  button: ROOT_BEM.element('button'),
};

export const RADIO_BUTTON = (
  <Icon
    type="empty"
    className={`${BEM.button}`}
  />
);

function Radio({
  input,
  // <input> props
  checked,
  defaultChecked,
  disabled,
  onChange,
  // React props
  className,
  children,
  ...otherProps
}) {
  const inputProps = {
    checked,
    defaultChecked,
    disabled,
    onChange,
    ...input,
  };
  const rootClassName = classNames(className, COMPONENT_NAME);
  return (
    <div
      className={rootClassName}
      {...otherProps}
    >
      <span className={BEM.iconWrapper}>
        <input
          type="radio"
          className={BEM.input}
          {...inputProps}
        />
        {RADIO_BUTTON}
      </span>
      {children}
    </div>
  );
}

Radio.propTypes = {
  input: PropTypes.objectOf(PropTypes.any),
  checked: PropTypes.bool,
  defaultChecked: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
};

Radio.defaultProps = {
  input: {},
  checked: undefined,
  defaultChecked: undefined,
  disabled: false,
  onChange: undefined,
};

export default rowComp()(Radio);
export { Radio as PureRadio };
