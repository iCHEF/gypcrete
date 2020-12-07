import React from 'react';

export default function SvgAddItem(props) {
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
        d="M250 656.2c-51.8 0-93.8-42-93.8-93.7V250c.1-51.8 42-93.7 93.8-93.8h312.5c51.7 0 93.7 42 93.7 93.8v312.5c0 51.7-42 93.7-93.7 93.7H250zm343.7-187.5V250c0-17.3-14-31.3-31.2-31.3H250c-17.3 0-31.3 14-31.3 31.3v218.7h375zm-375 93.8c0 17.2 14 31.2 31.3 31.2h312.5c17.2 0 31.2-14 31.2-31.2V500h-375v62.5zm500.1 250h-31.3V750h31.3c17.2 0 31.2-14 31.2-31.2v-31.3h62.5v31.3c0 51.7-42 93.7-93.7 93.7zm-93.8 0H500V750h125v62.5zm-187.5 0h-31.2c-51.8 0-93.8-42-93.8-93.7v-31.3H375v31.3c0 17.2 14 31.2 31.3 31.2h31.2v62.5zm375-187.5H750V500h62.5v125zm0-187.5H750v-31.2c0-17.3-14-31.3-31.2-31.3h-31.3v-62.5h31.3c51.7 0 93.7 42 93.7 93.8v31.2z"
      />
    </svg>
  );
}
