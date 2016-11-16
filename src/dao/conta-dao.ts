import {AbstractDao} from './abstract-dao';

export class ContaDao extends AbstractDao {
    get todas() {
        return this.query('SELECT * FROM conta');
    }
}
