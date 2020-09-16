import React from 'react';
import classNames from 'classnames';

import icBEM from './utils/icBEM';
import prefixClass from './utils/prefixClass';

import './styles/SplitView.scss';

export const COMPONENT_NAME = prefixClass('splitview');
const ROOT_BEM = icBEM(COMPONENT_NAME);
export const BEM = {
  root: ROOT_BEM,
  column: ROOT_BEM.element('column'),
};

function SplitView({
  className,
  children,
  ...otherProps
}) {
  const rootClassName = classNames(ROOT_BEM.toString(), className);

  return (
    <div className={rootClassName} {...otherProps}>
      {children}
    </div>
  );
}

export default SplitView;
