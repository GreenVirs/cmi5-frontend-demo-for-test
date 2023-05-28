import { FC, PropsWithChildren } from 'react';
import containerStyles from './app-container.module.scss';

type Props = PropsWithChildren;

const AppContainer: FC<Props> = ({ children }) => (
  <div className={containerStyles.container}>{children}</div>
);

export default AppContainer;
