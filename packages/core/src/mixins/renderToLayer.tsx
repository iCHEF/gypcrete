import React, { Component } from 'react';
import { createPortal } from 'react-dom';

import prefixClass from '../utils/prefixClass';
import getComponentName from '../utils/getComponentName';
import randId from '../utils/randId';

import '../styles/RenderToLayer.scss';

const COMPONENT_NAME = prefixClass('base-layer');
const LAYER_ID_PREFIX = 'layer';

export function createLayer() {
    const layer = document.createElement('div');
    layer.className = COMPONENT_NAME;
    layer.id = randId({ prefix: LAYER_ID_PREFIX });

    return layer;
}

interface RenderToLayerState {
    inDOM: boolean
}

/**
 * renderToLayer() HOC mixin
 * =========================
 * Render a component to an node outside of React root,
 * using `React.createPortal()`.
 *
 * @param {React.ComponentType<any>} WrappedComponent
 *
 * @example
 * const ExternalComponent = renderToLayer(Component);
 */
function renderToLayer<P, >(WrappedComponent: React.ComponentType<P>) {
    const componentName = getComponentName(WrappedComponent);

    return class RenderToLayer extends Component<P, RenderToLayerState> {
        static displayName = `renderToLayer(${componentName})`;

        baseLayer: HTMLDivElement;

        state = {
            inDOM: false,
        };

        constructor(props) {
            super(props);
            this.baseLayer = createLayer();
        }

        componentDidMount() {
            document.body.appendChild(this.baseLayer);

            /**
             * Render null before base layer is put in DOM for 'renderToLayer()' mixin.
             *
             * This is the current behavior of v1.x.
             * It prevents an issue with 'anchored()' mixin where it can retrieve
             * incorrect rects from self DOM node when calculating its own position,
             * due to its parent node (the layer) isn't inserted to DOM yet.
             */
            this.setState({ inDOM: true });
        }

        componentWillUnmount() {
            document.body.removeChild(this.baseLayer);
        }

        render() {
            const { inDOM } = this.state;

            return inDOM && createPortal(
                <WrappedComponent {...this.props as P} />,
                this.baseLayer,
            );
        }
    };
}

export default renderToLayer;
