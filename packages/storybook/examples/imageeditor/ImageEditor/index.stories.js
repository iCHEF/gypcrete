import React from 'react';

import ImageEditor from '@ichef/gypcrete-imageeditor/src/index';

import handleLoadSuccess from './utils/handleLoadSuccess';
import handleCropChange from './utils/handleCropChange';

const EXAMPLE_IMAGE = 'https://i.imgur.com/VfBVxsO.jpg';

export default {
    title: '@ichef/gypcrete-imageeditor|ImageEditor',
    component: ImageEditor,
};

export const basicUsage = () => (
    <ImageEditor
        control
        image={EXAMPLE_IMAGE}
        onLoadSuccess={handleLoadSuccess}
        onCropChange={handleCropChange} />
);

export const readOnlyMode = () => (
    <ImageEditor
        readOnly
        control
        image={EXAMPLE_IMAGE}
        onLoadSuccess={handleLoadSuccess}
        onCropChange={handleCropChange} />
);

export const setInitialCrop = () => (
    <ImageEditor
        control
        image={EXAMPLE_IMAGE}
        initCropRect={{
            x: 0.1819,
            y: 0.0647,
            width: 0.3057,
            height: 0.5882,
        }} />
);

export const customizeScaleRange = () => (
    <ImageEditor
        control
        minScale={1}
        maxScale={10}
        image={EXAMPLE_IMAGE} />
);

export const imagePlaceholder = () => (
    <ImageEditor control />
);

export const loadingMode = () => (
    <ImageEditor
        control
        loading
        image={EXAMPLE_IMAGE} />
);
