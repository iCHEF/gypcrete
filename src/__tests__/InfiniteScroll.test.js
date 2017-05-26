import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';

import InfiniteScroll, { DefaultLoadingSpinner } from '../InfiniteScroll';

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
            <InfiniteScroll onInfiniteLoad={() => {}}>
                {FAKE_LIST}
            </InfiniteScroll>
        );

        ReactDOM.render(element, div);
    });

    it('should show loading spinner while loading', () => {
        const wrapper = shallow(
            <InfiniteScroll
                isLoading
                onInfiniteLoad={() => {}} />
        );

        expect(wrapper.find(DefaultLoadingSpinner).exists()).toBeTruthy();
    });

    it('should show custom loading spinner', () => {
        const CustomLoadingSpinner = () => (<div>Loading...</div>);
        const wrapper = shallow(
            <InfiniteScroll
                isLoading
                loadingSpinner={<CustomLoadingSpinner />}
                onInfiniteLoad={() => {}} />
        );

        expect(wrapper.find(CustomLoadingSpinner).exists()).toBeTruthy();
    });

    it('should render endMessage if hasMore prop set as false', () => {
        const EndMessage = () => (<div>End Message</div>);
        const wrapper = shallow(
            <InfiniteScroll
                endMessage={<EndMessage />}
                onInfiniteLoad={() => {}} />
        );

        // hasMore default as true
        expect(wrapper.find(EndMessage).exists()).toBeFalsy();

        wrapper.setProps({ hasMore: false });
        expect(wrapper.find(EndMessage).exists()).toBeTruthy();
    });

    // -------------------------------------
    //   Scroll listeners
    // -------------------------------------

    it('should attach and detach scroll listeners', () => {
        const wrapper = shallow(<InfiniteScroll onInfiniteLoad={() => {}} />);
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
        const wrapper = shallow(<InfiniteScroll disabled onInfiniteLoad={() => {}} />);
        const instance = wrapper.instance();
        instance.attachScrollListener = jest.fn();

        // Check attach event
        instance.componentDidMount();
        expect(instance.attachScrollListener).not.toHaveBeenCalled();
    });

    it('should attach or detach scroll listeners if disabled prop was updated', () => {
        const wrapper = shallow(<InfiniteScroll onInfiniteLoad={() => {}} />);
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

    it('should trigger onInfiniteLoad while scrolling its container', () => {
        const onInfiniteLoad = jest.fn();
        const wrapperNode = mount(
            <div style={{ overflow: 'auto', height: 300 }}>
                <InfiniteScroll
                    onInfiniteLoad={onInfiniteLoad}>
                    {FAKE_LIST}
                </InfiniteScroll>
            </div>
        ).getDOMNode();

        // Before trigger scroll event
        expect(onInfiniteLoad).not.toHaveBeenCalled();

        // Dispatch scroll event
        wrapperNode.dispatchEvent(SCROLL_EVENT);
        expect(onInfiniteLoad).toHaveBeenCalledTimes(1);
    });

    it('should trigger onInfiniteLoad while scrolling window', () => {
        const onInfiniteLoad = jest.fn();

        mount(
            <InfiniteScroll
                useWindowAsScrollContainer
                onInfiniteLoad={onInfiniteLoad}>
                {FAKE_LIST}
            </InfiniteScroll>
        );

        // Before trigger scroll event
        expect(onInfiniteLoad).not.toHaveBeenCalled();

        // Dispatch window scroll event
        global.window.dispatchEvent(SCROLL_EVENT);
        expect(onInfiniteLoad).toHaveBeenCalledTimes(1);
    });


});
