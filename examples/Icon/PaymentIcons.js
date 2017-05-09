import React from 'react';

import Icon from 'src/Icon';

function PaymentIconsSet() {
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

export default PaymentIconsSet;
