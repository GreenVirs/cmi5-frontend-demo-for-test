import { IUser } from '../models/user';
import { find } from './common';

export const getUsers = () => find<IUser>('users');
