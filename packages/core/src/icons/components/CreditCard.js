import React from 'react';

export default function SvgCreditCard(props) {
    return (
        <svg width="1em" height="1em" viewBox="0 0 1000 1000" {...props}>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M218.8 375v-31.2c0-17.3 13.9-31.3 31.2-31.3h500c17.3 0 31.3 14 31.3 31.3V375H218.8zm0 93.8v187.5c0 17.2 13.9 31.2 31.2 31.2h500c17.3 0 31.3-14 31.3-31.2V468.8H218.8zM781.3 750H218.8c-34.6 0-62.5-28-62.5-62.5v-375c0-34.5 27.9-62.5 62.5-62.5h562.5c34.5 0 62.5 28 62.5 62.5v375c0 34.5-28 62.5-62.5 62.5zm-500-156.2h156.2v62.5H281.3v-62.5z"
            />
        </svg>
    );
}
