import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import icBEM from './utils/icBEM';
import prefixClass from './utils/prefixClass';

import './styles/_animations.scss';
import './styles/Icon.scss';

import SvgMap from './icons/components';

const COMPONENT_NAME = prefixClass('icon');
const ROOT_BEM = icBEM(COMPONENT_NAME);

const GRAY = 'gray';
const BLUE = 'blue';
const RED = 'red';

const COLORS = {
  blue: '#45b0e6',
  red: '#d94e41',
  gray: 'rgba(0, 0, 0, 0.7)',
};

const DEFAULT_FILL = 'currentColor';

function getSvgFill({ colorType, wrapperProps }) {
  if (colorType) {
    return COLORS[colorType];
  }
  /**
     * This is for backward compatibility.
     * Because in old gypcrete, we didn't use svg but icon font for <Icon>.
     * So the icon color depends on wrapper <span> color style.
     * Though we change <Icon> implementaion to inline-svg, we should not break this behavior.
     * So just take the color from it and set this to `fill` of svg.
     */
  const customColor = wrapperProps && wrapperProps.style && wrapperProps.style.color;
  if (customColor) {
    return customColor;
  }
  return null;
}

function Icon({
  type,
  color,
  large,
  spinning,
  className,
  svgProps,
  ...otherProps
}) {
  let bemClass = ROOT_BEM
    .modifier('large', large)
    .modifier('spin', spinning);

  if (color) {
    bemClass = bemClass.modifier(color);
  }

  const rootClassName = classNames(
    className,
    bemClass.toString(),
    /**
         * For backward compatibility.
         * For inline-svg implementaion we don't need this class name.
         * But we had used this with icon font implementation.
         */
    `gyp-icon-${type}`
  );

  const SvgComponent = SvgMap[type];

  const fill = getSvgFill({
    colorType: color,
    wrapperProps: otherProps,
  });

  return (
    <span
      className={rootClassName}
      role="presentation"
      {...otherProps}
    >
      {SvgComponent && (
        <SvgComponent fill={fill || DEFAULT_FILL} {...svgProps} />
      )}
    </span>
  );
}

Icon.propTypes = {
  type: PropTypes.string.isRequired,
  color: PropTypes.oneOf([GRAY, BLUE, RED]),
  large: PropTypes.bool,
  spinning: PropTypes.bool,
  svgProps: PropTypes.objectOf(PropTypes.any),
};

Icon.defaultProps = {
  color: undefined,
  large: false,
  spinning: false,
  svgProps: {},
};

export default Icon;
