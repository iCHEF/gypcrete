import React from 'react';

export default function SvgCash(props) {
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
        d="M500 812.5c-172.6 0-312.5-139.9-312.5-312.5S327.4 187.5 500 187.5 812.5 327.4 812.5 500 672.6 812.5 500 812.5zm0-562.5c-138.1 0-250 111.9-250 250s111.9 250 250 250 250-111.9 250-250c0-66.3-26.3-129.9-73.2-176.8C629.9 276.3 566.3 250 500 250zm0 458.3c-115.1 0-208.3-93.2-208.3-208.3 0-115.1 93.2-208.3 208.3-208.3 115.1 0 208.3 93.2 208.3 208.3.1 55.3-21.9 108.3-61 147.3-39 39.1-92 61.1-147.3 61zm0-395.8c-103.6 0-187.5 83.9-187.5 187.5S396.4 687.5 500 687.5 687.5 603.6 687.5 500 603.6 312.5 500 312.5zm52.1 166.7c18.9-.5 36.6 9.3 46.2 25.6a52 52 0 010 52.8c-9.6 16.4-27.3 26.2-46.2 25.7h-31.3V625h-41.6v-41.7h-83.4v-41.6h83.4v-20.9h-31.3c-28.3-.7-50.8-23.8-50.8-52.1 0-28.2 22.5-51.4 50.8-52h31.3V375h41.6v41.7h83.4v41.6h-83.4v20.9h31.3zm-31.3 62.5h31.3c3.7 0 7.2-2 9-5.3 1.9-3.2 1.9-7.2 0-10.4-1.8-3.2-5.3-5.2-9-5.2h-31.3v20.9zm-41.6-83.4h-31.3c-5.7 0-10.4 4.7-10.4 10.5 0 5.7 4.7 10.4 10.4 10.4h31.3v-20.9z"
      />
    </svg>
  );
}
