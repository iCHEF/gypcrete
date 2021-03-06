import React from 'react';

export default function SvgInlineLoading(props) {
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
        d="M561.2 170.6c-136.8-24.7-274.5 38.2-345.5 157.7-70 118.9-57 269.1 32.4 374.2 90.3 105.8 236.7 144.6 367.6 97.5 130.5-46.2 217.8-169.4 218.1-307.8 0-19.7-2-39.3-6-58.5l109.4-19.5c4.6 25.7 7 51.9 7.1 78.1.2 185.9-116.8 351.8-292 414-175.7 63.5-372.4 11.4-493.5-130.8C38.7 634.2 21.6 432.3 116.2 272.8 212.1 112.6 397.5 28.9 581 63l-19.8 107.6z"
      />
    </svg>
  );
}
