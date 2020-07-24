import * as React from 'react';

function SvgPencil(props) {
    return (
        <svg width="1em" height="1em" viewBox="0 0 32 32" {...props}>
            <path
                d="M16.66 9.678l5.66 5.657-7.07 7.071-5.66 1.414-1.41-1.414 1.41-5.657zm-.7 3.536l2.83 2.828-4.25 4.243-2.82-2.829zm5.65-4.243l1.42 1.414a3 3 0 010 4.243l-.71.707-5.66-5.657.71-.707a3 3 0 014.24 0zm-1.41 1.414l1.41 1.415a.983.983 0 010 1.414l-.7.707-2.83-2.828.71-.708a1 1 0 011.41 0zm-9.19 7.779l2.83 2.828-2.12.707-1.42-1.414zm6.36-6.364l2.83 2.828-.71.707-2.83-2.828z"
                fillRule="evenodd"
            />
        </svg>
    );
}

export default SvgPencil;
