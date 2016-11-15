import * as conn from './connection';
import { HistoricoDao } from '../dao/historico-dao';

export const historicoDao = new HistoricoDao(conn);
