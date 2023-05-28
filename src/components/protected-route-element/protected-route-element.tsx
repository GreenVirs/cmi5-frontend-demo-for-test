import { FC, ReactElement } from 'react';
import { useLocation, Navigate } from 'react-router';
import { selectUser } from '../../services/reducers/user';
import { useRootSelector } from '../../hooks/use-root-selector';

interface IProtectedRouteElement {
  element: ReactElement | null;
}
const ProtectedRouteElement: FC<IProtectedRouteElement> = ({ element }) => {
  const user = useRootSelector(selectUser);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/users" state={{ from: location }} />;
  }

  return element;
};

export default ProtectedRouteElement;
