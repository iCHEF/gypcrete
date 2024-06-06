import { action } from '@storybook/addon-actions';

import Button, { PureButton } from '@ichef/gypcrete/src/Button';
import FlexRow from 'utils/FlexRow';

export default {
  title: 'gypcrete/Button',
  component: PureButton,
  subcomponents: {
    'rowComp()': Button,
  },
};

export function BasicUsage() {
  return (
    <FlexRow>
      <Button
        bold
        basic="Black Button"
        aside="Default color"
        tag="Tag"
        icon="add"
        onClick={action('clicked')}
      />

      <Button
        color="blue"
        basic="Blue"
        aside="Variants"
        tag="Tag"
        icon="add"
      />

      <Button
        color="red"
        basic="Red"
        aside="Variants"
        tag="Tag"
        icon="add"
      />

      <Button
        color="white"
        basic="White"
        aside="Variants"
        tag="Tag"
        icon="add"
      />
    </FlexRow>
  );
}

export function ButtonWithStatus() {
  return (
    <FlexRow>
      <Button
        basic="Loading"
        tag="Tag"
        icon="add"
        status="loading"
      />

      <Button
        basic="Success"
        tag="Tag"
        icon="add"
        status="success"
        statusOptions={{ autohide: false }}
      />

      <Button
        basic="Error"
        tag="Tag"
        icon="add"
        status="error"
        errorMsg="Save failed"
      />
    </FlexRow>
  );
}

export function CustomTagButton() {
  return (
    <FlexRow>
      <Button
        basic="Button"
        aside="<button>"
        tag="Tag"
        tagName="button"
      />
      <Button
        basic="Button"
        aside="<a>"
        tag="Tag"
        tagName="a"
        // props for <a>
        href="http://ichefpos.com/"
        target="_blank"
      />
      <Button
        basic="Button"
        aside="<div>"
        tag="Tag"
        tagName="div"
      />
    </FlexRow>
  );
}

export function DisabledButton() {
  return (
    <div>
      <FlexRow>
        <Button
          bold
          disabled
          basic="Black"
          aside="Disabled"
          tag="tag"
        />
        <Button
          disabled
          color="blue"
          basic="Blue"
          aside="Disabled"
          tag="tag"
        />
        <Button
          disabled
          color="red"
          basic="Red"
          aside="Disabled"
          tag="tag"
        />
        <Button
          disabled
          color="white"
          basic="White"
          aside="Disabled"
          tag="tag"
        />
      </FlexRow>
      <FlexRow>
        <Button
          bold
          solid
          disabled
          basic="Black"
          aside="Disabled"
          tag="tag"
        />
        <Button
          solid
          disabled
          color="blue"
          basic="Blue"
          aside="Disabled"
          tag="tag"
        />
        <Button
          solid
          disabled
          color="red"
          basic="Red"
          aside="Disabled"
          tag="tag"
        />
        <Button
          solid
          disabled
          color="white"
          basic="White"
          aside="Disabled"
          tag="tag"
        />
      </FlexRow>
    </div>
  );
}

export function AsideControlClickableOnDisabledButton() {
  return (
    <Button
      bold
      color="Black"
      basic="Black"
      aside={
        <>
          Some text
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.google.com"
          >
            Click me
          </a>
        </>
      }
      asideControlClickableOnDisabled
      disabled
      // eslint-disable-next-line no-alert
      onClick={() => alert('not trigger.')}
    />
  );
}

export function MutedButton() {
  return (
    <FlexRow>
      <Button
        muted
        basic="Muted Button"
        aside="Muted button has disabled style, but clickable"
        // eslint-disable-next-line no-alert
        onClick={() => alert('I am clickable!')}
        solid
      />
    </FlexRow>
  );
}

export function ExpandedButton() {
  return (
    <div>
      <FlexRow>
        <Button
          basic="Expanded Button"
          align="center"
          minified={false}
        />
      </FlexRow>

      <FlexRow>
        <Button
          solid
          color="red"
          basic="Expanded Button"
          align="center"
          minified={false}
        />
      </FlexRow>
    </div>
  );
}

export function SolidButton() {
  return (
    <FlexRow>
      <Button
        bold
        solid
        basic="Black"
        aside="Aside text"
        tag="Solid"
      />

      <Button
        solid
        color="blue"
        basic="Blue"
        aside="Aside text"
        tag="Solid"
      />

      <Button
        solid
        color="red"
        basic="Red"
        aside="Aside text"
        tag="Solid"
      />

      <Button
        solid
        color="white"
        basic="White"
        aside="Aside text"
        tag="Solid"
      />
    </FlexRow>
  );
}
