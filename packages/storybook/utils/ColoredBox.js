import React from 'react';
import PropTypes from 'prop-types';

function ColoredBox({ width, height, color, children }) {
  const style = {
    background: color,
    width,
    height,
  };
  return (
    <div style={style}>
      {children}
    </div>
  );
}

ColoredBox.propTypes = {
  width: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  height: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  color: PropTypes.string,
};

ColoredBox.defaultProps = {
  width: undefined,
  height: undefined,
  color: undefined,
};

export default ColoredBox;
