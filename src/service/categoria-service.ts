import {CategoriaDao} from '../dao/categoria-dao';
import {Categoria} from '../model/categoria';
import {ResponseProvider} from '../util/response-provider';
import {Request, Response} from 'express';

export class CategoriaService {
    private dao: CategoriaDao;

    constructor(categoriaDao: CategoriaDao) {
        this.dao = categoriaDao;
    }

    todas(request: Request, response: Response) {
        return new ResponseProvider(response, this.dao.todas);
    }
}
