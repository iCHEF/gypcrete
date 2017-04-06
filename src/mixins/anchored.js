/**
 * anchored() HOC mixin
 * ====================
 * Calculate the absolute position on <body> for the wrapped component,
 * based on specified **anchor** node.
 *
 * Usually used along with `renderToLayer()` mixin.
 *
 * Usage
 * -----
 * const AnchoredComponent = anchored(options)(Component);
 * return <AnchoredComponent anchor={fooRef} />
 */
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import documentOffset from 'document-offset';

import getComponentName from '../utils/getComponentName';

const TOP = 'top';
const BOTTOM = 'bottom';
export const ANCHORED_PLACEMENT = { TOP, BOTTOM };

export const anchoredPropTypes = {
    placement: PropTypes.oneOf(Object.values(ANCHORED_PLACEMENT)),
    arrowStyle: PropTypes.objectOf(PropTypes.number),
};

const DEFAULT_OPTIONS = {
    padding: 16,
    defaultPlacement: BOTTOM
};

/**
 * Determine if `defaultPlacement` can be achieved, based on boundery spacing.
 *
 * @param {Sting} defaultPlacement - TOP || BOTTOM
 * @param {Bool} hasSpaceAbove
 * @param {Bool} hasSpaceBelow
 */
function getVerticalPlacement(defaultPlacement, hasSpaceAbove, hasSpaceBelow) {
    if (defaultPlacement === TOP) {
        return hasSpaceAbove ? TOP : BOTTOM;
    }

    return hasSpaceBelow ? BOTTOM : TOP;
}

const anchored = (options = {}) => (WrappedComponent) => {
    const componentName = getComponentName(WrappedComponent);

    const anchoredOptions = {
        ...DEFAULT_OPTIONS,
        ...options
    };

    class Anchored extends Component {
        static displayName = `anchored(${componentName})`;

        static propTypes = {
            // Expects a ref to a Node or to a React Element
            anchor: PropTypes.oneOfType([
                PropTypes.instanceOf(window.Node),
                PropTypes.instanceOf(Component)
            ]).isRequired
        };

        state = {
            placement: BOTTOM,
            position: {},
            arrowPosition: {}
        };

        componentDidMount() {
            this.adjustPosition();
        }


        // -------------------------------------
        //   Get DOM elements
        // -------------------------------------

        /**
         * Find the underlying DOM node of `props.anchor` for its size and position.
         * `findDOMNode()` is required for this.
         */
        getAnchorDOMNode() {
            const { anchor } = this.props;

            if (anchor instanceof window.Node) {
                return anchor;
            }

            if (anchor instanceof Component) {
                // eslint-disable-next-line react/no-find-dom-node
                return ReactDOM.findDOMNode(anchor);
            }

            throw new Error('Unable to locate anchor element on DOM.');
        }

        /**
         * Find the DOM node of this component, which should be the same
         * root node of `<WrappedComponent>`, for its size and position.
         *
         * `findDOMNode()` is required for this.
         */
        getSelfDOMNode() {
            // eslint-disable-next-line react/no-find-dom-node
            return ReactDOM.findDOMNode(this);
        }


        // -------------------------------------
        //   Adjust component's position
        // -------------------------------------

        /**
         * Adjust popover position based on spacing around anchor element,
         * then set new position to state.
         *
         * ClientRect: element's positions related to viewport.
         * Offset: element's position related to document.
         */
        adjustPosition() {
            const anchorNode = this.getAnchorDOMNode();
            const selfNode = this.getSelfDOMNode();

            const anchorRect = anchorNode.getBoundingClientRect();
            const anchorOffset = documentOffset(anchorNode); // offset = { top,left }
            const anchorHalfWidth = anchorRect.width / 2;

            const selfRect = selfNode.getBoundingClientRect();
            const selfHalfWidth = selfRect.width / 2;

            const nextState = {
                placement: undefined,
                position: {},
                arrowPosition: {}
            };

            // -------------------------------------
            //   Determine vertical position
            // -------------------------------------
            const hasSpaceAbove = anchorRect.top >= selfRect.height;
            const hasSpaceBelow = (window.innerHeight - anchorRect.bottom) >= selfRect.height;

            nextState.placement = getVerticalPlacement(
                anchoredOptions.defaultPlacement,
                hasSpaceAbove,
                hasSpaceBelow,
            );

            if (nextState.placement === TOP) {
                nextState.position.top = anchorOffset.top - selfRect.height;
            } else {
                nextState.position.top = anchorOffset.top + anchorRect.height;
            }

            // -------------------------------------
            //   Determine horizontal position
            //
            //   #TODO: Fix the arrow's position if
            //          anchor is multi-line text.
            //          (May point at end of anchor)
            // -------------------------------------
            const hasSpaceOnLeft = anchorRect.left >= selfHalfWidth;
            const hasSpaceOnRight = (window.innerWidth - anchorRect.right) >= selfHalfWidth;

            switch (true) {
                // Center-aligned
                case (hasSpaceOnLeft && hasSpaceOnRight):
                    nextState.position.left = (anchorOffset.left + anchorHalfWidth) - selfHalfWidth;
                    break;

                // Child placed on the left (right-aligned)
                case (hasSpaceOnLeft && !hasSpaceOnRight):
                    nextState.position.left =
                        (anchorOffset.left + anchorRect.width + anchoredOptions.padding)
                            - selfRect.width;

                    nextState.arrowPosition.left =
                        selfRect.width - anchoredOptions.padding - anchorHalfWidth;
                    break;

                // Child placed on the right (left-aligned)
                default:
                    nextState.position.left = anchorOffset.left - anchoredOptions.padding;
                    nextState.arrowPosition.left = anchoredOptions.padding + anchorHalfWidth;
                    break;
            }

            this.setState(nextState);
        }

        // -------------------------------------
        //   Renders
        // -------------------------------------

        render() {
            const {
                anchor,
                style,
                ...otherProps,
            } = this.props;

            const mergedStyle = {
                position: 'absolute',
                ...this.state.position,
                ...style,
            };

            return (
                <WrappedComponent
                    {...otherProps}
                    placement={this.state.placement}
                    arrowStyle={this.state.arrowPosition}
                    style={mergedStyle} />
            );
        }
    }

    return Anchored;
};

export default anchored;
