import {AbstractDao} from './abstract-dao';

export class ContaDao extends AbstractDao {
    get todas(): any {
        return this.query('SELECT * FROM conta');
    }
}
