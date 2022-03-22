import React from 'react';

export default function SvgClearItem(props) {
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
        d="M656.3 750H625v-62.5h31.3c17.2 0 31.2-14 31.2-31.2V625H750v31.3c0 51.7-42 93.7-93.7 93.7zm-93.8 0h-125v-62.5h125V750zM375 750h-31.2c-51.8 0-93.8-42-93.8-93.7V625h62.5v31.3c0 17.2 14 31.2 31.3 31.2H375V750zm-62.5-187.5H250v-125h62.5v125zm437.5 0h-62.5v-125H750v125zm0-187.5h-62.5v-31.2c0-17.3-14-31.3-31.2-31.3H625V250h31.3c51.7 0 93.7 42 93.7 93.8V375zm-437.5 0H250v-31.2c0-51.8 42-93.8 93.8-93.8H375v62.5h-31.2c-17.3 0-31.3 14-31.3 31.3V375zm250-62.5h-125V250h125v62.5z"
      />
    </svg>
  );
}
