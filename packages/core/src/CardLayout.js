import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import icBEM from './utils/icBEM';
import prefixClass from './utils/prefixClass';
import './styles/CardLayout.scss';

export const COMPONENT_NAME = prefixClass('card-layout');
const ROOT_BEM = icBEM(COMPONENT_NAME);

function CardLayout({
  layout,
  // React props
  className,
  children,
  ...otherProps
}) {
  const bemClass = ROOT_BEM.modifier(layout);

  const rootClassName = classNames(className, `${bemClass}`);

  return (
    <div
      className={rootClassName}
      {...otherProps}
    >
      {children}
    </div>
  );
}

CardLayout.propTypes = {
  layout: PropTypes.oneOf(['grid', 'row', 'column']),
};

CardLayout.defaultProps = {
  layout: 'grid',
};

export default CardLayout;
