import {contaDao as dao} from './conta-dao-factory';
import {ContaService} from '../service/conta-service';

export const contaService = new ContaService(dao);
