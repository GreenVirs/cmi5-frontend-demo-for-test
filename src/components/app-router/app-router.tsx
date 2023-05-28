import { Route, Routes } from 'react-router';
import { FC } from 'react';
import HomePage from '../../pages';
import UsersPage from '../../pages/users';
import CoursesPage from '../../pages/courses';
import CoursePage from '../../pages/courses/[id]';
import ProtectedRouteElement from '../protected-route-element/protected-route-element';

const AppRouter: FC = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/users" element={<UsersPage />} />
    <Route path="/courses">
      <Route index element={<ProtectedRouteElement element={<CoursesPage />} />} />
      <Route path=":id" element={<ProtectedRouteElement element={<CoursePage />} />} />
    </Route>
  </Routes>
);

export default AppRouter;
