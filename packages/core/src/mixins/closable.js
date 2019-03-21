import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import keycode from 'keycode';

import icBEM from '../utils/icBEM';
import prefixClass from '../utils/prefixClass';
import getComponentName from '../utils/getComponentName';

import '../styles/Closable.scss';

export const COMPONENT_NAME = prefixClass('closable');
const ROOT_BEM = icBEM(COMPONENT_NAME);

const ESCAPE = 'Escape';

/**
 * `closable()` HOC mixin
 * ====================
 * Provide various of ways to determine when to “close” a component by
 * binding event listeners on `document`.
 *
 * Formerlly `escapable()`.
 *
 * @param {object} options
 * @param {boolean=} options.onEscape
 * @param {boolean=} options.onClickOutside
 * @param {boolean=} options.onClickInside
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

        constructor(props) {
            super(props);
            this.clickedInside = false;
        }

        componentDidMount() {
            document.addEventListener('keyup', this.handleDocumentKeyup);
        }

        componentWillUnmount() {
            document.removeEventListener('keyup', this.handleDocumentKeyup);
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
         * @param {KeyboardEvent} event
         */
        handleDocumentKeyup = (event) => {
            const options = this.getOptions();

            if (options.onEscape && event.keyCode === keycode(ESCAPE)) {
                this.props.onClose(event);
            }
        }

        /**
         * @param {React.MouseEvent} event
         */
        handleOuterLayerClick = (event) => {
            const options = this.getOptions();

            if (options.onClickOutside) {
                this.props.onClose(event);
            }
        }

        /**
         * @param {React.MouseEvent} event
         */
        handleInsideClick = (event) => {
            const options = this.getOptions();
            event.stopPropagation();

            if (options.onClickInside) {
                this.props.onClose(event);
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
                <div
                    role="presentation"
                    className={ROOT_BEM.toString()}
                    onClick={this.handleOuterLayerClick}>
                    <div
                        className={className}
                        role="presentation"
                        onClick={this.handleInsideClick}>
                        <WrappedComponent {...otherProps} />
                    </div>
                </div>
            );
        }
    }

    return Closable;
};

export default closable;
