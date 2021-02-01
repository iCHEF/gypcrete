import React from 'react';

export default function SvgOnlinePoints(props) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx={10} cy={10} r={9.5} fill="#1E88E5" stroke="#1E88E5" />
      <path
        d="M9.137 11.315v3.188H7.273V5.455h3.53c.68 0 1.276.124 1.79.372.517.249.915.603 1.193 1.063.277.456.416.976.416 1.56 0 .887-.304 1.587-.913 2.1-.605.51-1.444.765-2.517.765H9.137zm0-1.51h1.666c.493 0 .868-.116 1.125-.348.26-.232.391-.564.391-.995 0-.443-.13-.801-.391-1.075-.261-.273-.622-.414-1.082-.422H9.137v2.84z"
        fill="#fff"
      />
    </svg>
  );
}
