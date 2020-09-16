import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import AvatarEditor from 'react-avatar-editor';

import ImageEditor, { DEFAULT_SCALE, DEFAULT_POSITION } from '../index';
import EditorPlaceholder from '../EditorPlaceholder';

import getInitScale from '../utils/getInitScale';
import getInitPosition from '../utils/getInitPosition';

// from: https://css-tricks.com/snippets/html/base64-encode-of-1x1px-transparent-gif/
const TRANSPARENT_IMAGE = (
  'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
);
const BLACK_IMAGE = (
  'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs='
);

it('renders without crashing', () => {
  const div = document.createElement('div');
  const element = <ImageEditor />;

  ReactDOM.render(element, div);
});

it('shows placeholder with canvas height when image not specified', () => {
  const wrapper = shallow(<ImageEditor />);

  expect(wrapper.find(AvatarEditor).exists()).toBeFalsy();
  expect(wrapper.containsMatchingElement(
    <EditorPlaceholder
      canvasHeight={ImageEditor.defaultProps.height}
    />
  )).toBeTruthy();
});

it('shows loading placeholder with canvas height when set as loading', () => {
  const wrapper = shallow(<ImageEditor loading />);

  expect(wrapper.find(AvatarEditor).exists()).toBeFalsy();
  expect(wrapper.containsMatchingElement(
    <EditorPlaceholder
      loading
      canvasHeight={ImageEditor.defaultProps.height}
    />
  )).toBeTruthy();
});

it('shows to <AvatarEditor> for cropping given image', () => {
  const wrapper = shallow(<ImageEditor image={TRANSPARENT_IMAGE} />);

  expect(wrapper.find(AvatarEditor).exists()).toBeTruthy();
  expect(wrapper.find(AvatarEditor).prop('image')).toBe(TRANSPARENT_IMAGE);
});

it('shows scale slider when control is true', () => {
  const wrapper = shallow(<ImageEditor image={TRANSPARENT_IMAGE} />);
  expect(wrapper.find('input[type="range"]').exists()).toBeFalsy();

  wrapper.setProps({ control: true });
  expect(wrapper.find('input[type="range"]').exists()).toBeTruthy();
});

it('controls scale of <AvatarEditor> with slider while not read-only', () => {
  const wrapper = shallow(<ImageEditor control image={TRANSPARENT_IMAGE} />);
  expect(wrapper.find(AvatarEditor).prop('scale')).toBe(DEFAULT_SCALE);

  wrapper.find('input[type="range"]').simulate('change', {
    target: { value: 1.5 },
  });
  expect(wrapper.find(AvatarEditor).prop('scale')).toBe(1.5);
});

it('caches and controls position of <AvatarEditor> while not read-only', () => {
  const wrapper = shallow(<ImageEditor image={TRANSPARENT_IMAGE} />);
  expect(wrapper.find(AvatarEditor).prop('position')).toEqual(DEFAULT_POSITION);

  wrapper.find(AvatarEditor).simulate('positionChange', { x: 0.5, y: 0.5 });
  expect(wrapper.find(AvatarEditor).prop('position')).toEqual({ x: 0.5, y: 0.5 });

  wrapper.find(AvatarEditor).simulate('positionChange', { x: 0.2, y: 0.7 });
  expect(wrapper.find(AvatarEditor).prop('position')).toEqual({ x: 0.2, y: 0.7 });
});

it('blocks changes to <AvatarEditor> while in read-only mode', () => {
  const wrapper = shallow(
    <ImageEditor
      readOnly
      control
      image={TRANSPARENT_IMAGE}
    />
  );
  expect(wrapper.find('input[type="range"]').prop('disabled')).toBeTruthy();
  expect(wrapper.find(AvatarEditor).prop('position')).toEqual(DEFAULT_POSITION);

  wrapper.find(AvatarEditor).simulate('positionChange', { x: 0.5, y: 0.5 });
  expect(wrapper.find(AvatarEditor).prop('position')).toEqual(DEFAULT_POSITION);
});

it('notifies new cropping rect whenever <AvatarEditor> think it changes', () => {
  const CROP_RECT_FOO = { x: 0, y: 0, width: 1, height: 1 };

  const getCroppingRect = jest.fn(() => CROP_RECT_FOO);
  const handleCropChange = jest.fn();

  const wrapper = shallow(
    <ImageEditor
      image={TRANSPARENT_IMAGE}
      onCropChange={handleCropChange}
    />
  );

  // mock <AvatarEditor> instance API
  wrapper.instance().editorRef.current = { getCroppingRect };

  wrapper.find(AvatarEditor).simulate('imageChange');
  expect(handleCropChange).toHaveBeenLastCalledWith(CROP_RECT_FOO);
  expect(handleCropChange).toHaveBeenCalledTimes(1);

  // should not notify under read-only mode
  wrapper.setProps({ readOnly: true });
  wrapper.find(AvatarEditor).simulate('imageChange');
  expect(handleCropChange).toHaveBeenCalledTimes(1);

  // should not break even when `onCropChange` isn't provided
  wrapper.setProps({ readOnly: false, onCropChange: undefined });
  expect(
    () => wrapper.find(AvatarEditor).simulate('imageChange')
  ).not.toThrow();
});

