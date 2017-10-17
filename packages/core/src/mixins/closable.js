import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import keycode from 'keycode';

import getComponentName from '../utils/getComponentName';

const ESCAPE = 'Escape';
const TOUCH_CLOSE_DELAY = 200;

/**
 * `closable()` HOC mixin
 * ====================
 * Provide various of ways to determine when to “close” a component by
 * binding event listeners on `document`.
 *
 * Formally `escapable()`.
 *
 * @param {object} options
 */
const closable = ({
    onEscape = true,
    onClickOutside = false,
    onClickInside = false,
} = {}) => (WrappedComponent) => {
    const componentName = getComponentName(WrappedComponent);

    class Closable extends PureComponent {
        static displayName = `closable(${componentName})`;

        static propTypes = {
            onClose: PropTypes.func,
        };

        static defaultProps = {
            onClose: () => {},
        };

        state = {
            closeDelayTimeout: null,
        };

        componentDidMount() {
            document.addEventListener('keyup', this.handleDocumentKeyup);
            document.addEventListener('click', this.handleDocumentClick);
            document.addEventListener('touchstart', this.handleDocumentTouch);
        }

        componentWillUnmount() {
            document.removeEventListener('keyup', this.handleDocumentKeyup);
            document.removeEventListener('click', this.handleDocumentClick);
            document.removeEventListener('touchstart', this.handleDocumentTouch);
            clearTimeout(this.state.closeDelayTimeout);
        }

        // eslint-disable-next-line class-methods-use-this
        getOptions() {
            return {
                onEscape,
                onClickOutside,
                onClickInside,
            };
        }

        /**
         * Touchstart event fires as soon as finger touches the screen,
         * emulate ghost-click's time delay to fire child events first
         * before trigger the onClose event.
         *
         * @ref http://stackoverflow.com/a/9634715
         */
        delayedClose = (event) => {
            const timeout = setTimeout(
                () => this.props.onClose(event),
                TOUCH_CLOSE_DELAY,
            );
            this.setState({ closeDelayTimeout: timeout });
        }

        captureInsideEvents = (node) => {
            if (node) {
                node.addEventListener('click', this.handleInsideClick);
                node.addEventListener('touchstart', this.handleInsideTouch);
            }
            this.nodeRef = node;
        }

        // Trigger `onClose()` call on Escape keyup if turned on in options.
        handleDocumentKeyup = (event) => {
            if (onEscape && event.keyCode === keycode(ESCAPE)) {
                this.props.onClose(event);
            }
        }

        handleDocumentClick = () => {
            if (onClickOutside) {
                this.props.onClose();
            }
        }

        // Trigger `onClose()` call on any touch if turned on in options.
        handleDocumentTouch = (event) => {
            if (onClickOutside) {
                this.delayedClose(event);
            }
        }

        handleInsideClick = (event) => {
            if (onClickInside) {
                this.props.onClose(event);
            }
            // Stop event from bubbling up so the listeners at document won't hear.
            event.stopPropagation();
        }

        handleInsideTouch = (event) => {
            if (onClickInside) {
                this.delayedClose(event);
            }
            event.stopPropagation();
        }

        render() {
            const { onClose, ...otherProps } = this.props;

            return (
                <div ref={this.captureInsideEvents} role="presentation">
                    <WrappedComponent {...otherProps} />
                </div>
            );
        }
    }

    return Closable;
};

export default closable;
