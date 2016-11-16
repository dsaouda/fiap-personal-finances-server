require('../.env.js');

import * as express from 'express';
import {categoriaService} from './factory/categoria-service-factory';
import {contaService} from './factory/conta-service-factory';
import {historicoService} from './factory/historico-service-factory';

let port: number = 3001;
let app = express();
let baseUri = (uri: string): string => {
    return `/api/v1/${uri}`;
};

//categorias
//app.get('/api/v1/categorias', (req, res) => categoriaService.todas(req, res));
app.route(baseUri('categorias'))
    .get((req, res) => categoriaService.todas(req, res));

//contas
app.get('/api/v1/contas', (req, res) => contaService.todas(req, res));

//historicos
app.get('/api/v1/historicos', (req, res) => historicoService.todos(req, res));
app.get('/api/v1/historicos/filtro', (req, res) => historicoService.filtro(req, res));

app.listen(port, () => console.log(`Servidor rodando na porta ${port} ...`));
