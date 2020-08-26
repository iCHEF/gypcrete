/* eslint-disable indent */
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

export interface ClosableProps {
    /**
     * Yes, this might receive both react synthetic event or native DOM event.
     * Might be a design error.
     */
    onClose?: (event?: React.SyntheticEvent | KeyboardEvent) => void;
    closable?: {
        onEscape: boolean,
        onClickOutside: boolean,
        onClickInside: boolean,
        stopEventPropagation: boolean,
    },
}

/**
 * `closable()` HOC mixin
 * ====================
 * Provide various of ways to determine when to “close” a component by
 * binding event listeners on `document`.
 *
 * Formerlly `escapable()`.
 */
const closable = <P, >({
    onEscape = true,
    onClickOutside = false,
    onClickInside = false,
    stopEventPropagation = true,
} = {}) => (WrappedComponent: React.ComponentType<P>) => {
    const componentName = getComponentName(WrappedComponent);

    const mixinConfigs = {
        onEscape,
        onClickOutside,
        onClickInside,
        stopEventPropagation,
    };

    return class Closable extends PureComponent<P & ClosableProps> {
        static displayName = `closable(${componentName})`;

        static propTypes = {
            onClose: PropTypes.func,
            closable: PropTypes.shape({
                onEscape: PropTypes.bool,
                onClickOutside: PropTypes.bool,
                onClickInside: PropTypes.bool,
                stopEventPropagation: PropTypes.bool,
            }),
        };

        static defaultProps = {
            onClose: () => {},
            closable: mixinConfigs,
        };

        componentDidMount() {
            document.addEventListener('keyup', this.handleDocumentKeyup);
        }

        componentWillUnmount() {
            document.removeEventListener('keyup', this.handleDocumentKeyup);
        }

        getOptions() {
            const { closable: runtimeOptions } = this.props;

            const actualOptions = {
                ...mixinConfigs,
                ...runtimeOptions,
            };

            return actualOptions;
        }

        handleDocumentKeyup = (event: KeyboardEvent) => {
            const options = this.getOptions();

            if (options.onEscape && event.keyCode === keycode(ESCAPE)) {
                this.props.onClose(event);
            }
        }

        handleOuterLayerClick = (event: React.SyntheticEvent) => {
            const options = this.getOptions();

            if (options.stopEventPropagation) {
                event.stopPropagation();
            }

            if (options.onClickOutside) {
                this.props.onClose(event);
            }
        }

        handleInsideClick = (event: React.SyntheticEvent) => {
            const options = this.getOptions();

            if (options.onClickInside) {
                this.props.onClose(event);
            }
        }

        render() {
            const {
                onClose,
                closable: runtimeOptions,
                ...otherProps
            } = this.props;

            return (
                <>
                    <div
                        role="presentation"
                        className={ROOT_BEM.toString()}
                        onClick={this.handleOuterLayerClick} />
                    <WrappedComponent
                        onInsideClick={this.handleInsideClick}
                        {...otherProps as P} />
                </>
            );
        }
    };
};

export default closable;
