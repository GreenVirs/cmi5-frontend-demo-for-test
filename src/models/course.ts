import { IUser } from './user';

export interface ICourse {
  id: string;
  title: string;
  description: string;
}

export interface ICourseWithUsers extends ICourse {
  users: IUser[];
}
