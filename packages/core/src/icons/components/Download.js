import React from 'react';

export default function SvgDownload(props) {
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
        d="M531.3 481.7l79.2-79.3 44.2 44.2L500 601.3 345.4 446.6l44.2-44.2 79.2 79.3V250h62.5v231.7zM250 718.8V531.3h62.5v125h375v-125H750v187.5H250z"
      />
    </svg>
  );
}
