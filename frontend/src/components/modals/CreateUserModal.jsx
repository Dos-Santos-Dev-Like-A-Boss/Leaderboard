import { CustomModal } from './CustomModal';
import React, { useCallback, useState } from 'react';
import { UserApi } from '../../api/user/userApi';
import { Button, CircularProgress, DialogActions, DialogContent, DialogContentText, TextField } from '@mui/material';
import { useBoolean } from '../../hooks/useBoolean';
import { checkFalsyValuesInsideArray } from '../../utils/checkBooleanValuesInsideArray';
import { toastHelper } from '../../utils/toastHelper';

const initialUserData = {
  name: '',
  game: '',
  score: '',
};
const initialTouchedFieldsUser = {
  name: false,
  game: false,
  score: false,
};

export const CreateUserModal = ({ getAllUsers }) => {
  const [userData, setUserData] = useState(initialUserData);
  const [touchedFieldsUser, setTouchedFieldsUser] = useState(initialTouchedFieldsUser);
  const ModalState = useBoolean(false);
  const LoadingState = useBoolean(false);
  const onConfirmHandler = useCallback(async ({ name, game, score }) => {
    try {
      await UserApi.createUser({ name, records: { game, score } });
      await getAllUsers();
    } catch (e) {
      toastHelper(e.response.data.data.error);
    }

  }, [getAllUsers]);

  const checkError = (key) => {
    return !userData[key] && touchedFieldsUser[key];
  };

  const userDataHandler = (key) => (event) => {
    setUserData(prevState => ({
      ...prevState,
      [key]: event.target.value,
    }));
    setTouchedFieldsUser(prevState => ({
      ...prevState,
      [key]: true,
    }));
  };

  const setToInitial = () => {
    setUserData(initialUserData);
    setTouchedFieldsUser(initialTouchedFieldsUser);
  };

  const onConfirmFn = async () => {
    LoadingState.on();
    await onConfirmHandler(userData);
    LoadingState.off();
    setToInitial();
    ModalState.off();
  };

  const onCancelFn = () => {
    setToInitial();
    ModalState.off();
  };

  const disableSubmitButton = checkFalsyValuesInsideArray(Object.values(userData).map(el => !!el));

  const renderContent = () => {
    return (
      <DialogContent>
        <DialogContentText>
          Fill out the form for create the user
        </DialogContentText>
        <TextField
          value={userData.name}
          onChange={userDataHandler('name', setUserData, setTouchedFieldsUser)}
          helperText={checkError('name') && 'name shouldn\'t be empty'}
          error={checkError('name')}
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
          error={checkError('game')}
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
          error={checkError('score')}
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
      <Button onClick={onCancelFn}>Cancel</Button>
      <Button disabled={disableSubmitButton} onClick={onConfirmFn}>
        {LoadingState.state ? <CircularProgress size={20} /> : ' Submit new user'}
      </Button>
    </DialogActions>
  );

  return <CustomModal
    modalTitle={'Create new user'}
    nameForInvokeModal={'Create new user'}
    ModalState={ModalState}
  >
    {renderContent()}
    {renderActionButtons()}
  </CustomModal>;
};