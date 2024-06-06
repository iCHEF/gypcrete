import { useState, useRef } from 'react';

import Tooltip, { PureTooltip } from '@ichef/gypcrete/src/Tooltip';

export default {
  title: 'gypcrete/Tooltip',
  component: PureTooltip,
  subcomponents: {
    'renderToLayer(anchored({})': Tooltip,
  },
};

export function BasicUsage() {
  return (
    <div>
      <PureTooltip>tooltip</PureTooltip>

      <div style={{ height: 30 }} />

      <PureTooltip placement="bottom">placed at bottom of target</PureTooltip>

      <div style={{ height: 30 }} />

      <PureTooltip arrowStyle={{ left: '12px' }}>custom arrow style</PureTooltip>
    </div>
  );
}

export function AnchoredTooltip() {
  const [shouldShowTooltip, setShouldShowTooltip] = useState(false);
  const textRef = useRef();

  const handleTooltipShow = () => {
    setShouldShowTooltip(true);
  };

  const handleTooltipHide = () => {
    setShouldShowTooltip(false);
  };

  const anchoredStyle = {
    textDecoration: 'underline',
  };

  return (
    <div>
      <span
        ref={textRef}
        onMouseEnter={handleTooltipShow}
        onMouseLeave={handleTooltipHide}
        style={anchoredStyle}
      >
        Hover on me
      </span>

      {shouldShowTooltip && textRef.current && (
        <Tooltip anchor={textRef.current}>Yo, I am a tooltip.</Tooltip>
      )}
    </div>
  );
}

AnchoredTooltip.story = {
  parameters: {
    docs: {
      storyDescription: 'placed to a specific DOM',
    },
  },
};
