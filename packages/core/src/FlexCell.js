import React from 'react';
import PropTypes from 'prop-types';

import icBEM from './utils/icBEM';
import prefixClass from './utils/prefixClass';
import './styles/FlexCell.scss';

const COMPONENT_NAME = prefixClass('flex-cell');
const ROOT_BEM = icBEM(COMPONENT_NAME);

function FlexCell({ shrink, grow, basis, children }) {
  const flexStyles = {
    flexShrink: Number(shrink), // stylelint-disable-line function-name-case
    flexGrow: Number(grow), // stylelint-disable-line function-name-case
    flexBasis: basis, // stylelint-disable-line declaration-block-no-redundant-longhand-properties
  };

  return (
    <div
      className={ROOT_BEM}
      style={flexStyles}
    >
      {children}
    </div>
  );
}

FlexCell.propTypes = {
  shrink: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  grow: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  basis: PropTypes.string,
};

FlexCell.defaultProps = {
  shrink: false,
  grow: false,
  basis: 'auto',
};

export default FlexCell;
