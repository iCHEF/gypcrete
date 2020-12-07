import React from 'react';

export default function SvgCustomPay(props) {
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
        d="M656.3 781.3H343.8c-69.1 0-125-56-125-125V343.8c0-69.1 55.9-125 125-125h312.5c69 0 125 55.9 125 125v312.5c-.1 68.9-56.1 124.9-125 125zm-312.5-500c-34.6 0-62.5 27.9-62.5 62.5v312.5c0 34.5 27.9 62.5 62.5 62.5h312.5c34.5 0 62.5-28 62.5-62.5V343.8c0-34.6-28-62.5-62.5-62.5H343.8zM515.7 650v-23.2c60.7-4.9 94.4-34.6 94.4-83 0-41.2-24.5-66.7-72.7-76l-21.8-4.1v-56.8c15.1 2.1 26.7 14.4 27.8 29.7H605c-.5-43.6-35-74.3-89.3-79.5v-25h-26.4v25c-59.1 4.2-93.2 33.9-93.2 81.3 0 40.1 24.5 66.5 71.4 76.7l21.9 4.8v58.9c-17.6-.2-32.3-13.3-34.6-30.7h-63.6c.1 46.9 36.2 76 98.1 79.1V650h26.4zm31.8-98.6c0 15.6-11.9 26-31.8 27.5v-54.6c21.4 4 31.8 13 31.8 27.1zm-87.2-119.2c1.1-15 14-26.4 29-25.6v52c-18.9-3.9-29-13-29-26.4z"
      />
    </svg>
  );
}
