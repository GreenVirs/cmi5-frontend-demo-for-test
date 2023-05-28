import { FC, useCallback, useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router';
import { IUser } from '../models/user';
import { getUsers } from '../api/users';
import { useAppDispatch } from '../hooks/use-app-dispatch';
import { SET } from '../services/reducers/user';

const UsersPage: FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    getUsers()
      .then((data) => {
        setUsers(data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const onSelectUser = useCallback(
    (user: IUser) => {
      dispatch(SET(user));
      navigate('/courses');
    },
    [dispatch]
  );

  if (isLoading) {
    return <div>Загрузка пользователей</div>;
  }

  return (
    <div>
      <h1>Выберите пользователя</h1>
      {users.map(({ id, email }) => (
        <Button onClick={() => onSelectUser({ id, email })} key={id}>
          {email}
        </Button>
      ))}
    </div>
  );
};
export default UsersPage;
