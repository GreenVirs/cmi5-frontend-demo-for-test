import { FC, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router';
import { Button } from '@mui/material';
import { getCourse, enrollmentCourse } from '../../api/courses';
import { ICourseWithUsers } from '../../models/course';
import { useRootSelector } from '../../hooks/use-root-selector';
import { selectUser } from '../../services/reducers/user';

const CoursePage: FC = () => {
  const [course, setCourse] = useState<ICourseWithUsers | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const user = useRootSelector(selectUser);
  const { id } = useParams();
  useEffect(() => {
    setIsLoading(true);
    getCourse(id as string)
      .then((data) => {
        setCourse(data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const onEnrollmentCourse = () => {
    if (!course || !user) {
      return;
    }
    enrollmentCourse({ course_id: course.id, user_id: user.id }).catch((e) => {
      console.error(e);
    });
  };

  const isEnrollmentCourse = useMemo(() => {
    if (!course || !user) {
      return false;
    }
    return course.users.some(({ id: userId }) => userId === user.id);
  }, [course, user]);

  if (isLoading) {
    return <div>Загрузка курса</div>;
  }

  return isEnrollmentCourse ? (
    <Button>Продолжить курс</Button>
  ) : (
    <Button onClick={onEnrollmentCourse}>Начать курс</Button>
  );
};
export default CoursePage;
