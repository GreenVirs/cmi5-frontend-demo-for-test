import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router';
import { Button } from '@mui/material';
import { getCourse, enrollmentCourse } from '../../api/courses';
import { ICourseWithUsers } from '../../models/course';
import { useRootSelector } from '../../hooks/use-root-selector';
import { selectUser } from '../../services/reducers/user';
import { getStatement, pushStatement } from '../../api/statement';
import { IStatement } from '../../models/statement';

const CoursePage: FC = () => {
  const [course, setCourse] = useState<ICourseWithUsers | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const user = useRootSelector(selectUser);
  const { id } = useParams();
  const [statement, setStatement] = useState<IStatement['statements'] | null>(null);
  const getData = () =>
    getCourse(id as string).then((data) => {
      setCourse(data);
      if (data.users.some(({ id: userId }) => userId === user!.id)) {
        getStatement({ course_id: data.id, user_id: user!.id }).then(({ statements: state }) => {
          // @ts-ignore
          if (!state) {
            setStatement({} as IStatement['statements']);
            return;
          }
          setStatement(state);
          if (Object.keys(state).length) {
            const { courseID, ...s } = state;
            localStorage.setItem(courseID, JSON.stringify(s));
          }
        });
      }
    });
  const storageChange = useCallback(
    (e: StorageEvent) => {
      if (/^ispring::\{/.test(e.key as string)) {
        if (e.newValue) {
          const state = {
            courseID: e.key,
            ...JSON.parse(e.newValue),
          };
          setStatement(state);
          pushStatement({
            statement: state,
            user_id: user!.id as string,
            course_id: id as string,
          }).catch((error: any) => {
            console.log('error', error);
          });
        }
      }
    },
    [course, user]
  );
  useEffect(() => {
    window.addEventListener('storage', (e) => storageChange(e));
    setIsLoading(true);
    getData().finally(() => {
      setIsLoading(false);
    });
    return () => {
      window.removeEventListener('storage', (e) => storageChange(e));
      Object.keys({ ...localStorage }).forEach((item) => {
        if (/^ispring::\{/.test(item as string)) {
          localStorage.removeItem(item);
        }
      });
    };
  }, []);

  const onEnrollmentCourse = () => {
    if (!course || !user) {
      return;
    }
    enrollmentCourse({ course_id: course.id, user_id: user.id })
      .then(() => {
        setIsLoading(true);
        getData().finally(() => {
          setIsLoading(false);
        });
      })
      .catch((e) => {
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

  return (
    <>
      {!isEnrollmentCourse && <Button onClick={onEnrollmentCourse}>Начать курс</Button>}
      {isEnrollmentCourse && course && statement && (
        <iframe
          width="100%"
          height="100%"
          title="Курс"
          src={course.file_link}
          sandbox="allow-storage-access-by-user-activation
                 allow-scripts
                 allow-same-origin"
        />
      )}
    </>
  );
};
export default CoursePage;
