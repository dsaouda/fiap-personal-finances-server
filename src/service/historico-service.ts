import {HistoricoDao} from '../dao/historico-dao';

export class HistoricoService {
    private dao: HistoricoDao;

    constructor(dao: HistoricoDao) {
        this.dao = dao;
    }

    todos(request: any, response: any) {
        this.dao
            .todos
            .then((result: any) => response.json(result))
            .catch((error: any) => response.json(error));
    }
}
