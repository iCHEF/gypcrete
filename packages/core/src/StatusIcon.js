import { memo, useState, useRef, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';

import icBEM from './utils/icBEM';
import prefixClass from './utils/prefixClass';
import './styles/StatusIcon.scss';

import Icon from './Icon';

const LOADING = 'loading';
const SUCCESS = 'success';
const ERROR = 'error';
export const STATUS_CODE = { LOADING, SUCCESS, ERROR };

const INLINE = 'inline';
const CORNER = 'corner';
export const STATUS_POSITION = { INLINE, CORNER };

const COMPONENT_NAME = prefixClass('status-icon');
const ROOT_BEM = icBEM(COMPONENT_NAME);

const ICON_HIDE_TIMEOUT = 2 * 1000;

const StatusIcon = memo(({ status, position, autohide, ...wrapperProps }) => {
  const [hideIcon, setHideIcon] = useState(false);
  const hideIconTimeout = useRef(null);

  /**
   * Auto hides status icon after being SUCCESS for 2 secs,
   * or shows icon when component leaves SUCCESS state.
   *
   * Scenario:
   *   - LOADING -> SUCCESS -> (2s) ==> hide
   *   - LOADING -> SUCCESS -> (1s) -> LOADING|ERROR|null ==> clear timeout
   *   - LOADING -> SUCCESS -> (1s) -> (render) -> SUCCESS ==> keep timeout
   *   - SUCCESS -> LOADING|ERROR|null ==> clear timeout & show icon
   *
   * @param {String} status - current or next 'status'
   */
  const autoToggleStatusIcon = useCallback(() => {
    // Ignore if autohide === false
    if (!autohide) {
      return;
    }

    // LOADING|ERROR|null -> SUCCESS
    if (status === SUCCESS) {
      hideIconTimeout.current = setTimeout(() => {
        setHideIcon(true);
        hideIconTimeout.current = null;
      }, ICON_HIDE_TIMEOUT);

      return;
    }

    // SUCCESS -> LOADING|ERROR|null
    clearTimeout(hideIconTimeout.current);
    setHideIcon(false);
  }, [autohide, status]);

  useEffect(() => () => clearTimeout(hideIconTimeout.current), []);

  useEffect(() => {
    autoToggleStatusIcon();

    // If 'autohide' is turned off, make icon visible immediately
    if (!autohide && hideIcon) {
      setHideIcon(false);
    }
  }, [status, autohide, hideIcon, autoToggleStatusIcon]);

  const rootClassName = ROOT_BEM.modifier(position);
  let icon = null;

  switch (status) {
    case LOADING:
      icon = (
        <Icon
          type="inline-loading"
          color="gray"
          spinning
        />
      );
      break;
    case SUCCESS:
      if (!hideIcon) {
        icon = (
          <Icon
            type="inline-success"
            color="blue"
          />
        );
      }
      break;
    case ERROR:
      icon = (
        <Icon
          type="inline-error"
          color="red"
        />
      );
      break;
    default:
      break;
  }

  return (
    icon && (
      <span
        className={rootClassName}
        {...wrapperProps}
      >
        {icon}
      </span>
    )
  );
});

StatusIcon.propTypes = {
  status: PropTypes.oneOf([LOADING, SUCCESS, ERROR]),
  position: PropTypes.oneOf([INLINE, CORNER]),
  /**
   * if `true`, Auto hides status icon after being success for 2 secs,
   * or shows icon when component leaves success state.
   * */
  autohide: PropTypes.bool,
};

StatusIcon.defaultProps = {
  status: undefined,
  position: INLINE,
  autohide: true,
};

export default StatusIcon;
