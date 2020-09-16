import React from 'react';

export default function SvgPrinter(props) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 32 32" {...props}>
      <path fill="none" d="M0 0h32v32H0z" />
      <path
        d="M22 25H10a3 3 0 01-3-3v-9a3 3 0 013-3h1V6h10v4h1a3 3 0 013 3v9a3 3 0 01-3 3zM12 14h-.5a.5.5 0 000 1h.5v-1zm7-6h-6v7h6V8zm4 5a1 1 0 00-1-1h-2v1h1a1 1 0 011 1v1a1 1 0 01-1 1H11a1 1 0 01-1-1v-1a1 1 0 011-1h1v-1h-2a1 1 0 00-1 1v4h14v-4zm-3 1v1h.5a.5.5 0 000-1H20zm3 4H9v4a1 1 0 001 1h12a1 1 0 001-1v-4zm-5 1h4v1h-4v-1zm0-9h-4V9h4v1zm0 2h-4v-1h4v1zm-1 2h-3v-1h3v1z"
        fillRule="evenodd"
      />
    </svg>
  );
}
