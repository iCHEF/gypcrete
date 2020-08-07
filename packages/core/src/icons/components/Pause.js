import React from 'react';

export default function SvgPause(props) {
    return (
        <svg width="1em" height="1em" viewBox="0 0 1000 1000" {...props}>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M187.6 500c.2-172.5 140-312.3 312.5-312.5 172.5.2 312.2 140 312.5 312.5-.2 172.5-140 312.3-312.5 312.5-172.6-.2-312.4-140-312.5-312.5zm70.2 0C258 633.7 366.3 742 500 742.2 633.7 742 742 633.7 742.2 500 742 366.3 633.7 258 500 257.9 366.3 258 258 366.4 257.9 500h-.1zm273.4 125V375H625v250h-93.8zM375 625V375h93.7v250H375z"
            />
        </svg>
    );
}
