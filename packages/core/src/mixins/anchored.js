import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import documentOffset from 'document-offset';

import getComponentName from '../utils/getComponentName';

const TOP = 'top';
const BOTTOM = 'bottom';
export const ANCHORED_PLACEMENT = { TOP, BOTTOM };

export const anchoredPropTypes = {
    placement: PropTypes.oneOf(Object.values(ANCHORED_PLACEMENT)),
    arrowStyle: PropTypes.objectOf(PropTypes.number),
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

/**
 * anchored() HOC mixin
 * ====================
 * Calculate the absolute position on <body> for the wrapped component,
 * based on specified **anchor** node.
 *
 * Usually used along with `renderToLayer()` mixin.
 *
 * Concept
 * -------
 * The mixin will determine the position related to the given anchor,
 * and tries to place an arrow pointing to the anchor node.
 *
 * The arrow should stay in the Component's width, deducting the
 * “edge padding”.
 *
 * ```
 *                      edge padding
 * ╭╌┊╌╌╌╌╌╌╌/\╌╌╌╌╌╌╌╌┊╌╮
 * ╎ ┊                 ┊ ╎
 * ╎ ┊                 ┊ ╎
 * ╰╌┊╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┊╌╯
 *     arrow safe area
 * ```
 *
 * @param {bool} defaultPlacement the default vertical placement
 * @param {number} edgePadding the number to be deducted when calculating “safe area”
 *
 * @example
 * ```jsx
 * const AnchoredComponent = anchored(options)(Component);
 * return <AnchoredComponent anchor={fooRef} />
 * ```
 */
const anchored = ({
    defaultPlacement = BOTTOM,
    edgePadding = 16,
} = {}) => (WrappedComponent) => {
    const componentName = getComponentName(WrappedComponent);

    class Anchored extends Component {
        static displayName = `anchored(${componentName})`;

        static propTypes = {
            // Expects a ref to a Node or to a React Element
            anchor: PropTypes.oneOfType([
                PropTypes.instanceOf(window.Node),
                PropTypes.instanceOf(Component)
            ])
        };

        static defaultProps = {
            anchor: null,
        };

        state = {
            placement: BOTTOM,
            position: {},
            arrowPosition: {}
        };

        componentDidMount() {
            this.adjustPosition();
        }

        componentWillReceiveProps(nextProps) {
            if (nextProps.anchor !== this.props.anchor) {
                this.adjustPosition(nextProps.anchor);
            }
        }


        // -------------------------------------
        //   Get DOM elements
        // -------------------------------------

        /**
         * Find the underlying DOM node of `props.anchor` for its size and position.
         * `findDOMNode()` is required for this.
         */
        getAnchorDOMNode(fromAnchor = this.props.anchor) {
            if (fromAnchor instanceof window.HTMLElement) {
                return fromAnchor;
            }

            if (fromAnchor instanceof Component) {
                // eslint-disable-next-line react/no-find-dom-node
                return ReactDOM.findDOMNode(fromAnchor);
            }

            return null;
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
        adjustPosition(nextAnchor = this.props.anchor) {
            const anchorNode = this.getAnchorDOMNode(nextAnchor);
            const selfNode = this.getSelfDOMNode();

            if (!anchorNode) {
                return;
            }

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
                defaultPlacement,
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

            const arrowSafeAreaWidth = selfRect.width - (edgePadding * 2);

            switch (true) {
                // Center-aligned
                case (hasSpaceOnLeft && hasSpaceOnRight):
                    nextState.position.left = (anchorOffset.left + anchorHalfWidth) - selfHalfWidth;
                    break;

                // Right-align to the anchor
                case (hasSpaceOnLeft && !hasSpaceOnRight):
                    nextState.position.left =
                        anchorOffset.left + anchorRect.width - selfRect.width;

                    // Calibrate arrow position to stay in safe area
                    nextState.arrowPosition.left = Math.max(
                        // anchorOffset.left - nextState.position.left + anchorHalfWidth
                        selfRect.width - anchorHalfWidth,
                        edgePadding
                    );
                    break;

                // Left-align to the anchor
                default:
                    nextState.position.left = anchorOffset.left;

                    // Calibrate arrow position to stay in safe area
                    nextState.arrowPosition.left = Math.min(
                        anchorHalfWidth,
                        arrowSafeAreaWidth
                    );
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

            if (!anchor) {
                return null;
            }

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
