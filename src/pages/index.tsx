import { FC } from 'react';
import { ButtonGroup, Button } from '@mui/material';
import AppMain from '../components/layout/app-main/app-main';
import AppCenterContainer from '../components/layout/app-center-container/app-center-container';

const HomePage: FC = () => (
  <AppMain>
    <AppCenterContainer>
      <ButtonGroup>
        <Button href="/users">Выбрать пользователя</Button>
        <Button component="button" href="/courses">
          Список курсов
        </Button>
      </ButtonGroup>
    </AppCenterContainer>
  </AppMain>
);
export default HomePage;
