import {ContaDao} from '../dao/conta-dao';
import {ResponseProvider} from '../util/response-provider';
import {Request, Response} from 'express';

export class ContaService {
    private dao: ContaDao;

    constructor(dao: ContaDao) {
        this.dao = dao;
    }

    todas(request: Request, response: Response) {
        return new ResponseProvider(response, this.dao.todas);
    }
}
