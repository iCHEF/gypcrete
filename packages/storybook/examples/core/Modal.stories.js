import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';

import Modal, { PureModal } from '@ichef/gypcrete/src/Modal';

import Button from '@ichef/gypcrete/src/Button';
import HeaderRow from '@ichef/gypcrete/src/HeaderRow';
import TextLabel from '@ichef/gypcrete/src/TextLabel';

import { ContainsColumnView } from './SplitView.stories';

export default {
  title: 'gypcrete/Modal',
  component: PureModal,
  subcomponents: {
    'renderToLayer()': Modal,
  },
};

export function ClosableModal({
  children = 'Modal Content',
  title = 'Closable Modal',
  ...modalProps
}) {
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    action('cancel')();
    setModalOpen(false);
  };

  // For storybook demo usage we have to move <ModalHeader> inside <ClosableModal>,
  // or storybook won't show the full jsx code.
  // However, in real use case you may want to extract this out.

  const ModalHeader = ({ onCancel, labelText }) => {
    const cancelBtn = <Button color="black" basic="Cancel" onClick={onCancel} />;
    const filterBtn = <Button bold basic="Filter" onClick={action('filter')} />;
    const label = <TextLabel align="center" basic={labelText} />;

    return (
      <HeaderRow
        left={cancelBtn}
        center={label}
        right={filterBtn}
      />
    );
  };

  ModalHeader.propTypes = {
    labelText: PropTypes.string,
    onCancel: PropTypes.func,
  };

  ModalHeader.defaultProps = {
    labelText: '',
    onCancel: () => {},
  };

  const header = (
    <ModalHeader
      onCancel={handleModalClose}
      labelText={title}
    />
  );
  if (!modalOpen) {
    return (
      <div>
        <Button
          solid
          color="blue"
          onClick={handleModalOpen}
          style={{ display: 'inline-block' }}
        >
          Open Modal
        </Button>
      </div>
    );
  }

  return (
    <Modal
      header={header}
      onClose={handleModalClose}
      {...modalProps}
    >
      {children}
    </Modal>
  );
}

ClosableModal.propTypes = {
  title: PropTypes.string,
};


export function SplitViewModal() {
  return (
  /* See the Closable Modal example */
    <ClosableModal title="With <SplitView>" flexBody bodyPadding={{ bottom: 0 }}>
      {/* See <SplitView> => `contains <ColumnView>` doc for <ContainsColumnView> */}
      <ContainsColumnView />
    </ClosableModal>
  );
}

SplitViewModal.story = {
  name: 'With <SplitView>',
};

export function CenteredModal() {
  return (
  /* See the Closable Modal example */
    <ClosableModal title="Vertically-centered modal" centered>
      Hello World!
    </ClosableModal>
  );
}

export function MultilpleLayerModal() {
  const maxDepth = 10;
  const MulitpleClosableModalExample = ({ depth }) => {
    if (depth === 0) {
      return false;
    }
    const currentLayer = maxDepth - depth + 1;
    return (
    /* See the Closable Modal example */
      <ClosableModal title={`Modal ${currentLayer}`}>
        {currentLayer !== maxDepth
          ? (
            <div>
              Click Open Modal to open Modal
              {currentLayer + 1}
            </div>
          )
          : 'This is the last modal.'}
        <MulitpleClosableModalExample depth={depth - 1} />
      </ClosableModal>
    );
  };
  MulitpleClosableModalExample.propTypes = {
    depth: PropTypes.number.isRequired,
  };

  return <MulitpleClosableModalExample depth={maxDepth} />;
}

MultilpleLayerModal.story = {
  parameters: {
    docs: {
      storyDescription: 'Indented with 32px from each side for each layer. When number of layer > 7 we won\'t indent it',
    },
  },
};
