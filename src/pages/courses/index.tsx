import { FC, useEffect, useState } from 'react';
import {
  Link,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { getCourses } from '../../api/courses';
import { ICourse } from '../../models/course';

const CoursesPage: FC = () => {
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getCourses()
      .then((data) => {
        setCourses(data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>Загрузка курсов</div>;
  }

  return (
    <div>
      <Link href="/courses/create">Создать курс</Link>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>title</TableCell>
              <TableCell align="right">description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses.map(({ id, title, description }) => (
              <TableRow key={id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  <Link href={`/courses/${id}`}>{title}</Link>
                </TableCell>
                <TableCell align="right">{description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
export default CoursesPage;
