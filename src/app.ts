import * as express from 'express';
import {categoriaService} from './factory/categoria-service-factory';
import {contaService} from './factory/conta-service-factory';
import {historicoService} from './factory/historico-service-factory';

let app = express();

app.get('/api/v1/categorias', (req, res) => categoriaService.todas(req, res));
app.get('/api/v1/contas', (req, res) => contaService.todas(req, res));
app.get('/api/v1/historicos', (req, res) => historicoService.todos(req, res));

app.listen(3000, () => console.log('Servidor rodando na porta 3000 ...'));
