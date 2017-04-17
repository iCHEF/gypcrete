/**
 * renderToLayer() HOC mixin
 * =========================
 * Render a component to an node outside of React root, while still being
 * maintained under React virtual tree.
 *
 * Inspired by material-ui
 * @ref https://github.com/callemall/material-ui/blob/master/src/internal/RenderToLayer.js
 *
 * Original created by @cjies
 * @ref https://github.com/iCHEF/iC-framework-react/pull/66
 *
 * Converted to mixin pattern by @zhusee2
 * @ref https://facebook.github.io/react/blog/2016/07/13/mixins-considered-harmful.html
 *
 * Usage
 * -----
 * const ExternalComponent = renderToLayer(Component);
 */

import React, { Component } from 'react';

// Importing an unstable API method from react-dom
// eslint-disable-next-line camelcase
import ReactDOM, { unstable_renderSubtreeIntoContainer } from 'react-dom';

import getComponentName from '../utils/getComponentName';
import randId from '../utils/randId';

const LAYER_ID_PREFIX = 'layer';

function renderToLayer(WrappedComponent) {
    const componentName = getComponentName(WrappedComponent);

    class RenderToLayer extends Component {
        static displayName = `renderToLayer(${componentName})`;

        constructor(...args) {
            super(...args);

            this.baseLayer = null;
            this.componentRef = null;
        }

        componentDidMount() {
            this.createBaseLayer();
            this.renderComponentToLayer({ withProps: this.props });
        }

        componentWillReceiveProps(nextProps) {
            this.renderComponentToLayer({ withProps: nextProps });
        }

        componentWillUnmount() {
            ReactDOM.unmountComponentAtNode(this.baseLayer);
            this.removeBaseLayer();
        }

        // -------------------------------------
        //   Base Layer
        // -------------------------------------

        /**
         * Create the base layer on <body> to render <Componenet>
         */
        createBaseLayer() {
            const baseLayer = document.createElement('div');
            baseLayer.id = randId({ prefix: LAYER_ID_PREFIX });

            this.baseLayer = baseLayer;
            document.body.appendChild(baseLayer);
        }

        /**
         * Remove base layer from <body>
         */
        removeBaseLayer() {
            if (!this.baseLayer) return;

            document.body.removeChild(this.baseLayer);
            this.baseLayer = null;
        }

        // -------------------------------------
        //   Render
        // -------------------------------------

        /**
         * Renders passed-in <Componenet> to the external base layer,
         * based on given props.
         *
         * @param {Object} withProps - current or next props of <RenderToLayer> wrapper
         */
        renderComponentToLayer({ withProps = this.props } = {}) {
            this.componentRef = unstable_renderSubtreeIntoContainer(
                this, // parentComponent
                <WrappedComponent {...withProps} />,
                this.baseLayer // container
            );
        }

        render() {
            return null;
        }
    }

    return RenderToLayer;
}

export default renderToLayer;
