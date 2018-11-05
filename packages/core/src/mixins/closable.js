import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import keycode from 'keycode';

import getComponentName from '../utils/getComponentName';

const ESCAPE = 'Escape';
const TOUCH_CLOSE_DELAY = 100;

/**
 * `closable()` HOC mixin
 * ====================
 * Provide various of ways to determine when to “close” a component by
 * binding event listeners on `document`.
 *
 * Formerlly `escapable()`.
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
            closable: PropTypes.shape({
                onEscape: PropTypes.bool,
                onClickOutside: PropTypes.bool,
                onClickInside: PropTypes.bool,
            }),
        };

        static defaultProps = {
            onClose: () => {},
            closable: {
                onEscape,
                onClickInside,
                onClickOutside,
            },
        };

        state = {
            closeDelayTimeout: null,
            clickedInside: false,
        };

        componentDidMount() {
            document.addEventListener('keyup', this.handleDocumentKeyup);
            document.addEventListener('click', this.handleDocumentClickOrTouch);
            document.addEventListener('touchend', this.handleDocumentClickOrTouch);
        }

        componentWillUnmount() {
            document.removeEventListener('keyup', this.handleDocumentKeyup);
            document.removeEventListener('click', this.handleDocumentClickOrTouch);
            document.removeEventListener('touchend', this.handleDocumentClickOrTouch);
            clearTimeout(this.state.closeDelayTimeout);
        }

        getOptions() {
            const configuredOptions = {
                onEscape,
                onClickInside,
                onClickOutside,
            };
            const runtimeOptions = this.props.closable;

            return {
                ...configuredOptions,
                ...runtimeOptions,
            };
        }

        /**
         * Delay slightly to fire child events first
         * before trigger the `onClose` event.
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
                node.addEventListener('click', this.handleInsideClickOrTouch);
                node.addEventListener('touchend', this.handleInsideClickOrTouch);
            }
            this.nodeRef = node;
        }

        handleDocumentKeyup = (event) => {
            const options = this.getOptions();

            if (options.onEscape && event.keyCode === keycode(ESCAPE)) {
                this.props.onClose(event);
            }
        }

        handleDocumentClickOrTouch = (event) => {
            const options = this.getOptions();

            if (this.state.clickedInside) {
                this.setState({ clickedInside: false });
                return;
            }

            if (options.onClickOutside) {
                this.delayedClose(event);
            }
        }

        handleInsideClickOrTouch = (event) => {
            const options = this.getOptions();
            this.setState({ clickedInside: true });

            if (options.onClickInside) {
                this.delayedClose(event);
            }
        }

        render() {
            const {
                onClose,
                closable: runtimeOptions,
                className,
                ...otherProps
            } = this.props;

            return (
                <div ref={this.captureInsideEvents} className={className} role="presentation">
                    <WrappedComponent {...otherProps} />
                </div>
            );
        }
    }

    return Closable;
};

export default closable;
