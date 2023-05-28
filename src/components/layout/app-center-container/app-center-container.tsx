import { FC, PropsWithChildren } from 'react';
import styles from './app-center-container.module.scss';

const AppCenterContainer: FC<PropsWithChildren> = ({ children }) => (
  <div className={styles.container}>{children}</div>
);

export default AppCenterContainer;
