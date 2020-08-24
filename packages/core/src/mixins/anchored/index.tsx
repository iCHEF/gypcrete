import React, { Component } from 'react';
import PropTypes from 'prop-types';
import memoize from 'memoize-one';

import getComponentName from '../../utils/getComponentName';
import getPositionState, {
    PLACEMENT,
    // @ts-expect-error ts-migrate(2724) FIXME: Module '"./getPositionState"' has no exported memb... Remove this comment to see the full error message
    // eslint-disable-next-line import/named, no-unused-vars, @typescript-eslint/no-unused-vars
    Placement, // type alias
} from './getPositionState';

export { PLACEMENT as ANCHORED_PLACEMENT };

export const anchoredPropTypes = {
    placement: PropTypes.oneOf(Object.values(PLACEMENT)),
    arrowStyle: PropTypes.objectOf(PropTypes.number),
    nodeRef: PropTypes.func,
};

function filterDOMNode(node) {
    if (node instanceof HTMLElement) {
        return node;
    }
    return null;
}

/**
 * anchored() HOC mixin
 * ====================
 * Calculate the absolute position on <body> for the wrapped component,
 * based on specified **anchor** node.
 *
 * You should manually set ref to:
 *   1. The DOM node of *anchor element* by assigning ref via `anchor` prop, and
 *   2. The DOM node of *wrapped component* via `nodeRef` prop passed onto it,
 *
 * so this mixin can determine which DOM node to use for positioning.
 *
 * Usually used along with `renderToLayer()` mixin.
 *
 * Concept
 * -------
 * The mixin will determine the position related to the given anchor,
 * and tries to place an arrow pointing to the anchor node.
 *
 * For positioning logic, please refer to `getPositionState.js`.
 *
 * @example
 ```jsx
// configuring wrapped component
function Component({ placement, arrowStyle, style, nodeRef }) {
    return (
        <div ref={nodeRef} className={placement} style={style}>
            <div className="arrow" style={arrowStyle} />
            content body
        </div>
    );
}
const AnchoredComponent = anchored(options)(Component);

// setting anchor
class Example extends React.Component {
    static propTypes = {
        show: PropTypes.bool.isRequired,
    };

    anchorRef = React.createRef();

    render() {
        return (
            <div>
                <div className="anchor" ref={this.anchorRef} />
                {this.props.show && (
                    <AnchoredComponent anchor={this.anchorRef.current} />
                )}
            </div>
        );
    }
}
 ```
 * @param {object} options
 * @param {Placement} options.defaultPlacement - the default vertical placement
 * @param {number} options.edgePadding - the number to be deducted when calculating “safe area”
 */

// @ts-expect-error ts-migrate(4025) FIXME: Exported variable 'anchored' has or is using priva... Remove this comment to see the full error message
const anchored = ({
    defaultPlacement = PLACEMENT.BOTTOM,
    edgePadding = 16,
} = {}) => (WrappedComponent) => {
    const componentName = getComponentName(WrappedComponent);

    class Anchored extends Component {
        static displayName = `anchored(${componentName})`;

        static propTypes = {
            anchor: PropTypes.instanceOf(window.HTMLElement),
        };

        static defaultProps = {
            anchor: null,
        };

        state = {
            selfNode: null,
        };

        getPositions = memoize(getPositionState(defaultPlacement, edgePadding));

        setSelfNode = (nodeRef) => {
            this.setState({ selfNode: nodeRef });
        }

        render() {
            const {
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'anchor' does not exist on type 'Readonly... Remove this comment to see the full error message
                anchor,
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'style' does not exist on type 'Readonly<... Remove this comment to see the full error message
                style,
                ...otherProps
            } = this.props;

            const { selfNode } = this.state;

            if (!anchor) {
                return null;
            }

            const {
                placement,
                position,
                arrowPosition,
            } = this.getPositions(
                filterDOMNode(anchor),
                filterDOMNode(selfNode),
            );

            const mergedStyle = {
                position: 'absolute',
                ...position,
                ...style,
            };

            return (
                <WrappedComponent
                    {...otherProps}
                    placement={placement}
                    arrowStyle={arrowPosition}
                    style={mergedStyle}
                    nodeRef={this.setSelfNode} />
            );
        }
    }

    return Anchored;
};

export default anchored;
