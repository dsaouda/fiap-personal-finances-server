import {AbstractDao} from './abstract-dao';
import {Historico} from '../model/historico';
import {ObjectConverter} from '../util/object-converter';

export class HistoricoDao extends AbstractDao {
    private _tableName = 'conta';

    get todos() {
        let conversor = (row) => ObjectConverter.fromJson(new Historico(), row);
        return this.query('SELECT * FROM historico', null, conversor);
    }

    buscar(id: number) {
        return this.find(this._tableName, id);
    }

    deletar(id: number) {
        return this.delete(this._tableName, id);
    }

    save(historico: Historico): any {

        if (historico.getId() > 0) {
            return this.update(this._tableName, historico, {id: historico.getId()});
        }

        return this.insert(this._tableName, historico);
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
