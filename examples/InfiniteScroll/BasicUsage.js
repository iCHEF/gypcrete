import React, { PureComponent } from 'react';
import { action } from '@kadira/storybook';

import InfiniteScroll from 'src/InfiniteScroll';
import TextLabel from 'src/TextLabel';
import Icon from 'src/Icon';
import Button from 'src/Button';

const defaultItemsCount = 50;
const rootContainerStyle = {
    height: 300,
    overflow: 'auto',
    border: '1px solid #efefef'
};

const loadingSpinner = (
    <TextLabel
        icon={<Icon type="loading" spinning />}
        basic="LOADING...."
        align="center" />
);

class BasicUsageExample extends PureComponent {
    state = {
        lastPage: 1,
        isLoading: false,
        hasMore: true
    }

    loadMore = (event) => {
        this.setState({ isLoading: true });
        action('onInfiniteLoad')(event);

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
        const itemsAmount = defaultItemsCount * lastPage;
        const listItems = [];

        for (let i = 1; i <= itemsAmount; i += 1) {
            listItems.push(<li key={`item-${i}`}>item {i}</li>);
        }

        return listItems;
    }

    renderLoadMoreButton() {
        return (
            <Button
                basic="Load more"
                align="center"
                minified={false}
                onClick={this.loadMoreByClick} />
        );
    }

    render() {
        const { isLoading, hasMore } = this.state;

        return (
            <div style={rootContainerStyle}>
                <InfiniteScroll
                    onInfiniteLoad={this.loadMore}
                    loadingSpinner={loadingSpinner}
                    endMessage={this.renderLoadMoreButton()}
                    isLoading={isLoading}
                    hasMore={hasMore}>
                    <ul>
                        {this.renderListItems()}
                    </ul>
                </InfiniteScroll>
            </div>
        );
    }
}

export default BasicUsageExample;
