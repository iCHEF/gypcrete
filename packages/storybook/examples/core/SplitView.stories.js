import SplitView from '@ichef/gypcrete/src/SplitView';
import SplitViewColumn from '@ichef/gypcrete/src/SplitViewColumn';

import ColumnView from '@ichef/gypcrete/src/ColumnView';
import HeaderRow from '@ichef/gypcrete/src/HeaderRow';
import TextLabel from '@ichef/gypcrete/src/TextLabel';

import ColoredBox from 'utils/ColoredBox';
import DebugBox from 'utils/DebugBox';

const debugDecorator = (storyFn) => (
  <DebugBox
    width="40rem"
    height="24rem"
  >
    {storyFn()}
  </DebugBox>
);

function ColumnHeader() {
  const label = (
    <TextLabel
      align="center"
      basic="Column Header"
    />
  );

  return <HeaderRow center={label} />;
}

const HEADER = <ColumnHeader />;

function DemoColumnView({ children, ...props }) {
  return (
    <ColumnView
      header={HEADER}
      {...props}
    >
      {children}
    </ColumnView>
  );
}

export default {
  title: 'gypcrete/SplitView',
  component: SplitView,
  subcomponents: { SplitViewColumn },
  decorators: [debugDecorator],
};

export function BasicUsage() {
  return (
    <SplitView>
      <SplitViewColumn>
        <ColoredBox
          width="100%"
          height="30rem"
          color="rgb(255, 235, 235)"
        >
          Narrow Column
        </ColoredBox>
      </SplitViewColumn>

      <SplitViewColumn wide>
        <ColoredBox
          width="100%"
          height="30rem"
          color="rgb(235, 245, 255)"
        >
          Wide Column
        </ColoredBox>
      </SplitViewColumn>
    </SplitView>
  );
}

export function ContainsColumnView() {
  return (
    <SplitView>
      <SplitViewColumn>
        <DemoColumnView>
          <ColoredBox
            width="100%"
            height="30rem"
            color="rgb(255, 235, 235)"
          >
            Narrow Column
          </ColoredBox>
        </DemoColumnView>
      </SplitViewColumn>

      <SplitViewColumn wide>
        <DemoColumnView>
          <ColoredBox
            width="100%"
            height="30rem"
            color="rgb(235, 245, 255)"
          >
            Wide Column
          </ColoredBox>
        </DemoColumnView>
      </SplitViewColumn>
    </SplitView>
  );
}
ContainsColumnView.story = {
  name: 'contains <ColumnView>',
};

export function InsideColumnView() {
  return (
    <DemoColumnView bodyPadding={{ bottom: 0 }}>
      <SplitView>
        <SplitViewColumn>
          <ColoredBox
            width="100%"
            height="30rem"
            color="rgb(255, 235, 235)"
          >
            Narrow Column
          </ColoredBox>
        </SplitViewColumn>

        <SplitViewColumn wide>
          <ColoredBox
            width="100%"
            height="30rem"
            color="rgb(235, 245, 255)"
          >
            Wide Column
          </ColoredBox>
        </SplitViewColumn>
      </SplitView>
    </DemoColumnView>
  );
}

InsideColumnView.story = {
  name: 'inside <ColumnView>',
};
