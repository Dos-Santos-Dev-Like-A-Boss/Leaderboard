import React, { useCallback, useEffect, useState } from 'react';
import styles from './leaderboard.module.scss';
import { Table } from '../../components/table/Table';
import { UserApi } from '../../api/user/userApi';
import { CreateUserModal } from '../../components/modals/CreateUserModal';

export const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  const getAllUsers = useCallback( () => {
    try {
      (async () => {
        const { data } = await UserApi.getAllUsers();
        if (data) {
          setUsers(data.users)
        }
      })()
    } catch (e) {
      console.log('Error 💥', e);
    }
  }, []);

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);


  return (
    <div className={styles.wrapper}>
      <h2>Leaderboard</h2>
      <Table getAllUsers={getAllUsers} users={users} />
      <div className={styles.buttonWrapper}>
        <CreateUserModal getAllUsers={getAllUsers} />
      </div>
    </div>
  );
};