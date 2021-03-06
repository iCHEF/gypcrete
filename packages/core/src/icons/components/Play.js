import React from 'react';

export default function SvgPlay(props) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 1000 1000"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M187.5 500c.2-172.5 140-312.3 312.5-312.5 172.5.2 312.3 140 312.5 312.5-.2 172.5-140 312.3-312.5 312.5-172.5-.2-312.3-140-312.5-312.5zm70.3 0C258 633.7 366.3 742 500 742.2 633.7 742 742 633.7 742.2 500 742 366.3 633.7 258 500 257.9 366.3 258 258 366.3 257.8 500zm179.7 125V375L625 500 437.5 625z"
      />
    </svg>
  );
}
