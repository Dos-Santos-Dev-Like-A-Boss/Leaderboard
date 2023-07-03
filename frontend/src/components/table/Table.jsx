import styles from './table.module.scss';
import { TableItem } from '../tableItem/TableItem';

export const Table = ({ users, getAllUsers }) => {

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div />
        <div><h3>Username</h3></div>
        <div><h3>Game</h3></div>
        <div><h3>Score</h3></div>
        <div />
      </div>
      <div className={styles.tableInner}>
        {users.map((user, i) => <TableItem getAllUsers={getAllUsers} user={user} key={i} />)}
      </div>
    </div>
  );
};