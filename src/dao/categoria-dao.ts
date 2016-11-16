import {AbstractDao} from './abstract-dao';

export class CategoriaDao extends AbstractDao {

    get todas() {
        return this.query('SELECT categoria_id id, nome, descricao, recorrente FROM categoria');
    }
}
