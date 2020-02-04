import React from 'react';
import { action } from '@storybook/addon-actions';

import Button, { PureButton } from '@ichef/gypcrete/src/Button';
import FlexRow from 'utils/FlexRow';

export default {
    title: '@ichef/gypcrete|Button',
    component: PureButton,
    subcomponents: {
        'rowComp()': Button,
    },
};

export function BasicUsage() {
    return (
        <FlexRow>
            <Button
                bold
                basic="Black Button"
                aside="Default color"
                tag="Tag"
                icon="add"
                onClick={action('clicked')} />

            <Button
                color="blue"
                basic="Blue"
                aside="Variants"
                tag="Tag"
                icon="add" />

            <Button
                color="red"
                basic="Red"
                aside="Variants"
                tag="Tag"
                icon="add" />

            <Button
                color="white"
                basic="White"
                aside="Variants"
                tag="Tag"
                icon="add" />
        </FlexRow>
    );
}

export function ButtonWithStatus() {
    return (
        <FlexRow>
            <Button
                basic="Loading"
                tag="Tag"
                icon="add"
                status="loading" />

            <Button
                basic="Success"
                tag="Tag"
                icon="add"
                status="success"
                statusOptions={{ autohide: false }} />

            <Button
                basic="Error"
                tag="Tag"
                icon="add"
                status="error"
                errorMsg="Save failed" />
        </FlexRow>
    );
}

function NormalButton(props) {
    return (
        <Button
            basic="Button"
            aside="<button>"
            tag="Tag"
            tagName="button"
            {...props} />
    );
}

function DivButton(props) {
    return (
        <Button
            basic="Button"
            aside="<div>"
            tag="Tag"
            tagName="div"
            {...props} />
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
            {...props} />
    );
}

export function CustomTagButton() {
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

export function DisabledButton() {
    return (
        <div>
            <FlexRow>
                <Button
                    bold
                    disabled
                    basic="Black"
                    aside="Disabled"
                    tag="tag" />
                <Button
                    disabled
                    color="blue"
                    basic="Blue"
                    aside="Disabled"
                    tag="tag" />
                <Button
                    disabled
                    color="red"
                    basic="Red"
                    aside="Disabled"
                    tag="tag" />
                <Button
                    disabled
                    color="white"
                    basic="White"
                    aside="Disabled"
                    tag="tag" />
            </FlexRow>
            <FlexRow>
                <Button
                    bold
                    solid
                    disabled
                    basic="Black"
                    aside="Disabled"
                    tag="tag" />
                <Button
                    solid
                    disabled
                    color="blue"
                    basic="Blue"
                    aside="Disabled"
                    tag="tag" />
                <Button
                    solid
                    disabled
                    color="red"
                    basic="Red"
                    aside="Disabled"
                    tag="tag" />
                <Button
                    solid
                    disabled
                    color="white"
                    basic="White"
                    aside="Disabled"
                    tag="tag" />
            </FlexRow>
        </div>
    );
}

export function ExpandedButton() {
    return (
        <div>
            <FlexRow>
                <Button
                    basic="Expanded Button"
                    align="center"
                    minified={false} />
            </FlexRow>

            <FlexRow>
                <Button
                    solid
                    color="red"
                    basic="Expanded Button"
                    align="center"
                    minified={false} />
            </FlexRow>
        </div>
    );
}

export function SolidButton() {
    return (
        <FlexRow>
            <Button
                bold
                solid
                basic="Black"
                aside="Aside text"
                tag="Solid" />

            <Button
                solid
                color="blue"
                basic="Blue"
                aside="Aside text"
                tag="Solid" />

            <Button
                solid
                color="red"
                basic="Red"
                aside="Aside text"
                tag="Solid" />

            <Button
                solid
                color="white"
                basic="White"
                aside="Aside text"
                tag="Solid" />
        </FlexRow>
    );
}