it('notifies imgInfo and cropping rect when image successfully loaded', () => {
  const MOCKED_IMG_INFO = {
    x: 0.5,
    y: 0.5,
    width: 200,
    height: 200,
    resource: '[HTMLImageElement]',
  };
  const MOCKED_CROP_RECT = { x: 0, y: 0, width: 1, height: 1 };

  const getCroppingRect = jest.fn(() => MOCKED_CROP_RECT);
  const handleLoadSuccess = jest.fn();

  const wrapper = shallow(
    <ImageEditor
      image={TRANSPARENT_IMAGE}
      onLoadSuccess={handleLoadSuccess}
    />
  );

  // mock <AvatarEditor> instance API
  wrapper.instance().editorRef.current = { getCroppingRect };

  wrapper.find(AvatarEditor).simulate('loadSuccess', MOCKED_IMG_INFO);
  expect(handleLoadSuccess).toHaveBeenLastCalledWith(MOCKED_IMG_INFO, MOCKED_CROP_RECT);

  // should not break even when 'onLoadSuccess' not specified
  wrapper.setProps({ onLoadSuccess: undefined });
  expect(
    () => wrapper.find(AvatarEditor).simulate('loadSuccess', MOCKED_IMG_INFO)
  ).not.toThrow();
});

it('takes an initial cropping rect to set scale and position', () => {
  const cropRect = {
    x: 0.1819,
    y: 0.0647,
    width: 0.3057,
    height: 0.5882,
  };
  const wrapper = shallow(
    <ImageEditor
      image={TRANSPARENT_IMAGE}
      initCropRect={cropRect}
    />
  );

  expect(wrapper.find(AvatarEditor).prop('scale'))
    .toEqual(getInitScale(cropRect));
  expect(wrapper.find(AvatarEditor).prop('position'))
    .toEqual(getInitPosition(cropRect));
});

it('resets cached scale and position when image changes', () => {
  const cropRect = {
    x: 0.1819,
    y: 0.0647,
    width: 0.3057,
    height: 0.5882,
  };
  const wrapper = shallow(
    <ImageEditor
      image={TRANSPARENT_IMAGE}
      initCropRect={cropRect}
    />
  );

  expect(wrapper.find(AvatarEditor).prop('scale')).not.toBe(DEFAULT_SCALE);
  expect(wrapper.find(AvatarEditor).prop('position')).not.toEqual(DEFAULT_POSITION);

  wrapper.setProps({ image: BLACK_IMAGE });
  expect(wrapper.find(AvatarEditor).prop('scale')).toBe(DEFAULT_SCALE);
  expect(wrapper.find(AvatarEditor).prop('position')).toEqual(DEFAULT_POSITION);
});

it('can get re-sized image canvas by default via "getImageCanvas" method', () => {
  const MOCKED_REF = { getImageScaledToCanvas: () => 'foo' };
  const wrapper = shallow(<ImageEditor image={TRANSPARENT_IMAGE} />);

  wrapper.instance().editorRef.current = MOCKED_REF;
  expect(wrapper.instance().getImageCanvas()).toBe('foo');
});

it('can get original-sized image canvas via "getImageCanvas" method', () => {
  const MOCKED_REF = { getImage: () => 'bar' };
  const wrapper = shallow(<ImageEditor image={TRANSPARENT_IMAGE} />);

  wrapper.instance().editorRef.current = MOCKED_REF;
  expect(wrapper.instance().getImageCanvas({ originalSize: true })).toBe('bar');
});

it('can be controlled by "scale" & "onScaleChange" props', () => {
  const mockedHandleScaleChange = jest.fn();
  const wrapper = shallow(
    <ImageEditor
      control
      image={TRANSPARENT_IMAGE}
      scale={0.87}
      onScaleChange={mockedHandleScaleChange}
    />
  );

  expect(wrapper.find(AvatarEditor).prop('scale')).toBe(0.87);

  wrapper.find('input[type="range"]').simulate('change', {
    target: { value: 1.5 },
  });
  expect(mockedHandleScaleChange).toBeCalledWith(1.5);
});
