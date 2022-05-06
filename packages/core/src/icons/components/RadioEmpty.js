import * as React from 'react';

export default function SvgRadioEmpty(props) {
  return (
    <svg width="1em" height="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect
        x={7}
        y={7}
        width={18}
        height={18}
        rx={9}
        stroke="currentColor"
        strokeWidth={2}
        fill="none"
      />
    </svg>
  );
}
