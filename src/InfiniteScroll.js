// *************************************
//
//   Inspired by react-infinite-scroller
//
//   @ref https://github.com/CassetteRocks/react-infinite-scroller
//
// *************************************

import React, { PureComponent, isValidElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Button from './Button';
import Icon from './Icon';

import icBEM from './utils/icBEM';
import prefixClass from './utils/prefixClass';
import './styles/InfiniteScroll.scss';

const COMPONENT_NAME = prefixClass('infinite-scroll');
const ROOT_BEM = icBEM(COMPONENT_NAME);
export const BEM = {
    root: ROOT_BEM,
    footer: ROOT_BEM.element('footer')
};

class InfiniteScroll extends PureComponent {
    static propTypes = {
        onLoadMore: PropTypes.func.isRequired,
        threshold: PropTypes.number,  // Distance in px before the end of items
        isLoading: PropTypes.bool,
        hasMore: PropTypes.bool,
        disabled: PropTypes.bool,
        useWindowAsScrollContainer: PropTypes.bool,

        // Footer children
        loadingButton: PropTypes.node,
        showMoreButton: PropTypes.node,
        noNewestButton: PropTypes.node
    };

    static defaultProps = {
        threshold: 100,
        isLoading: false,
        hasMore: true,
        disabled: false,
        useWindowAsScrollContainer: false,

        loadingButton: null,
        showMoreButton: null,
        noNewestButton: null
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
     * Get remaining bottom offset
     *
     *      scrollHeight
     *    |-------------|
     *    |             |   <= scrollTop
     *  __|_____________|__
     *  | |             | |
     *  | |             | | <= clientHeight || innerHeight
     *  | |             | |
     *  |_|_____________|_|
     *    |             |   <= remainingBottomOffset
     *    |_____________|
     *
     * @return {Number}
     */
    getRemainingBottomOffset = () => {
        const scrollNode = this.scrollNode;
        const { useWindowAsScrollContainer } = this.props;

        if (useWindowAsScrollContainer) {
            const windowBodyElement = document.documentElement
                || document.body.parentNode
                || document.body;

            // Get window scrollHeight and scrollTop
            const totalScrollHeight = this.calculateElementTopPosition(scrollNode)
                + scrollNode.offsetHeight;
            const scrollTop = window.pageYOffset || windowBodyElement.scrollTop;

            return totalScrollHeight
                - (scrollTop + window.innerHeight);
        }

        // Get parent node
        const parentNode = this.scrollNode.parentNode;

        return scrollNode.scrollHeight
            - (parentNode.scrollTop + parentNode.clientHeight);
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

        return element.offsetTop
            + this.calculateElementTopPosition(element.offsetParent);
    }

    /**
     * Scroll listener
     */
    handleScrollListener = (event) => {
        const { onLoadMore, threshold, hasMore, isLoading } = this.props;
        const remainingBottomOffset = this.getRemainingBottomOffset();

        if (!isLoading
                && hasMore
                && threshold > remainingBottomOffset
                && typeof onLoadMore === 'function') {
            onLoadMore(event);
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
    //   Render footer
    // -------------------------------------

    renderLoadingButton() {
        const { loadingButton } = this.props;

        if (isValidElement(loadingButton)) {
            return loadingButton;
        }

        return (
            <Button
                disabled
                color="black"
                align="center"
                icon={<Icon type="loading" spinning />}
                basic={loadingButton}
                minified={false} />
        );
    }

    renderFooterButton(buttonItem) {
        const { onLoadMore } = this.props;

        if (!buttonItem) {
            return null;
        }

        if (isValidElement(buttonItem)) {
            return buttonItem;
        }

        return (
            <Button
                color="black"
                align="center"
                basic={buttonItem}
                minified={false}
                onClick={onLoadMore} />
        );
    }

    /**
     * Render footer child
     */
    renderFooter() {
        const {
            isLoading,
            hasMore,
            showMoreButton,
            noNewestButton
        } = this.props;
        let footerChild = null;

        if (isLoading) {
            footerChild = this.renderLoadingButton();
        } else if (hasMore) {
            footerChild = this.renderFooterButton(showMoreButton);
        } else {
            footerChild = this.renderFooterButton(noNewestButton);
        }

        return (
            <div className={BEM.footer}>
                {footerChild}
            </div>
        );
    }

    // -------------------------------------
    //   Renderer
    // -------------------------------------

    render() {
        const {
            onLoadMore,
            threshold,
            isLoading,
            hasMore,
            disabled,
            useWindowAsScrollContainer,
            // Footer children
            loadingButton,
            showMoreButton,
            noNewestButton,

            children,
            className,
            style,
            ...rootProps
        } = this.props;

        // Get classnames and styles`
        const rootClassName = classNames(`${BEM.root}`, className);

        return (
            <div
                {...rootProps}
                ref={(ref) => { this.scrollNode = ref; }}
                className={rootClassName}>
                {children}
                {!disabled && this.renderFooter()}
            </div>
        );
    }
}

export default InfiniteScroll;
