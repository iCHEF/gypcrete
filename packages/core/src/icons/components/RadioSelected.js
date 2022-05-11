import React from 'react';

export default function SvgRadioSelected(props) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
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
      <rect
        x={11.5}
        y={11.5}
        width={9}
        height={9}
        rx={4.5}
        stroke="currentColor"
      />
    </svg>
  );
}
