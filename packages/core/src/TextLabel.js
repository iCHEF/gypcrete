import React from 'react';
import classNames from 'classnames';
import prefixClass from './utils/prefixClass';
import rowComp from './mixins/rowComp';
import './styles/TextLabel.scss';

export const COMPONENT_NAME = prefixClass('text-label');

function TextLabel({ className, children, ...otherProps }) {
  const rootClassName = classNames(className, COMPONENT_NAME);

  return (
    <div className={rootClassName} {...otherProps}>
      {children}
    </div>
  );
}

// export for tests
export { TextLabel as PureTextLabel };

export default rowComp()(TextLabel);
