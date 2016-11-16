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
        let categoria = new Categoria();
        categoria.setId(1);
        categoria.setNome('ABC');
        categoria.setDescricao('DEF');
        categoria.setRecorrente(true);

        //this.dao.save(categoria);

        return new ResponseProvider(response, this.dao.todas);
    }
}
