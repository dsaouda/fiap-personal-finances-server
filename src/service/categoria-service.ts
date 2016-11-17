import {CategoriaDao} from '../dao/categoria-dao';
import {Categoria} from '../model/categoria';
import {ResponseProvider} from '../util/response-provider';
import {Request, Response} from 'express';
import {ObjectConverter} from '../util/object-converter';

export class CategoriaService {
    private dao: CategoriaDao;

    constructor(categoriaDao: CategoriaDao) {
        this.dao = categoriaDao;
    }

    todas(request: Request, response: Response) {
        return new ResponseProvider(response, this.dao.todas);
    }

    cadastrar(request: Request, response: Response) {
        let body = request.body;
        delete body.id;
        
        let categoria = <Categoria> ObjectConverter.fromJson(new Categoria(), body);

        return new ResponseProvider(
            response,
            this.dao.save(categoria),
            201
        );
    }

    atualizar(request: Request, response: Response) {
        return new ResponseProvider(response, this.dao.todas);
    }

    buscar(request: Request, response: Response) {
        return new ResponseProvider(
            response,
            this.dao.buscar(request.params.id)
        );
    }

    deletar(request: Request, response: Response) {
        return new ResponseProvider(response, this.dao.todas);
    }
}
