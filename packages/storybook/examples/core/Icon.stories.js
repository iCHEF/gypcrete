import React from 'react';

import Icon from '@ichef/gypcrete/src/Icon';

import iconMap from '@ichef/gypcrete/src/icons/components';

export default {
  title: 'gypcrete/Icon',
  component: Icon,
};

export function BasicUsage() {
  /**
   * Show all icons, ordering from a to z.
   */
  return (
    <>
      {Object.keys(iconMap)
        .sort()
        .map((iconType) => (
          <Icon
            type={iconType}
            spinning={iconType.includes('loading')}
          />
        ))}
    </>
  );
}
BasicUsage.story = {
  name: 'Basic Icons Set',
};

export function CRMIconsSet() {
  return (
    <div>
      <Icon type="crm-address" />
      <Icon type="crm-age" />
      <Icon type="crm-birthday" />
      <Icon type="crm-email" />
      <Icon type="crm-gender" />
      <Icon type="crm-member-name" />
      <Icon type="crm-member-note" />
      <Icon type="crm-phone-land" />
      <Icon type="crm-phone-mobile" />
    </div>
  );
}

export function ColorOptions() {
  return (
    <div>
      <Icon
        type="drag"
        color="gray"
      />
      <Icon
        type="edit"
        color="blue"
      />
      <Icon
        type="trashcan"
        color="red"
      />
      <Icon
        type="add"
        style={{ color: '#78c878' }}
      />
    </div>
  );
}

export function InlineIconsSet() {
  return (
    <div>
      <Icon type="inline-loading" />
      <Icon type="inline-success" />
      <Icon type="inline-error" />
      <Icon type="inline-question" />
    </div>
  );
}

InlineIconsSet.story = {
  name: 'Inline-sized Icons Set',
};

export function InventoryIconsSet() {
  return (
    <div>
      <Icon type="inventory-category" />
      <Icon type="inventory-item" />
    </div>
  );
}

export function LargeSizeOptions() {
  return (
    <div>
      <Icon
        type="loading"
        large
        spinning
      />
      <Icon
        type="success"
        large
        color="blue"
      />
      <Icon
        type="error"
        large
        color="red"
      />
    </div>
  );
}

export function MenuPageIconsSet() {
  return (
    <div>
      <Icon type="add-item" />
      <Icon type="add-multi-items" />
      <Icon type="clear-item" />
    </div>
  );
}

export function PaginationIconsSet() {
  return (
    <div>
      <Icon type="first-page" />
      <Icon type="prev-page" />
      <Icon type="next-page" />
      <Icon type="last-page" />
    </div>
  );
}

export function PaymentIconsSet() {
  return (
    <div>
      <Icon type="cash" />
      <Icon type="credit-card" />
      <Icon type="ctbc-direct" />
      <Icon type="ctbc-mpos" />
      <Icon type="custom-pay" />
    </div>
  );
}
