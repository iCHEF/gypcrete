import React, { Component } from 'react';
import PropTypes from 'prop-types';
import keycode from 'keycode';

import getComponentName from '../utils/getComponentName';

const createEscapeListener = callback => (event) => {
    if (event.keyCode === keycode('Escape')) {
        if (typeof callback === 'function') callback(event);
    }
};

function escapable(WrappedComponent) {
    const componentName = getComponentName(WrappedComponent);

    return class extends Component {
        static displayName = `escapable(${componentName})`;

        static propTypes = {
            onEscape: PropTypes.func
        };

        static defaultProps = {
            onEscape: () => {}
        };


        componentDidMount() {
            this.keyUpListener = createEscapeListener(this.props.onEscape);
            document.addEventListener('keyup', this.keyUpListener);
        }

        componentWillUnmount() {
            document.removeEventListener('keyup', this.keyUpListener);
        }

        render() {
            // Stripe callback prop from <WrappedComponent>
            // eslint-disable-next-line no-unused-vars
            const { onEscape, ...otherProps } = this.props;
            return <WrappedComponent {...otherProps} />;
        }
    };
}

export default escapable;
