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
            clickedInside: false,
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
            if (this.state.clickedInside) {
                this.setState({ clickedInside: false });
                return;
            }

            if (onClickOutside) {
                this.props.onClose();
            }
        }

        handleDocumentTouch = (event) => {
            if (this.state.clickedInside) {
                this.setState({ clickedInside: false });
                return;
            }

            if (onClickOutside) {
                this.delayedClose(event);
            }
        }

        handleInsideClick = (event) => {
            this.setState({ clickedInside: true });

            if (onClickInside) {
                this.props.onClose(event);
            }
        }

        handleInsideTouch = (event) => {
            this.setState({ clickedInside: true });

            if (onClickInside) {
                this.delayedClose(event);
            }
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
