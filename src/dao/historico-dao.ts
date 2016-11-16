import {AbstractDao} from './abstract-dao';

export class HistoricoDao extends AbstractDao {

    get todos() {
        return this.query('SELECT * FROM historico');
    }

    buscar(dateFrom: Date, dateTo: Date, contaId: number) {
        let sql = `SELECT *
            FROM historico
            WHERE data_movimento BETWEEN :dtFrom AND :dtTo
                AND conta_id = :contaId`;

        let params = { dtFrom: dateFrom, dtTo: dateTo, contaId: contaId };
        return this.query(sql, params);
    }
}
