import React from 'react';
import PropTypes from 'prop-types';

const defaultBoxStyle = {
  boxShadow: '0 0 1px red',
  marginBottom: 15,
  position: 'relative',
  overflow: 'hidden',
};

function DebugBox({ width, height, style, children }) {
  const boxStyle = {
    ...defaultBoxStyle,
    width,
    height,
    ...style,
  };

  return <div style={boxStyle}>{children}</div>;
}

DebugBox.propTypes = {
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

DebugBox.defaultProps = {
  width: '20rem',
  height: 'auto',
  style: {},
};

export default DebugBox;
