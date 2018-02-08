import React from 'react';

import { PureModal as Modal } from '@ichef/gypcrete/src/Modal';

function BasicModalExample() {
    return (
        <div>
            <Modal>
                <div>
                    Demo
                </div>
            </Modal>

            <div style={{ height: 50 }} />

            <Modal placement="top">
                <div>
                    Demo
                </div>
            </Modal>
        </div>
    );
}

export default BasicModalExample;
