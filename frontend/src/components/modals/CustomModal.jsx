import {
  Button,
  Dialog,
  DialogTitle,
} from '@mui/material';
import React from 'react';


export const CustomModal = (
  {
    nameForInvokeModal = 'Open the modal',
    modalTitle = 'Title',
    ModalState,
    triggerForInvokeModal,
    children,
  }) => {
  const renderTriggerForModal = () => {
    if (triggerForInvokeModal) {
      return React.cloneElement(triggerForInvokeModal, {
        onClick: (e) => {
          ModalState.on();
        },
      });
    } else {
      return (<Button variant='outlined' onClick={ModalState.on}>
        {nameForInvokeModal}
      </Button>);
    }
  };

  return (
    <div>
      {renderTriggerForModal()}
      <Dialog open={ModalState.state} onClose={ModalState.off}>
        <DialogTitle>{modalTitle}</DialogTitle>
        {children}
      </Dialog>
    </div>
  );
};