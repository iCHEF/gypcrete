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
 */
// @ts-expect-error ts-migrate(4025) FIXME: Exported variable 'closable' has or is using priva... Remove this comment to see the full error message
const closable = ({
    onEscape = true,
    onClickOutside = false,
    onClickInside = false,
    stopEventPropagation = true,
} = {}) => (WrappedComponent) => {
    const componentName = getComponentName(WrappedComponent);

    const mixinConfigs = {
        onEscape,
        onClickOutside,
        onClickInside,
        stopEventPropagation,
    };

    class Closable extends PureComponent {
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
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'closable' does not exist on type 'Readon... Remove this comment to see the full error message
            const { closable: runtimeOptions } = this.props;

            /** @type {typeof mixinDefaults} */
            const actualOptions = {
                ...mixinConfigs,
                ...runtimeOptions,
            };

            return actualOptions;
        }

        /**
         * @param {KeyboardEvent} event
         */
        handleDocumentKeyup = (event) => {
            const options = this.getOptions();

            if (options.onEscape && event.keyCode === keycode(ESCAPE)) {
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'onClose' does not exist on type 'Readonl... Remove this comment to see the full error message
                this.props.onClose(event);
            }
        }

        /**
         * @param {React.MouseEvent} event
         */
        handleOuterLayerClick = (event) => {
            const options = this.getOptions();

            if (options.stopEventPropagation) {
                event.stopPropagation();
            }

            if (options.onClickOutside) {
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'onClose' does not exist on type 'Readonl... Remove this comment to see the full error message
                this.props.onClose(event);
            }
        }

        /**
         * @param {React.MouseEvent} event
         */
        handleInsideClick = (event) => {
            const options = this.getOptions();

            if (options.onClickInside) {
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'onClose' does not exist on type 'Readonl... Remove this comment to see the full error message
                this.props.onClose(event);
            }
        }

        render() {
            const {
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'onClose' does not exist on type 'Readonl... Remove this comment to see the full error message
                onClose,
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'closable' does not exist on type 'Readon... Remove this comment to see the full error message
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
                        {...otherProps} />
                </>
            );
        }
    }

    return Closable;
};

export default closable;
