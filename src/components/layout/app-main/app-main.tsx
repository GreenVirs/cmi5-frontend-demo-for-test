import { FC, PropsWithChildren } from 'react';
import containerStyles from '../app-container/app-container.module.scss';
import appStyles from './app-main.module.css';

const AppMain: FC<PropsWithChildren> = ({ children }) => (
  <main className={`${containerStyles.container} ${appStyles.main}`}>{children}</main>
);

export default AppMain;
