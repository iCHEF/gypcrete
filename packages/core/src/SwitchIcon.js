import PropTypes from 'prop-types';
import classNames from 'classnames';

import prefixClass from './utils/prefixClass';
import icBEM from './utils/icBEM';
import './styles/SwitchIcon.scss';

export const COMPONENT_NAME = prefixClass('switch-icon');
const ROOT_BEM = icBEM(COMPONENT_NAME);
export const BEM = {
  root: ROOT_BEM,
  inner: ROOT_BEM.element('inner'),
};

const ON = 'on';
const OFF = 'off';
export const SWITCH_STATE = { ON, OFF };

/**
 * <SwitchIcon>
 * ===
 *
 * A `<SwitchIcon>` is a visual element that is supposed to be like a 64x32 icon.
 */
function SwitchIcon({ state, className, ...otherProps }) {
  const bemClass = BEM.root.modifier(state);
  const rootClassName = classNames(className, `${bemClass}`);

  return (
    <span
      className={rootClassName}
      {...otherProps}
    >
      <span className={BEM.inner} />
    </span>
  );
}

SwitchIcon.propTypes = {
  state: PropTypes.oneOf([ON, OFF]),
};

SwitchIcon.defaultProps = {
  state: OFF,
};

export default SwitchIcon;
