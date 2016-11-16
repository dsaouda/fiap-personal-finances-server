import {HistoricoDao} from '../dao/historico-dao';
import {Request, Response} from 'express';
import {DateConverter} from '../util/date-converter';
import {ResponseProvider} from '../util/response-provider';
import {PromiseFail} from '../util/promise-fail';

export class HistoricoService {
    private dao: HistoricoDao;

    constructor(dao: HistoricoDao) {
        this.dao = dao;
    }

    filtro(request: Request, response: Response) {
        let query = request.query;

        if (JSON.stringify(query) == '{}') {
            return new ResponseProvider(response, new PromiseFail('Nenhum filtro foi informado.'), 400);
        }

        let from = DateConverter.toDate(query.from);
        let to = DateConverter.toDate(query.to);
        let contaId: number = query.conta_id;

        return new ResponseProvider(response, this.dao.buscar(from, to, contaId));
    }

    todos(request: any, response: any) {
        return new ResponseProvider(response, this.dao.todos);
    }
}
