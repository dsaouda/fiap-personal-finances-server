import * as conn from './connection';
import { ContaDao } from '../dao/conta-dao';

export const contaDao = new ContaDao(conn);
