import {AbstractDao} from './abstract-dao';
import {Conta} from '../model/conta';
import {ObjectConverter} from '../util/object-converter';

export class ContaDao extends AbstractDao {
    protected _tableName = 'conta';

    get todas() {
        let sql = `SELECT * FROM conta`;
        let conversor = (row) => ObjectConverter.fromJson(new Conta(), row);
        return this.query(sql, null, conversor);
    }
}
