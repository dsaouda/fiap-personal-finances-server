import {AbstractDao} from './abstract-dao';
import {Historico} from '../model/historico';
import {ObjectConverter} from '../util/object-converter';
import {DateConverter} from '../util/date-converter';

export class HistoricoDao extends AbstractDao {
    protected _tableName = 'historico';

    get todos() {
        let conversor = (row) => ObjectConverter.fromJson(new Historico(), row);
        return this.query('SELECT * FROM historico', null, conversor);
    }

    buscarFiltro(params: any) {
        let sql = `SELECT h.*
            , co.nome conta_nome
            , ca.nome categoria_nome
            FROM historico h
                LEFT JOIN categoria ca ON (ca.id = h.categoria_id)
                INNER JOIN conta co ON (co.id = h.conta_id)
            WHERE 1 = 1`;

        if (params.dtFrom && params.dtTo) {
            //params.dtFrom = DateConverter.toDate(params.dtFrom);
            //params.dtTo = DateConverter.toDate(params.dtTo);

            sql += ' AND data_movimento >= :dtFrom AND data_movimento <= :dtTo';
        }

        if (params.contaId) {
            sql += ' AND conta_id = :contaId';
        }

        if (params.status) {
            sql += ' AND status = :status';
        }

        sql += ' ORDER BY h.data_movimento DESC, categoria_nome ASC';

        let conversor = (row) => ObjectConverter.fromJson(new Historico(), row);
        return this.query(sql, params, conversor);
    }
}
