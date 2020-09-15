import React, { PureComponent, isValidElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import documentOffset from 'document-offset';

import Button from './Button';
import TextLabel from './TextLabel';
import Icon from './Icon';

import icBEM from './utils/icBEM';
import prefixClass from './utils/prefixClass';
import './styles/InfiniteScroll.scss';

const COMPONENT_NAME = prefixClass('infinite-scroll');
const ROOT_BEM = icBEM(COMPONENT_NAME);
export const BEM = {
    root: ROOT_BEM,
    footer: ROOT_BEM.element('footer'),
};

const FILL_SPACE_TYPE = {
    AUTO: 'auto',
    MANUAL: 'manual',
};


/**
 * <InfiniteScroll>
 * ===
 *
 * Inspired by `react-infinite-scroller`.
 *
 * @ref https://github.com/CassetteRocks/react-infinite-scroller
 */
class InfiniteScroll extends PureComponent {
    static propTypes = {
        onLoadMore: PropTypes.func.isRequired,
        threshold: PropTypes.number, // Distance in px before the end of items
        isLoading: PropTypes.bool,
        hasMore: PropTypes.bool,
        usePageAsContainer: PropTypes.bool,
        fillSpace: PropTypes.oneOf(Object.values(FILL_SPACE_TYPE)),

        // Footer children
        loadingLabel: PropTypes.node,
        showMoreButton: PropTypes.node,
        noNewestButton: PropTypes.node,
    };

    static defaultProps = {
        threshold: 100,
        isLoading: false,
        hasMore: true,
        usePageAsContainer: false,
        fillSpace: FILL_SPACE_TYPE.MANUAL,

        loadingLabel: null,
        showMoreButton: null,
        noNewestButton: null,
    }

    componentDidMount() {
        this.attachScrollListener();
        this.loadMoreToFillSpace();
    }

    componentDidUpdate() {
        // Auto trigger onLoadMore
        this.loadMoreToFillSpace();
    }

    componentWillUnmount() {
        this.detachScrollListener();
    }

    // -------------------------------------
    //   Calculate remaining bottom offset
    //   while scrolling
    // -------------------------------------

    /**
     * Get scrollNode's height
     *
     * @return {Number}
     */
    getScrollNodeHeight = () => {
        const { usePageAsContainer } = this.props;

        if (usePageAsContainer) {
            const scrollNodeOffset = documentOffset(this.scrollNode) || {};
            const scrollNodeTopOffset = scrollNodeOffset.top || 0;

            return scrollNodeTopOffset + this.scrollNode.offsetHeight;
        }

        return this.scrollNode.scrollHeight;
    }

    /**
     * Get container's height
     *
     * @return {Number}
     */
    getContainerHeight = () => {
        const { usePageAsContainer } = this.props;

        if (usePageAsContainer) {
            return window.innerHeight;
        }

        return this.scrollNode.parentNode.clientHeight;
    }

    /**
     * Get container's scrollTop
     *
     * @return {Number}
     */
    getContainerScrollTop = () => {
        const { usePageAsContainer } = this.props;

        if (usePageAsContainer) {
            const windowBodyElement = document.documentElement
                || document.body.parentNode
                || document.body;
            return window.pageYOffset || windowBodyElement.scrollTop;
        }

        return this.scrollNode.parentNode.scrollTop;
    }

    /**
     * Get remaining bottom offset
     *
     *    scrollNodeHeight
     *    |-------------|
     *    |             |   <= scrollTop
     *  __|_____________|__
     *  | |             | |
     *  | |             | | <= containerHeight
     *  | |             | |
     *  |_|_____________|_|
     *    |             |   <= remainingBottomOffset
     *    |_____________|
     *
     * @return {Number}
     */
    getRemainingBottomOffset = () => {
        const scrollNodeHeight = this.getScrollNodeHeight();
        const containerHeight = this.getContainerHeight();
        const containerScrollTop = this.getContainerScrollTop();

        return scrollNodeHeight
            - (containerScrollTop + containerHeight);
    }

    // -------------------------------------
    //   Attach and detach scroll listener
    // -------------------------------------

    /**
     * Auto trigger onLoadMore if scrollNode's height
     * smaller than 2 times of its container's height
     */
    loadMoreToFillSpace = (event) => {
        const { onLoadMore, hasMore, isLoading, fillSpace } = this.props;

        if (!isLoading
                && hasMore
                && fillSpace === FILL_SPACE_TYPE.AUTO) {
            const scrollNodeHeight = this.getScrollNodeHeight();
            const containerHeight = this.getContainerHeight();
            const idealContainerHeight = 2 * containerHeight;

            if (scrollNodeHeight <= idealContainerHeight) {
                onLoadMore(event);
            }
        }
    }

    /**
     * Scroll listener
     */
    handleScrollListener = (event) => {
        const { onLoadMore, threshold, hasMore, isLoading } = this.props;
        const remainingBottomOffset = this.getRemainingBottomOffset();

        if (!isLoading
                && hasMore
                && threshold > remainingBottomOffset) {
            onLoadMore(event);
        }
    }

    attachScrollListener = () => {
        const { usePageAsContainer } = this.props;
        this.scrollContainer = usePageAsContainer
            ? window
            : this.scrollNode && this.scrollNode.parentNode;

        if (this.scrollContainer) {
            this.scrollContainer
                .addEventListener('scroll', this.handleScrollListener);
        }
    }

    detachScrollListener = () => {
        if (this.scrollContainer) {
            this.scrollContainer
                .removeEventListener('scroll', this.handleScrollListener);
        }
    }

    // -------------------------------------
    //   Render footer
    // -------------------------------------

    renderLoadingLabel() {
        const { loadingLabel } = this.props;

        if (isValidElement(loadingLabel)) {
            return loadingLabel;
        }

        return (
            <TextLabel
                disabled
                align="center"
                icon={<Icon type="loading" spinning />}
                basic={loadingLabel} />
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
            noNewestButton,
        } = this.props;
        let footerChild = null;

        if (isLoading) {
            footerChild = this.renderLoadingLabel();
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
            usePageAsContainer,
            fillSpace,
            // Footer children
            loadingLabel,
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
                {this.renderFooter()}
            </div>
        );
    }
}

export default InfiniteScroll;
