import React, { useState, useRef } from 'react';
import { action } from '@storybook/addon-actions';

import Popover, { PurePopover } from '@ichef/gypcrete/src/Popover';
import Button from '@ichef/gypcrete/src/Button';
import List from '@ichef/gypcrete/src/List';
import ListRow from '@ichef/gypcrete/src/ListRow';

export default {
  title: '@ichef/gypcrete|Popover',
  component: PurePopover,
  subcomponents: {
    'renderToLayer(closable(anchored(Popover))': Popover,
  },
};

export function BasicExample() {
  function ButtonRow(props) {
    return (
      <ListRow>
        <Button
          minified={false}
          {...props}
        />
      </ListRow>
    );
  }

  function DemoList() {
    return (
      <List>
        <ButtonRow basic="Row 1" onClick={action('click.1')} />
        <ButtonRow basic="Row 2" onClick={action('click.2')} />
        <ButtonRow basic="Row 3" onClick={action('click.3')} />

        <ButtonRow basic="Link row" tagName="a" href="https://apple.com" />
      </List>
    );
  }

  return (
    <div>
      <PurePopover>
        <DemoList />
      </PurePopover>

      <div style={{ height: 50 }} />

      <PurePopover placement="top">
        <DemoList />
      </PurePopover>
    </div>
  );
}

export function AnchoredPopover() {
  function ButtonRow(props) {
    return (
      <ListRow>
        <Button
          minified={false}
          {...props}
        />
      </ListRow>
    );
  }

  function DemoList() {
    return (
      <List>
        <ButtonRow basic="Row 1" onClick={action('click.1')} />
        <ButtonRow basic="Row 2" onClick={action('click.2')} />
        <ButtonRow basic="Row 3" onClick={action('click.3')} />

        <ButtonRow basic="Link row" tagName="a" href="https://apple.com" />
      </List>
    );
  }

  const [popoverOpen, setPopoverOpen] = useState(false);
  const btnRef = useRef();
  const btn = btnRef.current;

  const handlePopoverOpen = () => {
    setPopoverOpen(true);
  };

  const handlePopoverClose = () => {
    setPopoverOpen(false);
  };

  const anchorStyle = {
    display: 'inline-block',
  };
  const showPopover = popoverOpen && (btnRef.current);

  return (
    <div>
      <span
        style={anchorStyle}
        ref={btnRef}
      >
        <Button
          basic="Open popover"
          onClick={handlePopoverOpen}
        />
      </span>
      {showPopover && (
        <Popover
          anchor={btn}
          placement="top"
          onClose={handlePopoverClose}
        >
          <DemoList />
        </Popover>
      )}
    </div>
  );
}

AnchoredPopover.story = {
  parameters: {
    docs: {
      storyDescription: 'placed to a specified DOM element',
    },
  },
};
