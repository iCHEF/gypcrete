import React from 'react';

export default function SvgCamping(props) {
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
        id="camping_svg__a"
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
      <g mask="url(#camping_svg__a)">
        <path
          d="M2 21v-3c0-.216.033-.424.1-.624s.167-.392.3-.575l8.35-11.25L9.6 4a1.119 1.119 0 01-.175-.363.953.953 0 01.1-.737.94.94 0 01.275-.3c.233-.167.483-.233.75-.2a.913.913 0 01.65.4l.8 1.075.8-1.075a.913.913 0 01.65-.4c.267-.033.517.033.75.2a.913.913 0 01.4.65c.033.267-.033.517-.2.75l-1.15 1.55L21.6 16.8c.133.183.233.375.3.575.067.2.1.408.1.625v3c0 .283-.096.52-.288.712a.968.968 0 01-.712.288H3a.967.967 0 01-.712-.288.968.968 0 01-.288-.712zM12 7.227L4 18v2h3l4.175-5.85a.956.956 0 01.825-.425c.35 0 .625.142.825.425L17 20h3v-2L12 7.226zM9.45 20h5.1L12 16.45 9.45 20z"
          fill="#1C1B1F"
        />
      </g>
    </svg>
  );
}
