import {AbstractDao} from './abstract-dao';
import {Categoria} from '../model/categoria';
import {ObjectConverter} from '../util/object-converter';

export class CategoriaDao extends AbstractDao {

    buscar(id: number) {
        return this.find('categoria', id);
    }

    save(categoria: Categoria): any {

        if (categoria.getId() > 0) {
            return this.update('categoria', categoria, {id: categoria.getId()});
        }

        return this.insert('categoria', categoria);
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
