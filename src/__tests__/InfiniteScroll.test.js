import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';

import InfiniteScroll, { BEM } from '../InfiniteScroll';
import Button from '../Button';

const footerClassName = `.${BEM.footer}`;
const SCROLL_EVENT = new Event('scroll');
const FAKE_LIST = (
    <ul>
        <li>item 1</li>
        <li>item 2</li>
        <li>item 3</li>
    </ul>
);

describe('InfiniteScroll', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        const element = (
            <InfiniteScroll onLoadMore={() => {}}>
                {FAKE_LIST}
            </InfiniteScroll>
        );

        ReactDOM.render(element, div);
    });

    // -------------------------------------
    //   Verify footer Button(s)
    // -------------------------------------

    it('should show loading button while loading', () => {
        const wrapper = shallow(
            <InfiniteScroll
                isLoading
                onLoadMore={() => {}} />
        );

        // show loading icon in default
        expect(wrapper.find(footerClassName).find(Button).prop('icon').props.type).toBe('loading');
        expect(wrapper.find(footerClassName).find(Button).prop('basic')).toBe(null);

        // loadingButton as string
        wrapper.setProps({ loadingButton: 'loading...' });
        expect(wrapper.find(footerClassName).find(Button).prop('basic')).toBe('loading...');

        // loadingButton as element
        const CustomLoadingButton = () => (<div>Loading...</div>);
        wrapper.setProps({ loadingButton: <CustomLoadingButton /> });
        expect(wrapper.find(footerClassName).find(CustomLoadingButton).exists()).toBeTruthy();
    });

    it('should render show more button', () => {
        const wrapper = shallow(
            <InfiniteScroll
                showMoreButton="show more"
                onLoadMore={() => {}} />
        );

        // showMoreButton as string
        expect(wrapper.find(footerClassName).find(Button).prop('basic')).toBe('show more');

        // showMoreButton as element
        const CustomShowMoreButton = () => (<div>show more</div>);
        wrapper.setProps({ showMoreButton: <CustomShowMoreButton /> });
        expect(wrapper.find(footerClassName).find(CustomShowMoreButton).exists()).toBeTruthy();

        // Hide showMoreButton
        wrapper.setProps({ showMoreButton: undefined });
        expect(wrapper.find(footerClassName).children().length).toBe(0);
    });

    it('should render no newest button if hasMore set as false', () => {
        const wrapper = shallow(
            <InfiniteScroll
                showMoreButton="show more"
                noNewestButton="all displayed"
                onLoadMore={() => {}} />
        );

        // Render showMoreButton if hasMore is true
        expect(wrapper.find(footerClassName).find(Button).prop('basic')).toBe('show more');

        // Turn hasMore to false
        wrapper.setProps({ hasMore: false });
        expect(wrapper.find(footerClassName).find(Button).prop('basic')).toBe('all displayed');

        // noNewestButton as element
        const CustomNoNewestButton = () => (<div>all displayed</div>);
        wrapper.setProps({ noNewestButton: <CustomNoNewestButton /> });
        expect(wrapper.find(footerClassName).find(CustomNoNewestButton).exists()).toBeTruthy();

        // Hide noNewestButton
        wrapper.setProps({ noNewestButton: undefined });
        expect(wrapper.find(footerClassName).children().length).toBe(0);
    });

    // -------------------------------------
    //   Scroll listeners
    // -------------------------------------

    it('should attach and detach scroll listeners', () => {
        const wrapper = shallow(<InfiniteScroll onLoadMore={() => {}} />);
        const instance = wrapper.instance();
        instance.attachScrollListener = jest.fn();
        instance.detachScrollListener = jest.fn();

        // Check attach event
        instance.componentDidMount();
        expect(instance.attachScrollListener).toHaveBeenCalledTimes(1);

        // Check detach event
        instance.componentWillUnmount();
        expect(instance.detachScrollListener).toHaveBeenCalledTimes(1);
    });

    it('should not attach scroll listener when set as disabled', () => {
        const wrapper = shallow(<InfiniteScroll disabled onLoadMore={() => {}} />);
        const instance = wrapper.instance();
        instance.attachScrollListener = jest.fn();

        // Check attach event
        instance.componentDidMount();
        expect(instance.attachScrollListener).not.toHaveBeenCalled();
    });

    it('should attach or detach scroll listeners if disabled prop was updated', () => {
        const wrapper = shallow(<InfiniteScroll onLoadMore={() => {}} />);
        const instance = wrapper.instance();
        instance.attachScrollListener = jest.fn();
        instance.detachScrollListener = jest.fn();

        // Update disabled prop to true
        let prevProps = wrapper.props();
        wrapper.setProps({ disabled: true });
        instance.componentDidUpdate(prevProps);
        expect(instance.detachScrollListener).toHaveBeenCalledTimes(1);

        // Update disabled prop to false
        prevProps = wrapper.props();
        wrapper.setProps({ disabled: false });
        instance.componentDidUpdate(prevProps);
        expect(instance.attachScrollListener).toHaveBeenCalledTimes(1);
    });

    it('should trigger onLoadMore while scrolling its container', () => {
        const onLoadMore = jest.fn();
        const wrapperNode = mount(
            <div style={{ overflow: 'auto', height: 300 }}>
                <InfiniteScroll
                    onLoadMore={onLoadMore}>
                    {FAKE_LIST}
                </InfiniteScroll>
            </div>
        ).getDOMNode();

        // Before trigger scroll event
        expect(onLoadMore).not.toHaveBeenCalled();

        // Dispatch scroll event
        wrapperNode.dispatchEvent(SCROLL_EVENT);
        expect(onLoadMore).toHaveBeenCalledTimes(1);
    });

    it('should trigger onLoadMore while scrolling window', () => {
        const onLoadMore = jest.fn();

        mount(
            <InfiniteScroll
                usePageAsContainer
                onLoadMore={onLoadMore}>
                {FAKE_LIST}
            </InfiniteScroll>
        );

        // Before trigger scroll event
        expect(onLoadMore).not.toHaveBeenCalled();

        // Dispatch window scroll event
        global.window.dispatchEvent(SCROLL_EVENT);
        expect(onLoadMore).toHaveBeenCalledTimes(1);
    });
});
