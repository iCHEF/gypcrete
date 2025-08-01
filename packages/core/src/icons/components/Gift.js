import React from 'react';

export default function SvgGift(props) {
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
        id="gift_svg__a"
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
      <g mask="url(#gift_svg__a)">
        <path
          d="M4 20v-9c-.55 0-1.02-.196-1.413-.588A1.926 1.926 0 012 9V7c0-.55.196-1.02.587-1.412A1.926 1.926 0 014 5h3.2a1.398 1.398 0 01-.163-.475A3.538 3.538 0 017 4c0-.833.292-1.542.875-2.125A2.893 2.893 0 0110 1c.383 0 .742.07 1.075.212.333.142.642.338.925.588.283-.267.592-.467.925-.6.333-.133.692-.2 1.075-.2.833 0 1.542.292 2.125.875S17 3.167 17 4c0 .183-.017.354-.05.513-.033.158-.083.32-.15.487H20c.55 0 1.02.196 1.413.588.391.391.587.862.587 1.412v2c0 .55-.196 1.02-.587 1.412A1.926 1.926 0 0120 11v9c0 .55-.196 1.02-.587 1.413A1.926 1.926 0 0118 22H6c-.55 0-1.02-.196-1.412-.587A1.926 1.926 0 014 20zM14 3a.968.968 0 00-.713.288A.967.967 0 0013 4c0 .283.096.52.287.713.192.191.43.287.713.287s.52-.096.713-.287A.967.967 0 0015 4a.967.967 0 00-.287-.712A.968.968 0 0014 3zM9 4c0 .283.096.52.287.713.192.191.43.287.713.287s.52-.096.713-.287A.967.967 0 0011 4a.967.967 0 00-.287-.712A.968.968 0 0010 3a.968.968 0 00-.713.288A.968.968 0 009 4zM4 7v2h7V7H4zm7 13v-9H6v9h5zm2 0h5v-9h-5v9zm7-11V7h-7v2h7z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
}
