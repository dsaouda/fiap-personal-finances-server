require('../.env.js');

import * as express from 'express';
import * as bodyParser from 'body-parser';
import {categoriaService} from './factory/categoria-service-factory';
import {contaService} from './factory/conta-service-factory';
import {historicoService} from './factory/historico-service-factory';

let port = process.env.EXPRESS_PORT || 3000;
let app = express();
let baseUri = (uri: string): string => {
    return `/api/v1/${uri}`;
};

app.use(bodyParser.urlencoded({extended: true}));
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


//contas
app.get('/api/v1/contas', (req, res) => contaService.todas(req, res));

//historicos
app.get('/api/v1/historicos', (req, res) => historicoService.todos(req, res));
app.get('/api/v1/historicos/filtro', (req, res) => historicoService.filtro(req, res));



app.listen(port, () => console.log(`Servidor rodando na porta ${port} ...`));
