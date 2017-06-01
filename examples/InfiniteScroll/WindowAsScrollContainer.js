import React, { PureComponent } from 'react';
import { action } from '@kadira/storybook';

import InfiniteScroll from 'src/InfiniteScroll';

const defaultItemsCount = 20;

class WindowAsScrollContainerExample extends PureComponent {
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
        const itemsAmount = defaultItemsCount * lastPage;
        const listItems = [];

        for (let i = 1; i <= itemsAmount; i += 1) {
            listItems.push(<li key={`item-${i}`}>item {i}</li>);
        }

        return listItems;
    }

    render() {
        const { isLoading, hasMore } = this.state;

        return (
            <InfiniteScroll
<<<<<<< HEAD:examples/InfiniteScroll/WindowAsScrollContainer.js
                useWindowAsScrollContainer
                onInfiniteLoad={this.loadMore}
=======
                usePageAsContainer
                onLoadMore={this.loadMore}
>>>>>>> 87f9b17... [InfiniteScroll] Rename `onLoad` prop to `onLoadMore`:examples/InfiniteScroll/PageAsContainer.js
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

export default WindowAsScrollContainerExample;
