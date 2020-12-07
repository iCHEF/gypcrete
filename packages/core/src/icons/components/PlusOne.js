import React from 'react';

export default function SvgPlusOne(props) {
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
        d="M8 16c0-.631.512-1.143 1.143-1.143h13.714a1.143 1.143 0 010 2.286H9.143A1.143 1.143 0 018 16z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 24a1.143 1.143 0 01-1.143-1.143V9.143a1.143 1.143 0 012.286 0v13.714C17.143 23.488 16.63 24 16 24z"
      />
    </svg>
  );
}
