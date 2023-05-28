import { useSelector } from 'react-redux';
import { RootState } from '../store';

export const useRootSelector = <T>(fn: (state: RootState) => T) => useSelector<RootState, T>(fn);
