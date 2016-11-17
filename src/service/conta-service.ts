import {ContaDao} from '../dao/conta-dao';
import {Conta} from '../model/conta';
import {ResponseProvider} from '../util/response-provider';
import {Request, Response} from 'express';
import {ObjectConverter} from '../util/object-converter';
import {Uri} from '../util/uri';

export class ContaService {
    private dao: ContaDao;

    constructor(categoriaDao: ContaDao) {
        this.dao = categoriaDao;
    }

    todas(request: Request, response: Response) {
        return new ResponseProvider(response, this.dao.todas);
    }

    cadastrar(request: Request, response: Response) {
        let body = request.body;
        delete body.id;

        let categoria = <Conta> ObjectConverter.fromJson(new Conta(), body);

        this.dao.save(categoria)
            .then((result: any) => {
                response.status(201);
                response.setHeader('Location', Uri.base(`/contas/${result.id}`))
                response.json(result);
            })
            .catch((error: any) => {
                response.status(400).json(error);
            });
    }

    atualizar(request: Request, response: Response) {
        let body = request.body;
        delete body.id;

        let categoria = <Conta> ObjectConverter.fromJson(new Conta(), body);
        categoria.setId(request.params.id);

        this.dao.buscar(categoria.getId())
            .then((result: any) => {
                if (Object.keys(result).length === 0) {
                    return response.status(404).json({message: 'Conta não encontrada!'});
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
                    return response.status(404).json({message: 'Conta não encontrada!'});
                }

                return response.status(200).json(ObjectConverter.fromJson(new Conta(), result[0]));
            });
    }

    deletar(request: Request, response: Response) {
        let id: number = Number(request.params.id);

        this.dao.buscar(id)
            .then((result: any) => {
                if (Object.keys(result).length === 0) {
                    return response.status(404).json({message: 'Conta não encontrada!'});
                }

                this.dao.deletar(id).then((result: any) => {
                    response.status(200).send();
                });
            });
    }
}
