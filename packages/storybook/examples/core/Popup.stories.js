import React from 'react';
import { action } from '@storybook/addon-actions';

import Popup, { PurePopup } from '@ichef/gypcrete/src/Popup';
import PopupButton from '@ichef/gypcrete/src/PopupButton';

import Checkbox from '@ichef/gypcrete/src/Checkbox';

const reactLogoImg = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K';

export default {
  title: '@ichef/gypcrete|Popup',
  component: PurePopup,
  subcomponents: {
    'renderToLayer()': Popup,
  },
  parameters: {
    docs: {
      inlineStories: false,
      iframeHeight: 300,
    },
  },
};

export function BasicMessage() {
  return (
    <Popup
      icon="error"
      iconColor="red"
      message="You have unsaved changes. Click “Confirm” to abandon changes."
      buttons={(
        <>
          <PopupButton basic="Cancel" onClick={action('cancel')} />
          <PopupButton basic="Confirm" onClick={action('confirm')} />
        </>
      )}
    />
  );
}

export function MessageWithTitle() {
  return (
    <Popup
      icon="error"
      iconColor="red"
      message={{
        title: 'Invalid inputs',
        desc: 'Please check value of each fields.',
      }}
      buttons={(
        <PopupButton basic="Confirm" onClick={action('confirm')} />
      )}
    />
  );
}

export function LargePopup() {
  return (
    <Popup
      size="large"
      icon="error"
      iconColor="red"
      message={{
        title: 'A very important notice',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      }}
      buttons={(
        <>
          <PopupButton basic="Learn more" onClick={action('learn')} />
          <PopupButton basic="Close" onClick={action('close')} />
        </>
      )}
    />
  );
}
LargePopup.story = {
  parameters: {
    docs: {
      iframeHeight: 400,
    },
  },
};

export function CustomContentBelowMessage() {
  return (
    <Popup
      icon="announce"
      iconColor="green"
      message={{
        title: 'Website updated',
        desc: 'We have added lots of new features!',
      }}
      messageBottomArea={(
        <Checkbox align="center" basic="Do not show again" />
      )}
      buttons={(
        <>
          <PopupButton basic="Learn more" onClick={action('learn')} />
          <PopupButton basic="Close" onClick={action('close')} />
        </>
      )}
    />
  );
}
CustomContentBelowMessage.story = {
  parameters: {
    docs: {
      iframeHeight: 400,
    },
  },
};

export function CustomIcon() {
  const customIcon = <img src={reactLogoImg} alt="" width="48" />;
  return (
    <Popup
      icon={customIcon}
      message="custom icon"
    />
  );
}

export function NoIcon() {
  return (
    <Popup
      message={{
        title: 'Website updated',
        desc: 'We have added lots of new features!',
      }}
      buttons={(
        <PopupButton basic="Close" onClick={action('close')} />
      )}
    />
  );
}

export function CustomMessageNode() {
  const customMessage = (
    <div>
      Hello
      <b> world </b>
      from React!
    </div>
  );

  return (
    <Popup
      icon="success"
      iconColor="blue"
      message={customMessage}
    />
  );
}

export function VeryLongMessage() {
  const MESSAGE = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vitae finibus elit. In ante odio, pretium vel convallis ut, mattis eget turpis. Praesent eget mattis neque. Fusce sit amet libero magna. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Etiam vehicula vel justo vitae varius. Nulla vitae dui libero. Mauris aliquam orci nunc, sit amet aliquet libero bibendum nec. Nulla metus ante, mattis sagittis tortor vitae, consequat ultricies neque. Integer vel urna fermentum, finibus justo ornare, malesuada erat.';

  return (
    <Popup
      icon="error"
      iconColor="red"
      message={MESSAGE}
      buttons={(
        <PopupButton basic="Confirm" onClick={action('confirm')} />
      )}
    />
  );
}
