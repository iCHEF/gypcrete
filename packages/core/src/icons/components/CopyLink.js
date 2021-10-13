import React from 'react';

export default function SvgCopyLink(props) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#copy-link_svg__clip0)" fill="currentColor">
        <path d="M22.902 9.098a3.75 3.75 0 00-5.304 0l-3.134 3.134c-1.515 1.515-1.375 3.93 0 5.304.23.23.485.418.754.572l.572-.572c.375-.375.243-.814.236-1.13a1.81 1.81 0 01-.236-.196c-.705-.705-.737-1.915 0-2.652l3.134-3.134a1.877 1.877 0 012.652 0c.73.731.73 1.92 0 2.652l-2.072 2.072c.06.331.42 1.116.234 2.411.01-.008.02-.014.03-.023l3.134-3.134a3.75 3.75 0 000-5.304z" />
        <path d="M17.779 14.221a3.568 3.568 0 00-.754-.572l-.572.572c-.375.376-.243.814-.236 1.13.082.059.162.122.236.196.705.706.737 1.915 0 2.652l-3.377 3.377a1.877 1.877 0 01-2.652 0 1.877 1.877 0 010-2.652l2.315-2.314c-.06-.332-.42-1.117-.235-2.412-.009.008-.02.014-.029.023l-3.377 3.377a3.75 3.75 0 005.304 5.304l3.377-3.377c1.486-1.487 1.405-3.898 0-5.304z" />
      </g>
      <defs>
        <clipPath id="copy-link_svg__clip0">
          <path fill="transparent" transform="translate(8 8)" d="M0 0h16v16H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}
