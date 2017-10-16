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
    onAnyClick = false,
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
            document.addEventListener('keyup', this.handleKeyup);
            document.addEventListener('click', this.handleClick);
            document.addEventListener('touchstart', this.handleTouch);
        }

        componentWillUnmount() {
            document.removeEventListener('keyup', this.handleKeyup);
            document.removeEventListener('click', this.handleClick);
            document.removeEventListener('touchstart', this.handleTouch);
            clearTimeout(this.state.closeDelayTimeout);
        }

        getOptions() {
            return {
                onEscape,
                onAnyClick,
            };
        }

        // Trigger `onClose()` call on Escape keyup if turned on in options.
        handleKeyup = (event) => {
            if (onEscape && event.keyCode === keycode(ESCAPE)) {
                this.props.onClose(event);
            }
        }

        // Trigger `onClose()` call on any click if turned on in options.
        handleClick = (event) => {
            if (onAnyClick) {
                this.props.onClose(event);
            }
        }

        // Trigger `onClose()` call on any touch if turned on in options.
        handleTouch = (event) => {
            if (onAnyClick) {
                /**
                 * Touchstart event fires as soon as finger touches the screen,
                 * emulate ghost-click's time delay to fire child events first
                 * before trigger the onClose event.
                 *
                 * @ref http://stackoverflow.com/a/9634715
                 */
                const timeout = setTimeout(
                    () => this.props.onClose(event),
                    TOUCH_CLOSE_DELAY,
                );
                this.setState({ closeDelayTimeout: timeout });
            }
        }

        render() {
            const { onClose, ...otherProps } = this.props;

            return <WrappedComponent {...otherProps} />;
        }
    }

    return Closable;
};

export default closable;
