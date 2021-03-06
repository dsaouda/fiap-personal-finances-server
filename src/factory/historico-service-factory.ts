import {historicoDao as dao} from './historico-dao-factory';
import {contaDao} from './conta-dao-factory';
import {HistoricoService} from '../service/historico-service';

export const historicoService = new HistoricoService(dao, contaDao);
