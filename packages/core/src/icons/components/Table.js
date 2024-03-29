import React from 'react';

export default function SvgTable(props) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M4 12.15v1.73c0 .319.234.577.522.577h.521v5.189c0 .318.234.576.522.576h2.087c.288 0 .522-.258.522-.576v-5.19h7.652v5.19c0 .318.234.576.522.576h2.087c.288 0 .521-.258.521-.576v-5.19h.522c.288 0 .522-.257.522-.576v-1.73H4zM17.677 5.369c-.085-.225-.27-.369-.474-.369H6.421c-.204 0-.389.144-.474.369L4 10.5h15.624l-1.947-5.131z" />
    </svg>
  );
}
