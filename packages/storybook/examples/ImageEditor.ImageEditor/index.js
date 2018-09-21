import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import ImageEditor from '@ichef/gypcrete-imageeditor/src/index';

import handleLoadSuccess from './utils/handleLoadSuccess';
import handleCropChange from './utils/handleCropChange';
import getPropTables from '../../utils/getPropTables';

const EXAMPLE_IMAGE = 'https://i.imgur.com/VfBVxsO.jpg';

storiesOf('[ImageEditor] ImageEditor', module)
    .add('Basic usage', withInfo()(() => (
        <ImageEditor
            control
            image={EXAMPLE_IMAGE}
            onLoadSuccess={handleLoadSuccess}
            onCropChange={handleCropChange} />
    )))
    .add('Read-only mode', withInfo()(() => (
        <ImageEditor
            readOnly
            control
            image={EXAMPLE_IMAGE}
            onLoadSuccess={handleLoadSuccess}
            onCropChange={handleCropChange} />
    )))
    .add('Set init crop', withInfo()(() => (
        <ImageEditor
            control
            image={EXAMPLE_IMAGE}
            initCropRect={{
                x: 0.1819,
                y: 0.0647,
                width: 0.3057,
                height: 0.5882,
            }} />
    )))
    .add('Custom scale range', withInfo()(() => (
        <ImageEditor
            control
            minScale={1}
            maxScale={10}
            image={EXAMPLE_IMAGE} />
    )))
    .add('Placeholder', withInfo()(() => (
        <ImageEditor control />
    )))
    .add('Loading mode', withInfo()(() => (
        <ImageEditor
            control
            loading
            image={EXAMPLE_IMAGE} />
    )))
    .add('props', getPropTables([ImageEditor]));
