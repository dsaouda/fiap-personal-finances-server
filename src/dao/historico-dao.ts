import {AbstractDao} from './abstract-dao';
import {Historico} from '../model/historico';
import {ObjectConverter} from '../util/object-converter';

export class HistoricoDao extends AbstractDao {
    protected _tableName = 'historico';

    get todos() {
        let conversor = (row) => ObjectConverter.fromJson(new Historico(), row);
        return this.query('SELECT * FROM historico', null, conversor);
    }

    buscarFiltro(dateFrom: Date, dateTo: Date, contaId: number) {
        let sql = `SELECT *
            FROM historico
            WHERE data_movimento BETWEEN :dtFrom AND :dtTo
                AND conta_id = :contaId`;

        let params = { dtFrom: dateFrom, dtTo: dateTo, contaId: contaId };
        let conversor = (row) => ObjectConverter.fromJson(new Historico(), row);
        return this.query(sql, params, conversor);
    }
}
