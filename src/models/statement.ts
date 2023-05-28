import { ICourse } from './course';
import { IUser } from './user';

export interface IStatement {
  course: ICourse;
  user: IUser;
  statement: {
    id: string;
    statements: Record<string, any>;
  };
}
