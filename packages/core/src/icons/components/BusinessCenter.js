import React from 'react';

export default function SvgBusinessCenter(props) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <mask
        id="business_center_svg__a"
        style={{
          maskType: 'alpha',
        }}
        maskUnits="userSpaceOnUse"
        x={0}
        y={0}
        width={24}
        height={24}
      >
        <path
          fill="#D9D9D9"
          d="M0 0h24v24H0z"
        />
      </mask>
      <g mask="url(#business_center_svg__a)">
        <path
          d="M4 22c-.55 0-1.02-.196-1.413-.587A1.926 1.926 0 012 20V9c0-.55.196-1.02.587-1.412A1.926 1.926 0 014 7h4V5c0-.55.196-1.02.588-1.413A1.926 1.926 0 0110 3h4c.55 0 1.02.196 1.412.587C15.804 3.98 16 4.45 16 5v2h4c.55 0 1.02.196 1.413.588.391.391.587.862.587 1.412v11c0 .55-.196 1.02-.587 1.413A1.926 1.926 0 0120 22H4zm6-15h4V5h-4v2zm10 9h-5v1c0 .283-.096.52-.287.712A.968.968 0 0114 18h-4a.967.967 0 01-.713-.288A.968.968 0 019 17v-1H4v4h16v-4zm-9 0h2v-2h-2v2zm-7-2h5v-1c0-.283.096-.52.287-.713A.967.967 0 0110 12h4c.283 0 .52.096.713.287.191.192.287.43.287.713v1h5V9H4v5z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
}
