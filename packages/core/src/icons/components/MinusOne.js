import React from 'react';

export default function SvgMinusOne(props) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle
        cx={16}
        cy={16}
        r={15}
        stroke="currentColor"
        strokeWidth={2}
        fill="transparent"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 16c0-.552.512-1 1.143-1h13.714c.631 0 1.143.448 1.143 1s-.512 1-1.143 1H9.143C8.512 17 8 16.552 8 16z"
      />
    </svg>
  );
}
