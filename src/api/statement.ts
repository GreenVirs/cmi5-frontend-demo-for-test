import { find } from './common';
import { IStatement } from '../models/statement';

export const getStatement = () => find<IStatement>('statement');
