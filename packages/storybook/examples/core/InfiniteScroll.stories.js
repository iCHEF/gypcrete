import React, { useReducer } from 'react';
import { action } from '@storybook/addon-actions';

import InfiniteScroll from '@ichef/gypcrete/src/InfiniteScroll';

export default {
  title: '@ichef/gypcrete|InfiniteScroll',
  component: InfiniteScroll,
};

export function BasicUsage() {
  /**
     * In the following example the `<InfiniteScroll>` placed in a fixed height container'.
     */
  const defaultItemsCount = 50;

  const rootContainerStyle = {
    height: 300,
    overflow: 'auto',
    border: '1px solid #efefef',
  };

  const initialState = {
    lastPage: 1,
    isLoading: false,
    hasMore: true,
  };

  const reducer = (state, { type }) => {
    switch (type) {
      case 'loading': {
        return { ...state, isLoading: true };
      }
      case 'loaded': {
        const { lastPage } = state;
        const isEnd = lastPage >= 2;

        if (!isEnd) {
          return {
            ...state,
            lastPage: state.lastPage + 1,
            isLoading: false,
          };
        }

        return {
          ...state,
          isLoading: false,
          hasMore: false,
        };
      }
      default:
        return state;
    }
  };

  const [{ isLoading, lastPage, hasMore }, dispatch] = useReducer(reducer, initialState);

  const handleLoadMore = (event) => {
    dispatch({ type: 'loading' });
    action('onLoadMore')(event);

    setTimeout(() => {
      dispatch({ type: 'loaded' });
    }, 1500);
  };

  const renderListItems = () => {
    const itemsAmount = defaultItemsCount * lastPage;
    const listItems = [];

    for (let i = 1; i <= itemsAmount; i += 1) {
      // eslint-disable-next-line react/jsx-one-expression-per-line
      listItems.push(<li key={`item-${i}`}>item {i}</li>);
    }

    return listItems;
  };

  return (
    <div style={rootContainerStyle}>
      <InfiniteScroll
        onLoadMore={handleLoadMore}
        isLoading={isLoading}
        hasMore={hasMore}
        loadingLabel="Loading..."
        showMoreButton="Show more"
        noNewestButton="All items displayed"
      >
        <ul>
          {renderListItems()}
        </ul>
      </InfiniteScroll>
    </div>
  );
}


export function PageAsScrollContainer() {
  const defaultItemsCount = 20;

  const initialState = {
    lastPage: 1,
    isLoading: false,
    hasMore: true,
  };

  const reducer = (state, { type }) => {
    switch (type) {
      case 'loading': {
        return { ...state, isLoading: true };
      }
      case 'loaded': {
        const { lastPage } = state;
        const isEnd = lastPage >= 3;

        if (!isEnd) {
          return {
            ...state,
            lastPage: state.lastPage + 1,
            isLoading: false,
          };
        }

        return {
          ...state,
          isLoading: false,
          hasMore: false,
        };
      }
      default:
        return state;
    }
  };

  const [{ isLoading, lastPage, hasMore }, dispatch] = useReducer(reducer, initialState);

  const handleLoadMore = (event) => {
    dispatch({ type: 'loading' });
    action('onLoadMore')(event);

    setTimeout(() => {
      dispatch({ type: 'loaded' });
    }, 1500);
  };

  const renderListItems = () => {
    const itemsAmount = defaultItemsCount * lastPage;
    const listItems = [];

    for (let i = 1; i <= itemsAmount; i += 1) {
      // eslint-disable-next-line react/jsx-one-expression-per-line
      listItems.push(<li key={`item-${i}`}>item {i}</li>);
    }

    return listItems;
  };

  return (
    <InfiniteScroll
      usePageAsContainer
      fillSpace="auto"
      onLoadMore={handleLoadMore}
      isLoading={isLoading}
      hasMore={hasMore}
      showMoreButton="Show more"
      noNewestButton="All items displayed"
    >
      <ul>
        {renderListItems()}
      </ul>
    </InfiniteScroll>
  );
}
