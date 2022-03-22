import React from 'react';

import Avatar from '@ichef/gypcrete/src/Avatar';
import FlexRow from 'utils/FlexRow';

export default {
  title: '@ichef/gypcrete|Avatar',
  component: Avatar,
};

export const basicUsage = () => (
  <FlexRow>
    <Avatar alt="Avatar of Design" src="https://api.adorable.io/avatars/285/design@ichef.tw" />
    <Avatar type="square" alt="Avatar of RD" src="https://api.adorable.io/avatars/285/rd@ichef.tw" />
    <Avatar type="rounded" alt="Avatar of Marketing" src="https://api.adorable.io/avatars/285/marketing@ichef.tw" />
    <Avatar type="circle" alt="Avatar of Customer Service" src="https://api.adorable.io/avatars/285/customer_service@ichef.tw" />
  </FlexRow>
);
