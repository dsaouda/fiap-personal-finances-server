import {AbstractDao} from './abstract-dao';
import {Categoria} from '../model/categoria';
import {ObjectConverter} from '../util/object-converter';

export class CategoriaDao extends AbstractDao {
    protected _tableName = 'categoria';

    get todas() {
        let sql = `
            SELECT id
                , nome
                , descricao
                , recorrente
            FROM categoria`;
        let conversor = (row) => ObjectConverter.fromJson(new Categoria(), row);
        return this.query(sql, null, conversor);
    }

}
