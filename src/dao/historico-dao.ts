import {AbstractDao} from './abstract-dao';

export class HistoricoDao extends AbstractDao {
    get todos(): any {
        return this.query('SELECT * FROM historico');
    }
}
