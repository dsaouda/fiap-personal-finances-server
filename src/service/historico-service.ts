import {HistoricoDao} from '../dao/historico-dao';
import {Historico} from '../model/historico';
import {ResponseProvider} from '../util/response-provider';
import {Request, Response} from 'express';
import {ObjectConverter} from '../util/object-converter';
import {DateConverter} from '../util/date-converter';
import {Uri} from '../util/uri';

export class HistoricoService {
    private dao: HistoricoDao;

    constructor(categoriaDao: HistoricoDao) {
        this.dao = categoriaDao;
    }

    todos(request: Request, response: Response) {

        let query = request.query;

        if (JSON.stringify(query) == '{}') {
            return new ResponseProvider(response, this.dao.todos);
        }

        let from = DateConverter.toDate(query.from);
        let to = DateConverter.toDate(query.to);
        let contaId: number = query.conta_id;

        return new ResponseProvider(response, this.dao.buscarFiltro(from, to, contaId));
    }

    cadastrar(request: Request, response: Response) {
        let body = request.body;
        delete body.id;

        //no cadastro o body.status sempre é A
        delete body.status;

        let categoria = <Historico> ObjectConverter.fromJson(new Historico(), body);

        this.dao.save(categoria)
            .then((result: any) => {
                response.status(201);
                response.setHeader('Location', Uri.base(`/historicos/${result.id}`))
                response.json(result);
            })
            .catch((error: any) => {
                response.status(400).json(error);
            });
    }

    atualizar(request: Request, response: Response) {
        let body = request.body;
        delete body.id;

        let categoria = <Historico> ObjectConverter.fromJson(new Historico(), body);
        categoria.setId(request.params.id);

        this.dao.buscar(categoria.getId())
            .then((result: any) => {
                if (Object.keys(result).length === 0) {
                    return response.status(404).json({message: 'Historico não encontrada!'});
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
                    return response.status(404).json({message: 'Historico não encontrada!'});
                }

                return response.status(200).json(ObjectConverter.fromJson(new Historico(), result[0]));
            });
    }

    deletar(request: Request, response: Response) {
        let id: number = Number(request.params.id);

        this.dao.buscar(id)
            .then((result: any) => {
                if (Object.keys(result).length === 0) {
                    return response.status(404).json({message: 'Historico não encontrada!'});
                }

                if (result.status === 'P') {
                    return response.status(412).json({message: 'Histórico já foi dado baixa, por isso não pode ser deletado.'});
                }

                this.dao.deletar(id).then((result: any) => {
                    response.status(200).send();
                });
            });
    }
}
