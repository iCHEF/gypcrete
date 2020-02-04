
import React, { PureComponent } from 'react';
import { action } from '@storybook/addon-actions';

import InfiniteScroll from '@ichef/gypcrete/src/InfiniteScroll';

export default {
    title: '@ichef/gypcrete|InfiniteScroll',
    component: InfiniteScroll,
};

class BasicUsageExample extends PureComponent {

    defaultItemsCount = 50

    rootContainerStyle = {
        height: 300,
        overflow: 'auto',
        border: '1px solid #efefef'
    }

    state = {
        lastPage: 1,
        isLoading: false,
        hasMore: true
    }

    loadMore = (event) => {
        this.setState({ isLoading: true });
        action('onLoadMore')(event);

        setTimeout(() => {
            const { lastPage } = this.state;

            if (lastPage < 2) {
                this.setState({
                    lastPage: lastPage + 1,
                    isLoading: false
                });
            } else {
                this.setState({
                    isLoading: false,
                    hasMore: false
                });
            }
        }, 1500);
    }

    loadMoreByClick = () => {
        this.setState({ isLoading: true });

        setTimeout(() => {
            const { lastPage } = this.state;

            this.setState({
                lastPage: lastPage + 1,
                isLoading: false
            });
        }, 1500);
    }

    renderListItems() {
        const { lastPage } = this.state;
        const itemsAmount = this.defaultItemsCount * lastPage;
        const listItems = [];

        for (let i = 1; i <= itemsAmount; i += 1) {
            // eslint-disable-next-line react/jsx-one-expression-per-line
            listItems.push(<li key={`item-${i}`}>item {i}</li>);
        }

        return listItems;
    }

    render() {
        const { isLoading, hasMore } = this.state;

        return (
            <div style={this.rootContainerStyle}>
                <InfiniteScroll
                    onLoadMore={this.loadMore}
                    isLoading={isLoading}
                    hasMore={hasMore}
                    loadingLabel="Loading..."
                    showMoreButton="Show more"
                    noNewestButton="All items displayed">
                    <ul>
                        {this.renderListItems()}
                    </ul>
                </InfiniteScroll>
            </div>
        );
    }
}

export function BasicUsage() {
    return <BasicUsageExample />;
}

BasicUsage.story = {
    parameters: {
        docs: {
            storyDescription: 'placed in a fixed height container',
        },
    },
};


class PageAsContainerExample extends PureComponent {

    defaultItemsCount = 20;

    state = {
        lastPage: 1,
        isLoading: false,
        hasMore: true
    }

    loadMore = (event) => {
        this.setState({ isLoading: true });
        action('onLoadMore')(event);

        setTimeout(() => {
            const { lastPage } = this.state;

            if (lastPage < 3) {
                this.setState({
                    lastPage: lastPage + 1,
                    isLoading: false
                });
            } else {
                this.setState({
                    isLoading: false,
                    hasMore: false
                });
            }
        }, 1500);
    }

    renderListItems() {
        const { lastPage } = this.state;
        const itemsAmount = this.defaultItemsCount * lastPage;
        const listItems = [];

        for (let i = 1; i <= itemsAmount; i += 1) {
            // eslint-disable-next-line react/jsx-one-expression-per-line
            listItems.push(<li key={`item-${i}`}>item {i}</li>);
        }

        return listItems;
    }

    render() {
        const { isLoading, hasMore } = this.state;

        return (
            <InfiniteScroll
                usePageAsContainer
                fillSpace="auto"
                onLoadMore={this.loadMore}
                isLoading={isLoading}
                hasMore={hasMore}
                showMoreButton="Show more">
                <ul>
                    {this.renderListItems()}
                </ul>
            </InfiniteScroll>
        );
    }
}

export function PageAsScrollContainer() {
    return <PageAsContainerExample />;
}
