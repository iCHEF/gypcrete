// *************************************
//
//   Inspired by react-infinite-scroller
//
//   @ref https://github.com/CassetteRocks/react-infinite-scroller
//
// *************************************

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import TextLabel from './TextLabel';
import Icon from './Icon';

import icBEM from './utils/icBEM';
import prefixClass from './utils/prefixClass';
import './styles/InfiniteScroll.scss';

const COMPONENT_NAME = prefixClass('infinite-scroll');
const ROOT_BEM = icBEM(COMPONENT_NAME);
const BEM = {
    root: ROOT_BEM,
    footer: ROOT_BEM.element('footer')
};

export const DefaultLoadingSpinner = () => (
    <TextLabel
        icon={<Icon type="loading" color="gray" spinning />}
        align="center" />
);

class InfiniteScroll extends PureComponent {
    static propTypes = {
        onInfiniteLoad: PropTypes.func.isRequired,
        scrollThreshold: PropTypes.number,  // Distance in px before the end of items
        loadingSpinner: PropTypes.node,     // Loading spinner element
        endMessage: PropTypes.node,

        isLoading: PropTypes.bool,
        hasMore: PropTypes.bool,
        disabled: PropTypes.bool,
        useWindowAsScrollContainer: PropTypes.bool
    };

    static defaultProps = {
        scrollThreshold: 100,
        loadingSpinner: <DefaultLoadingSpinner />,
        endMessage: null,

        isLoading: false,
        hasMore: true,
        disabled: false,
        useWindowAsScrollContainer: false
    }

    componentDidMount() {
        // If disabled, do nothing
        if (!this.props.disabled) {
            this.attachScrollListener();
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.disabled !== prevProps.disabled) {
            if (this.props.disabled) {
                this.detachScrollListener();
            } else {
                this.attachScrollListener();
            }
        }
    }

    componentWillUnmount() {
        this.detachScrollListener();
    }

    // -------------------------------------
    //   Scroll listener
    // -------------------------------------

    /**
     * Get the offset while scrolling
     *
     * @return {Number}
     */
    getScrollOffset = () => {
        if (this.props.useWindowAsScrollContainer) {
            const windowBodyElement = document.documentElement
                || document.body.parentNode
                || document.body;
            const scrollTop = (window.pageYOffset !== undefined)
                ? window.pageYOffset
                : windowBodyElement.scrollTop;

            /* eslint-disable no-mixed-operators */
            return this.calculateElementTopPosition(this.scrollNode)
                + this.scrollNode.offsetHeight
                - scrollTop
                - window.innerHeight;
            /* eslint-enable */
        }

        return this.scrollNode.scrollHeight
            - this.scrollNode.parentNode.scrollTop
            - this.scrollNode.parentNode.clientHeight;
    }

    /**
     * Calculate top position of selected element
     *
     * @param {Element} element
     */
    calculateElementTopPosition = (element) => {
        if (!element) {
            return 0;
        }

        return element.offsetTop + this.calculateElementTopPosition(element.offsetParent);
    }

    /**
     * Scroll listener
     */
    handleScrollListener = (event) => {
        const { onInfiniteLoad, scrollThreshold, hasMore, isLoading } = this.props;
        const scrollOffset = this.getScrollOffset();

        if (!isLoading
                && hasMore
                && Number(scrollThreshold) > scrollOffset
                && typeof onInfiniteLoad === 'function') {
            onInfiniteLoad(event);
        }
    }

    // -------------------------------------
    //   Attach and detach listener
    // -------------------------------------

    attachScrollListener = () => {
        const { useWindowAsScrollContainer } = this.props;
        const scrollContainer = useWindowAsScrollContainer
            ? window
            : this.scrollNode.parentNode;

        scrollContainer.addEventListener('scroll', this.handleScrollListener);
    }

    detachScrollListener = () => {
        const { useWindowAsScrollContainer } = this.props;
        const scrollContainer = useWindowAsScrollContainer
            ? window
            : this.scrollNode.parentNode;

        scrollContainer.removeEventListener('scroll', this.handleScrollListener);
    }

    // -------------------------------------
    //   Renderer
    // -------------------------------------

    /**
     * Render footer,
     * whether loadingSpinner or endMessage as child
     */
    renderFooter() {
        const {
            loadingSpinner,
            endMessage,
            isLoading,
            hasMore,
            disabled
        } = this.props;
        let footerChild = null;

        if (disabled) {
            return null;
        }

        if (isLoading) {
            footerChild = loadingSpinner;
        } else if (!hasMore && endMessage) {
            footerChild = endMessage;
        } else {
            return null;
        }

        return (
            <div className={BEM.footer}>
                {footerChild}
            </div>
        );
    }

    render() {
        const {
            onInfiniteLoad,
            scrollThreshold,
            loadingSpinner,
            endMessage,

            isLoading,
            hasMore,
            disabled,
            useWindowAsScrollContainer,
            children,
            className,
            style,
            ...rootProps
        } = this.props;

        // Get classnames and styles
        const rootClassName = classNames(`${BEM.root}`, className);

        return (
            <div
                {...rootProps}
                ref={(ref) => { this.scrollNode = ref; }}
                className={rootClassName}>
                {children}
                {this.renderFooter()}
            </div>
        );
    }
}

export default InfiniteScroll;
