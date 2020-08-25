import React from 'react';

export default function SvgMore(props) {
    return (
        <svg
            width="1em"
            height="1em"
            viewBox="0 0 32 32"
            fill="none"
            {...props}
        >
            <circle cx={9} cy={16} r={2} />
            <circle cx={16} cy={16} r={2} />
            <circle cx={23} cy={16} r={2} />
        </svg>
    );
}
