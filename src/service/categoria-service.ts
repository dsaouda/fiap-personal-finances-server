import {CategoriaDao} from '../dao/categoria-dao';
import {Categoria} from '../model/categoria';
import {ResponseProvider} from '../util/response-provider';
import {Request, Response} from 'express';
import {ObjectConverter} from '../util/object-converter';
import {Uri} from '../util/uri';

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

        this.dao.save(categoria)
            .then((result: any) => {
                response.status(201);
                response.setHeader('Location', Uri.base(`/categorias/${result.id}`))
                response.json(result);
            })
            .catch((error: any) => {
                response.status(400).json(error);
            });
    }

    atualizar(request: Request, response: Response) {
        let body = request.body;
        delete body.id;

        let categoria = <Categoria> ObjectConverter.fromJson(new Categoria(), body);
        categoria.setId(request.params.id);

        this.dao.buscar(categoria.getId())
            .then((result: any) => {
                if (Object.keys(result).length === 0) {
                    return response.status(404).json({message: 'Categoria não encontrada!'});
                }

                return new ResponseProvider(
                    response,
                    this.dao.save(categoria)
                );
            });
    }

    buscar(request: Request, response: Response) {

        this.dao.buscar(request.params.id)
            .then((result: any) => {
                if (Object.keys(result).length === 0) {
                    return response.status(404).json({message: 'Categoria não encontrada!'});
                }

                return response.status(200).json(ObjectConverter.fromJson(new Categoria(), result));
            });
    }

    deletar(request: Request, response: Response) {
        let id: number = Number(request.params.id);

        this.dao.buscar(id)
            .then((result: any) => {
                if (Object.keys(result).length === 0) {
                    return response.status(404).json({message: 'Categoria não encontrada!'});
                }

                this.dao.deletar(id).then((result: any) => {
                    response.status(200).send();
                });
            });
    }
}
