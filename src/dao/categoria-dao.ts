import {AbstractDao} from './abstract-dao';
import {Categoria} from '../model/categoria';
import {ObjectConverter} from '../util/object-converter';

export class CategoriaDao extends AbstractDao {
    protected _tableName = 'categoria';

    getStatusPagamentos(params: any) {
        let sql = `select c.id
            , c.nome
            , count(h.id) pagos
            , count(h2.id) aguardando
            , (count(h.id) + count(h2.id)) total
        from categoria c
            left join historico h on (h.categoria_id = c.id AND h.status = 'P' and h.data_movimento BETWEEN :dtFrom and :dtTo)
            left join historico h2 on (h2.categoria_id = c.id AND h2.status = 'A' and h2.data_movimento BETWEEN :dtFrom and :dtTo)
        where c.recorrente = 1
        group by c.id, c.nome`;

        return this.query(sql, params);
    }

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
