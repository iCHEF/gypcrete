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
function renderToLayer(WrappedComponent) {
    const componentName = getComponentName(WrappedComponent);

    class RenderToLayer extends Component {
        static displayName = `renderToLayer(${componentName})`;

        state = {
            inDOM: false,
        };

        constructor(props) {
            super(props);
            this.baseLayer = createLayer();
        }

        componentDidMount() {
            document.body.appendChild(this.baseLayer);
            this.setState({ inDOM: true });
        }

        componentWillUnmount() {
            document.body.removeChild(this.baseLayer);
        }

        render() {
            const { inDOM } = this.state;

            return inDOM && createPortal(
                <WrappedComponent {...this.props} />,
                this.baseLayer,
            );
        }
    }

    return RenderToLayer;
}

export default renderToLayer;
