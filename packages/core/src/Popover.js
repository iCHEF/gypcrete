import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import ListSpacingContext from './contexts/listSpacing';

import icBEM from './utils/icBEM';
import prefixClass from './utils/prefixClass';

import anchored, {
  anchoredPropTypes,
  ANCHORED_PLACEMENT,
} from './mixins/anchored';
import closable from './mixins/closable';
import renderToLayer from './mixins/renderToLayer';

import './styles/Popover.scss';

export const COMPONENT_NAME = prefixClass('popover');
const ROOT_BEM = icBEM(COMPONENT_NAME);
export const BEM = {
  root: ROOT_BEM,
  arrow: ROOT_BEM.element('arrow'),
  container: ROOT_BEM.element('container'),
};

function Popover({
  onClick,
  // from anchored()
  placement,
  arrowStyle,
  nodeRef,
  remainingSpace,
  // from closable()
  onInsideClick,
  // React props
  className,
  children,
  ...otherProps
}) {
  const bemClass = BEM.root.modifier(placement);
  const rootClassName = classNames(bemClass.toString(), className);

  const handleWrapperClick = (event) => {
    onInsideClick(event);
    onClick(event);
  };

  const popoverPadding = 24;

  return (
    <ListSpacingContext.Provider value={false}>
      <div
        role="presentation"
        className={rootClassName}
        ref={nodeRef}
        onClick={handleWrapperClick}
        {...otherProps}
      >
        <span className={BEM.arrow} style={arrowStyle} />
        <div
          className={BEM.container}
          style={{ maxHeight: remainingSpace ? remainingSpace - popoverPadding : undefined }}
        >
          {children}
        </div>
      </div>
    </ListSpacingContext.Provider>
  );
}

Popover.propTypes = {
  onClick: PropTypes.func,
  placement: anchoredPropTypes.placement,
  arrowStyle: anchoredPropTypes.arrowStyle,
  nodeRef: anchoredPropTypes.nodeRef,
  remainingSpace: anchoredPropTypes.remainingSpace,
  onInsideClick: PropTypes.func.isRequired,
};

Popover.defaultProps = {
  onClick: () => {},
  placement: ANCHORED_PLACEMENT.BOTTOM,
  arrowStyle: {},
  nodeRef: undefined,
  remainingSpace: undefined,
};

export { Popover as PurePopover };

export default renderToLayer(
  closable({
    onEscape: true,
    onClickOutside: true,
    onClickInside: true,
  })(
    anchored()(Popover)
  )
);
