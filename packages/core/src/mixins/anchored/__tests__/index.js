import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import memoize from 'memoize-one';

import anchored, {
  anchoredPropTypes,
  ANCHORED_PLACEMENT,
} from '../index';

import getPositionState from '../getPositionState';

jest.mock('memoize-one', () => jest.fn(func => func));
jest.mock('../getPositionState');

const MOCKED_POSITION_CONFIG = {
  placement: 'top',
  position: { top: 10, left: 10 },
  arrowPosition: { left: 10 },
};

const mockedGetterFunc = jest.fn(() => MOCKED_POSITION_CONFIG);
getPositionState.mockReturnValue(mockedGetterFunc);

// --------------------
//  Mocking Components
// --------------------

function Box({ nodeRef }) {
  return <div ref={nodeRef} />;
}
Box.propTypes = {
  nodeRef: anchoredPropTypes.nodeRef.isRequired,
};

const AnchoredBox = anchored({
  defaultPlacement: ANCHORED_PLACEMENT.TOP,
  edgePadding: 8,
})(Box);

// --------------------
//  Test cases
// --------------------

it('renders without crashing', () => {
  const div = document.createElement('div');
  const element = <AnchoredBox />;

  ReactDOM.render(element, div);
});

it('renders null if anchor is not set', () => {
  const wrapper = mount(<AnchoredBox />);

  expect(wrapper.isEmptyRender()).toBeTruthy();
});

it('creates a position config getter function and memoize it', () => {
  mount(<AnchoredBox />);

  expect(getPositionState).toHaveBeenLastCalledWith(8);
  expect(memoize).toHaveBeenLastCalledWith(mockedGetterFunc);
});

it('has default configs for placement and edge-padding', () => {
  const DefaultAnchoredBox = anchored()(Box);
  mount(<DefaultAnchoredBox />);

  expect(getPositionState).toHaveBeenLastCalledWith(16);
});

it('passed anchor and self nodes to getter function for position config', () => {
  /**
     * Enzyme weirdly passes an instance of `WrapperComponent` to React ref
     * when you directly mounts:
     * ```js
     * mount(<div ref={(ref) => { console.log(ref); }} />);
     * // console prints: WrapperComponent
     * ```
     *
     * But if you wrap the ref-target element with another layer of wrapper,
     * if receives correct HTMLDivElement.
     */
  const anchorRef = React.createRef();
  mount(<><div ref={anchorRef} /></>);

  const wrapper = mount(<AnchoredBox anchor={anchorRef.current} />);
  expect(mockedGetterFunc).toHaveBeenCalledWith(
    ANCHORED_PLACEMENT.TOP,
    anchorRef.current,
    wrapper.state().selfNode,
    0
  );
});
