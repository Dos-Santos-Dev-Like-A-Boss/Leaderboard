import React from 'react';
import { UserApi } from '../../api/user/userApi';
import { CustomModal } from './CustomModal';
import { useBoolean } from '../../hooks/useBoolean';
import { Button, CircularProgress, DialogContent, DialogContentText } from '@mui/material';

export const DeleteUserModal = ({ getAllUsers, trigger, userId, recordId }) => {
  const ModalState = useBoolean();
  const LoadingState = useBoolean();

  const onDeleteUser = async () => {
    LoadingState.on();
    await UserApi.deleteUser(userId);
    await getAllUsers();
    LoadingState.off();
  };

  const onDeleteRecord = async () => {
    LoadingState.on();
    await UserApi.deleteRecord(userId, recordId);
    await getAllUsers();
    LoadingState.off();
  };

  const renderMainContent = () => {
    return (
      <DialogContent>
        <DialogContentText sx={{ marginY: '20px' }}>
          {'You can delete the whole user or a single score'}
        </DialogContentText>
        <Button onClick={ModalState.off}>Cancel</Button>
        <Button onClick={onDeleteRecord}>
          {LoadingState.state ? <CircularProgress size={20} /> : 'Delete current score'}
        </Button>
        <Button onClick={onDeleteUser}>
          {LoadingState.state ? <CircularProgress size={20} /> : 'Delete current user'}
        </Button>
      </DialogContent>
    );
  };

  return <CustomModal
    modalTitle={'Delete current user from Leaderboard'}
    ModalState={ModalState}
    triggerForInvokeModal={trigger}
  >
    {renderMainContent()}
  </CustomModal>;
};