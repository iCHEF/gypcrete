import PropTypes from 'prop-types';
import React from 'react';
import { action } from '@storybook/addon-actions';

import {
    Button,
    HeaderRow,
    TextLabel,
} from '@ichef/gypcrete';

const L_MODAL_TITLE = 'Closable Modal';
const L_FILTER_DATA = 'Filter';
const L_CANCEL = 'Cancel';

function ModalHeader({ onCancel }) {
    const cancelBtn = <Button color="black" basic={L_CANCEL} onClick={onCancel} />;
    const filterBtn = <Button bold basic={L_FILTER_DATA} onClick={action('filter')} />;
    const label = <TextLabel align="center" basic={L_MODAL_TITLE} />;

    return (
        <HeaderRow
            left={cancelBtn}
            center={label}
            right={filterBtn} />
    );
}

ModalHeader.propTypes = {
    onCancel: PropTypes.func,
};

ModalHeader.defaultProps = {
    onCancel: () => {},
};

export default ModalHeader;
