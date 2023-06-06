import { create, find, findOne } from './common';
import { ICourse, ICourseWithUsers } from '../models/course';

export const getCourses = () => find<ICourse>('courses/all');
export const getCourse = (id: string) => findOne<ICourseWithUsers>(`courses/${id}`);

export const createCourse = (data: FormData) =>
  create('courses', data, {
    headers: new Headers({
      'Content-Type': 'multipart/form-data',
    }),
  });

export const enrollmentCourse = (data: { course_id: string; user_id: string }) =>
  create('courses/enrollment', data);
