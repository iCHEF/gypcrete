import React from 'react';

import Icon from 'src/Icon';
import StatusIcon from 'src/StatusIcon';
import DebugBox from '../DebugBox';

function IconDoc() {
    return (
        <div>
            <h2>&lt;Icon&gt;</h2>

            <div>
                <p>Basic icons</p>

                <Icon type="add" />
                <Icon type="edit" />
                <Icon type="duplicate" />
                <Icon type="copypaste" />
                <Icon type="tickets" />
                <Icon type="trashcan" />
                <Icon type="drag" />
                <Icon type="success" />
                <Icon type="error" />
                <Icon type="delete" />
                <Icon type="header-next" />
                <Icon type="header-prev" />
                <Icon type="fold" />
                <Icon type="unfold" />
                <Icon type="next" />
                <Icon type="prev" />
                <Icon type="folder" />
                <Icon type="loading" spinning />
                <Icon type="lock" />
                <Icon type="unlock" />
                <Icon type="radio-empty" />
                <Icon type="radio-half" />
                <Icon type="radio-selected" />
                <Icon type="picture" />
                <Icon type="printer" />
                <Icon type="pause" />
                <Icon type="play" />
                <Icon type="search" />
            </div>

            <div>
                <p>Payment icons</p>

                <Icon type="cash" />
                <Icon type="credit-card" />
                <Icon type="ctbc-direct" />
                <Icon type="ctbc-mpos" />
                <Icon type="custom-pay" />
            </div>

            <div>
                <p>CRM icons</p>

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

            <div>
                <p>Large icons</p>

                <Icon type="success" large style={{ color: '#78c878' }} />
                <Icon type="error" large color="blue" />
                <Icon type="delete" large color="red" />
            </div>

            <h2>&lt;StatusIcon&gt;</h2>

            <div>
                <StatusIcon status="loading" />
                <StatusIcon status="success" autohide={false} />
                <StatusIcon status="error" />
            </div>

            <div>
                <DebugBox width={32} height={32}>
                    <StatusIcon status="loading" position="corner" />
                </DebugBox>

                <DebugBox width={32} height={32}>
                    <StatusIcon status="success" position="corner" autohide={false} />
                </DebugBox>

                <DebugBox width={32} height={32}>
                    <StatusIcon status="error" position="corner" />
                </DebugBox>
            </div>
        </div>
    );
}

export default IconDoc;
