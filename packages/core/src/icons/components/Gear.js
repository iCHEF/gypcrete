import React from 'react';

export default function SvgGear(props) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path fill="#fff" d="M0 0h32v32H0z" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18 6.5a.5.5 0 00-.5-.5h-3a.5.5 0 00-.5.5v2.771c0 .219-.142.41-.347.487a6.605 6.605 0 00-.408.17.525.525 0 01-.59-.1l-1.96-1.959a.5.5 0 00-.706 0L7.867 9.991a.5.5 0 000 .707l1.96 1.96c.155.154.19.39.1.59-.061.133-.117.268-.17.405a.526.526 0 01-.486.347H6.5a.5.5 0 00-.5.5v3a.5.5 0 00.5.5h2.771c.219 0 .41.143.487.347a6.6 6.6 0 00.169.407.526.526 0 01-.099.59l-1.96 1.96a.5.5 0 000 .707l2.122 2.121a.5.5 0 00.707 0l1.96-1.96a.526.526 0 01.59-.099c.133.061.268.117.406.169a.526.526 0 01.347.487V25.5a.5.5 0 00.5.5h3a.5.5 0 00.5-.5v-2.771c0-.219.143-.41.347-.487.137-.052.272-.108.405-.168a.525.525 0 01.59.098l1.96 1.96a.5.5 0 00.707 0l2.122-2.12a.5.5 0 000-.708l-1.96-1.96a.525.525 0 01-.098-.59c.06-.133.117-.269.168-.407a.526.526 0 01.487-.347H25.5a.5.5 0 00.5-.5v-3a.5.5 0 00-.5-.5h-2.771a.525.525 0 01-.487-.347 6.642 6.642 0 00-.169-.406.525.525 0 01.099-.59l1.96-1.96a.5.5 0 000-.707l-2.121-2.121a.5.5 0 00-.707 0l-1.96 1.96a.525.525 0 01-.59.098 6.629 6.629 0 00-.407-.169.526.526 0 01-.347-.486V6.5zm-2 12.833a3.333 3.333 0 100-6.666 3.333 3.333 0 000 6.666z"
        fill="currentColor"
      />
    </svg>
  );
}
