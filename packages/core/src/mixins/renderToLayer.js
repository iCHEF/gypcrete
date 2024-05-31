import omit from 'lodash.omit';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

import prefixClass from '../utils/prefixClass';
import getComponentName from '../utils/getComponentName';
import randId from '../utils/randId';

import '../styles/RenderToLayer.scss';

const COMPONENT_NAME = prefixClass('base-layer');
const LAYER_ID_PREFIX = 'layer';

export function createLayer({ zIndex = null } = {}) {
  const layer = document.createElement('div');
  layer.className = COMPONENT_NAME;
  layer.id = randId({ prefix: LAYER_ID_PREFIX });
  if (typeof zIndex === 'number') {
    layer.style.zIndex = zIndex;
  }

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

    static propTypes = {
      ...WrappedComponent.propTypes,
      zIndex: PropTypes.number,
    };

    static defaultProps = {
      ...WrappedComponent.defaultProps,
      zIndex: undefined,
    };

    state = {
      inDOM: false,
    };

    constructor(props) {
      super(props);
      this.baseLayer = createLayer({ zIndex: props.zIndex });
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
      const childrenProps = omit(this.props, ['zIndex']);

      return inDOM && createPortal(<WrappedComponent {...childrenProps} />, this.baseLayer);
    }
  }

  return RenderToLayer;
}

export default renderToLayer;
