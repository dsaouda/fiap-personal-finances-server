import {HistoricoDao} from '../dao/historico-dao';
import {Request, Response} from 'express';
import {DateConverter} from '../util/date-converter';
import {ResponseProvider} from '../util/response-provider';

export class HistoricoService {
    private dao: HistoricoDao;

    constructor(dao: HistoricoDao) {
        this.dao = dao;
    }

    filtro(request: Request, response: Response) {
        let query = request.query;
        let from = DateConverter.toDate(query.from);
        let to = DateConverter.toDate(query.to);
        let contaId: number = query.conta_id;

        new ResponseProvider(response, this.dao.buscar(from, to, contaId));
    }

    todos(request: any, response: any) {
        new ResponseProvider(response, this.dao.todos);
    }
}
