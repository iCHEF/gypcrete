import React from 'react';

export default function SvgInlineInfo(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 32 32"
      {...props}
    >
      <defs>
        <clipPath id="inline-info_svg__a">
          <path d="M0 0h32v32H0z" />
        </clipPath>
      </defs>
      <g clipPath="url(#inline-info_svg__a)">
        <path
          data-name="\u524D\u9762\u30AA\u30D6\u30B8\u30A7\u30AF\u30C8\u3067\u578B\u629C\u304D 126"
          d="M16.334 29.334h-.667a13 13 0 01-13-13v-.667a13 13 0 0113-13h.666a13 13 0 0113 13v.667a13 13 0 01-13 13zm-.333-24a10.666 10.666 0 107.543 3.124A10.6 10.6 0 0016 5.334z"
        />
        <path
          data-name="\u9577\u65B9\u5F62 10395"
          d="M14 15h4v8h-4z"
        />
        <path
          data-name="\u9577\u65B9\u5F62 10396"
          d="M14 9h4v4h-4z"
        />
      </g>
    </svg>
  );
}
