require('../.env.js');

import * as express from 'express';
import * as bodyParser from 'body-parser';
import {categoriaService} from './factory/categoria-service-factory';
import {contaService} from './factory/conta-service-factory';
import {historicoService} from './factory/historico-service-factory';
import * as multer from 'multer';
import * as logger from 'morgan';

let cors = require('cors')

let port = process.env.EXPRESS_PORT || 3000;
let app = express();

let baseUri = (uri: string): string => {
    return `/api/v1/${uri}`;
};

app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


//categorias
app.route(baseUri('categorias'))
    //o bind diz para o this de categoriaService é o próprio categoriaService
    //.get(categoriaService.todas.bind(categoriaService));

    //assim não precisa user o bind
    .get((req, res) => categoriaService.todas(req, res))
    .post((req, res) => categoriaService.cadastrar(req, res));

app.route(baseUri('categorias/:id'))
    .get((req, res) => categoriaService.buscar(req, res))
    .put((req, res) => categoriaService.atualizar(req, res))
    .delete((req, res) => categoriaService.deletar(req, res));

app.route(baseUri('status-pagamentos'))
    .get((req, res) => categoriaService.statusPagamentos(req, res));

//contas
app.route(baseUri('contas'))
    .get((req, res) => contaService.todas(req, res))
    .post((req, res) => contaService.cadastrar(req, res));

app.route(baseUri('contas/:id'))
    .get((req, res) => contaService.buscar(req, res))
    .put((req, res) => contaService.atualizar(req, res))
    .delete((req, res) => contaService.deletar(req, res));

//historicos
app.route(baseUri('historicos'))
    .get((req, res) => historicoService.todos(req, res))
    .post((req, res) => historicoService.cadastrar(req, res));

let storage = multer.memoryStorage()
let upload = multer({ storage: storage })

app.post(baseUri('historicos/importar'), upload.any(), (req, res, next) => historicoService.importar(req, res));    

app.route(baseUri('historicos/:id'))
    .get((req, res) => historicoService.buscar(req, res))
    .put((req, res) => historicoService.atualizar(req, res))
    .patch((req, res) => historicoService.mudarStatus(req, res))
    .delete((req, res) => historicoService.deletar(req, res));

app.listen(port, () => console.log(`Servidor rodando na porta ${port} ...`));
