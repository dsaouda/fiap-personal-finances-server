import {HistoricoDao} from '../dao/historico-dao';
import {ContaDao} from '../dao/conta-dao';
import {Historico} from '../model/historico';
import {Conta} from '../model/conta';
import {ResponseProvider} from '../util/response-provider';
import {Request, Response} from 'express';
import {ObjectConverter} from '../util/object-converter';
import {Uri} from '../util/uri';
let Banking = require('banking');

export class HistoricoService {
    private dao: HistoricoDao;
    private contaDao: ContaDao;

    constructor(historicoDao: HistoricoDao, contaDao: ContaDao) {
        this.dao = historicoDao;
        this.contaDao = contaDao;
    }

    importar(request: any, response: Response) {
        let files = request.files;
        if (files.length === 0) {
            response.status(400).send('Não foi recebido arquivos');
        }
        
        let file = files[0];
        let contaId = request.body.conta_id;
        
        Banking.parse(file.buffer.toString(), (res) => {
            if (res.body.OFX == 'undefined') {
                response.status(400).send('Formato do arquivo não é válido!');
                return ;
            }

            let historicos = res.body.OFX.BANKMSGSRSV1.STMTTRNRS.STMTRS.BANKTRANLIST.STMTTRN
            
            historicos = historicos.map((r) => {
                let values = r.FITID.split(':');                
                let date = r.DTPOSTED;
                
                let historico = new Historico();
                historico
                    .setContaId(contaId)
                    .setDocto(r.CHECKNUM)
                    .setDataMovimento(`${date.substr(0,4)}-${date.substr(4,2)}-${date.substr(6,2)}`)
                    .setValor(values[2].trim())
                    .setDocto(values[3].trim())
                    .setDescricao(values[4].trim())
                    .setObservacao(values[5].trim());

                this.dao.save(historico);
                return historico;
            });
            
            response.status(200).send(); 
        });
    }

    todos(request: Request, response: Response) {

        let query = request.query;
        if (query.contaId == 0) {
            delete query.contaId;
        }

        if (JSON.stringify(query) == '{}') {
            response.status(400).json("Informe um filtro");
            return ;
        }

        return new ResponseProvider(response, this.dao.buscarFiltro(query));
    }

    cadastrar(request: Request, response: Response) {
        let body = request.body;
        delete body.id;

        //no cadastro o body.status sempre é A
        body.status = 'A';

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

    mudarStatus(request: Request, response: Response) {
        let status: string = request.body.status;
        let id: number = request.params.id;

        this.buscarHistorico(response, id, (historico: Historico) => {
            historico.setStatus(status);

            //mudando o saldo da conta de acordo com status do historico
            this.contaDao.buscar(historico.getContaId()).then((objConta) => {
                let conta: Conta = <Conta>ObjectConverter.fromJson(new Conta(), objConta);

                if (status === 'P') {
                    conta.efetivarDebitoOuCredito(historico.getValor());
                }

                else if (status === 'A') {
                    conta.devolverDebitoOuCredito(historico.getValor());
                }

                else {
                    response.status(400).json({'message': 'Opçao de status não é válido'});
                    return ;
                }

                //salvando historico
                this.dao.save(historico).then((historico) => {
                    //salvando novo saldo
                    this.contaDao.save(conta).then(() => {});

                    response.status(200);
                    response.json(historico);

                }).catch((error: any) => {
                    response.status(400).json(error);
                });


            });
        });

    }

    atualizar(request: Request, response: Response) {
        let body = request.body;
        delete body.id;

        let historico = <Historico> ObjectConverter.fromJson(new Historico(), body);
        historico.setId(request.params.id);

        this.dao.buscar(historico.getId())
            .then((result: any) => {
                if (Object.keys(result).length === 0) {
                    return response.status(404).json({message: 'Historico não encontrada!'});
                }

                return new ResponseProvider(
                    response,
                    this.dao.save(historico)
                );
            });
    }

    buscar(request: Request, response: Response) {

        this.dao.buscar(request.params.id)
            .then((result: any) => {
                if (Object.keys(result).length === 0) {
                    return response.status(404).json({message: 'Historico não encontrada!'});
                }

                return response.status(200).json(ObjectConverter.fromJson(new Historico(), result));
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

    private buscarHistorico(response: Response, id: number, callback: Function) {
        this.dao.buscar(id)
            .then((result: any) => {
                if (Object.keys(result).length === 0) {
                    return response.status(404).json({message: 'Historico não encontrado!'});
                }

                let historico = <Historico> ObjectConverter.fromJson(new Historico(), result);
                callback(historico);
            });
    }
}
