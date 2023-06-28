import { FC, FormEvent } from 'react';
import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router';
import { useForm } from '../../hooks/use-form';
import { createCourse } from '../../api/courses';

const CreateCoursePage: FC = () => {
  const [state, setState] = useForm({ title: '', description: '', file: null });
  const navigate = useNavigate();
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    createCourse(form)
      .then((data) => {
        console.log('data', data);
        navigate('/courses');
      })
      .catch((error) => {
        console.log('error', error);
      });
  };
  return (
    <form onSubmit={onSubmit}>
      <TextField value={state.title} onChange={setState} name="title" type="text" />
      <TextField value={state.description} onChange={setState} name="description" type="text" />
      <TextField
        inputProps={{
          accept: 'application/zip',
        }}
        onChange={setState}
        name="file"
        type="file"
      />
      <Button type="submit">Отправить</Button>
    </form>
  );
};

export default CreateCoursePage;
