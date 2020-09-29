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
const GREEN = 'green';


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

  return (
    <span
      className={rootClassName}
      role="presentation"
      {...otherProps}
    >
      {SvgComponent && (
        <SvgComponent fill="currentColor" {...svgProps} />
      )}
    </span>
  );
}

Icon.propTypes = {
  type: PropTypes.string.isRequired,
  color: PropTypes.oneOf([GRAY, BLUE, RED, GREEN]),
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
