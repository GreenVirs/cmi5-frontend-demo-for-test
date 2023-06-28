import { create, findOne } from './common';
import { IStatement } from '../models/statement';

export const getStatement = (data: { course_id: string; user_id: string }) =>
  findOne<IStatement>(`statement/${data.course_id}/${data.user_id}`);
export const pushStatement = (data: {
  statement: Record<string, any>;
  user_id: string;
  course_id: string;
}) => create('statement', data);
