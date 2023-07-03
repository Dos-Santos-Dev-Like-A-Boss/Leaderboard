import { UserApi } from '../../api/user/userApi';
import { CustomModal } from './CustomModal';
import React, { useCallback, useEffect, useState } from 'react';
import { useBoolean } from '../../hooks/useBoolean';
import {
  Button,
  CircularProgress, Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';
import { checkFalsyValuesInsideArray } from '../../utils/checkBooleanValuesInsideArray';

const initialRecordData = {
  game: '',
  score: '',
};

const initialTouchedFieldsRecord = {
  game: false,
  score: false,
};


export const UpdateUserModal = ({ existUserData, getAllUsers, trigger, userId, recordId }) => {
  const [userData, setUserData] = useState(existUserData);
  const [newRecordData, setNewRecordData] = useState(initialRecordData);
  const [touchedFieldsRecord, setTouchedFieldsRecord] = useState(initialTouchedFieldsRecord);
  const ModalState = useBoolean();
  const LoadingState = useBoolean();
  const ModalForAddNewRecord = useBoolean();

  useEffect(() => {
    setUserData(existUserData);
  }, [existUserData]);

  const onConfirmHandler = useCallback(async ({ name, game, score }, recordIsNew = false) => {
    const existRecordId = recordIsNew ? undefined : recordId;
    await UserApi.updateUser(userId, { name, records: [{ game, score, recordId: existRecordId }] });
    await getAllUsers();
  }, [getAllUsers, recordId, userId]);


  const checkError = (key) => {
    return !userData[key];
  };

  const checkErrorForRecord = (key) => {
    return !newRecordData[key] && touchedFieldsRecord[key];
  };


  const userDataHandler = (key) => event => {
    setUserData(prevState => ({
      ...prevState,
      [key]: event.target.value,
    }));
  };

  const newRecordDataHandler = (key) => event => {
    setNewRecordData(prev => ({
      ...prev,
      [key]: event.target.value,
    }));
    setTouchedFieldsRecord(prev => ({
      ...prev,
      [key]: true,
    }));
  };

  const onConfirmFn = async () => {
    LoadingState.on();
    await onConfirmHandler(userData);
    LoadingState.off();
    ModalState.off();
  };

  const onClickForAddScoreHandler = () => {
    ModalState.off();
    ModalForAddNewRecord.on();
  };

  const setRecordToInitial = () => {
    setNewRecordData(initialRecordData);
    setTouchedFieldsRecord(initialTouchedFieldsRecord);
  };

  const onCloseRecordModalHandler = () => {
    setRecordToInitial();
    ModalForAddNewRecord.off();
  };

  const onConfirmRecordFn = async () => {
    LoadingState.on();
    await onConfirmHandler({ name: userData.name, game: newRecordData.game, score: newRecordData.score }, true);
    LoadingState.off();
    onCloseRecordModalHandler();
  };

  const renderContent = () => {
    return (
      <DialogContent>
        <DialogContentText>
          Fill out the form for create the user
        </DialogContentText>
        <TextField
          value={userData.name}
          onChange={userDataHandler('name')}
          helperText={!userData.name && 'name shouldn\'t be empty'}
          error={!userData.name}
          margin='dense'
          label='name'
          type='text'
          fullWidth
          variant='standard'
        />
        <TextField
          value={userData.game}
          onChange={userDataHandler('game')}
          helperText={checkError('game') && 'game shouldn\'t be empty'}
          error={!userData.game}
          margin='dense'
          label='Game'
          type='text'
          fullWidth
          variant='standard'
        />
        <TextField
          value={userData.score}
          onChange={userDataHandler('score')}
          helperText={checkError('score') && 'score shouldn\'t be empty'}
          error={!userData.score}
          margin='dense'
          label='Score'
          type='number'
          fullWidth
          variant='standard'
        /></DialogContent>
    );
  };

  const renderActionButtons = () => (
    <DialogActions>
      <Button onClick={onClickForAddScoreHandler}> Add new score </Button>
      <Button onClick={ModalState.off}>Cancel</Button>
      <Button onClick={onConfirmFn}>
        {LoadingState.state ? <CircularProgress size={20} /> : ' Update new changes'}
      </Button>
    </DialogActions>
  );

  const disableRecordSubmitButton = checkFalsyValuesInsideArray(Object.values(newRecordData).map(el => !!el))

  const renderDialogForAddingScores = () => {
    return (
      <Dialog open={ModalForAddNewRecord.state} onClose={ModalForAddNewRecord.off}>
        <DialogTitle>{'Add new score'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {'You can add a new score for current user'}
          </DialogContentText>
          <TextField
            value={newRecordData.game}
            onChange={newRecordDataHandler('game')}
            helperText={checkErrorForRecord('game') && 'game shouldn\'t be empty'}
            error={checkErrorForRecord('game')}
            margin='dense'
            label='Game'
            type='text'
            fullWidth
            variant='standard'
          />
          <TextField
            value={newRecordData.score}
            onChange={newRecordDataHandler('score')}
            helperText={checkErrorForRecord('score') && 'score shouldn\'t be empty'}
            error={checkErrorForRecord('score')}
            margin='dense'
            label='Score'
            type='number'
            fullWidth
            variant='standard'
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onCloseRecordModalHandler}>Cancel</Button>
          <Button disabled={disableRecordSubmitButton} onClick={onConfirmRecordFn}>{LoadingState.state ?
            <CircularProgress size={20} /> : 'Submit new record'}</Button>
        </DialogActions>
      </Dialog>
    );
  };

  return <>
    {renderDialogForAddingScores()}
    <CustomModal
      modalTitle={'Update the user'}
      triggerForInvokeModal={trigger}
      ModalState={ModalState}
    >
      {renderContent()}
      {renderActionButtons()}
    </CustomModal>
  </>;
};