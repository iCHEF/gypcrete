import React from 'react';

import Button from '@ichef/gypcrete/src/Button';
import FlexRow from 'utils/FlexRow';

function NormalButton(props) {
    return (
        <Button
            basic="Button"
            aside="<button>"
            tag="Tag"
            tagName="button"
            {...props}
        />
    );
}

function DivButton(props) {
    return (
        <Button
            basic="Button"
            aside="<div>"
            tag="Tag"
            tagName="div"
            {...props}
        />
    );
}

function LinkButton(props) {
    return (
        <Button
            basic="Button"
            aside="<a>"
            tag="Tag"
            tagName="a"
            // props for <a>
            href="http://ichefpos.com/"
            target="_blank"
            {...props}
        />
    );
}

function CustomTagButtonExample() {
    return (
        <div>
            <FlexRow>
                <NormalButton bold />
                <NormalButton bold color="blue" />
                <NormalButton bold color="red" />
                <NormalButton solid />
                <NormalButton solid color="blue" />
                <NormalButton solid color="red" />
            </FlexRow>

            <FlexRow>
                <DivButton bold />
                <DivButton bold color="blue" />
                <DivButton bold color="red" />
                <DivButton solid />
                <DivButton solid color="blue" />
                <DivButton solid color="red" />
            </FlexRow>

            <FlexRow>
                <LinkButton bold />
                <LinkButton bold color="blue" />
                <LinkButton bold color="red" />
                <LinkButton solid />
                <LinkButton solid color="blue" />
                <LinkButton solid color="red" />
            </FlexRow>
        </div>
    );
}

export default CustomTagButtonExample;
