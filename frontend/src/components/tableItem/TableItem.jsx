import styles from './tableItem.module.scss';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { UpdateUserModal } from '../modals/UpdateUserModal';
import { DeleteUserModal } from '../modals/DeleteUserModal';

export const TableItem = ({ user, getAllUsers }) => {
  const { name, records, _id } = user;
  if (!records.length) {
    return;
  }

  return records.map((record, i) => {
    const validUserData = { name, game: record.game, score: record.score };
    return (
      <div key={i} className={styles.itemWrapper}>
        <div className={styles.iconWrapper}>
          <UpdateUserModal getAllUsers={getAllUsers}
                           userId={_id}
                           recordId={record._id}
                           existUserData={validUserData}
                           trigger={<EditIcon />} />
        </div>
        <div>{name}</div>
        <div>{record.game}</div>
        <div> {record.score}</div>
        <div className={styles.iconWrapper}>
          <DeleteUserModal
            getAllUsers={getAllUsers}
            userId={_id}
            recordId={record._id}
            trigger={<DeleteIcon />} />
        </div>
      </div>
    );
  });
};