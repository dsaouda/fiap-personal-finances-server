import {AbstractDao} from './abstract-dao';
import {Conta} from '../model/conta';
import {ObjectConverter} from '../util/object-converter';

export class ContaDao extends AbstractDao {
    private _tableName = 'conta';

    buscar(id: number) {
        return this.find(this._tableName, id);
    }

    deletar(id: number) {
        return this.delete(this._tableName, id);
    }

    save(conta: Conta): any {

        if (conta.getId() > 0) {
            return this.update(this._tableName, conta, {id: conta.getId()});
        }

        return this.insert(this._tableName, conta);
    }


    get todas() {
        let sql = `SELECT * FROM conta`;
        let conversor = (row) => ObjectConverter.fromJson(new Conta(), row);
        return this.query(sql, null, conversor);
    }
}
