import {ContaDao} from '../dao/conta-dao';

export class ContaService {
    private dao: ContaDao;

    constructor(dao: ContaDao) {
        this.dao = dao;
    }

    todas(request: any, response: any) {
        this.dao
            .todas
            .then((result: any) => response.json(result))
            .catch((error: any) => response.json(error));
    }
}
