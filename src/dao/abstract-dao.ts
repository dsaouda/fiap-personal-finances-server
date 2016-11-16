import {IConnection, IError} from 'mysql';

export abstract class AbstractDao {
    constructor(protected conn: IConnection) {}

    protected update (tableName: string, object: any, where: Object) {
        let stmt: Array<any> = this.extractStmtUpdateParams(object);
        let stmtWhere: Array<any> = this.extractStmtWhereParams(where);
        let sql = `UPDATE ${tableName} SET ${stmt.join(', ')} WHERE ${stmtWhere.join(' AND ')}`;

        return this.execute(sql, object, object);
    }

    protected insert (tableName: string, object: any) {
        let fields: Array<any> = [];
        let values: Array<any> = [];
        let stmt: Array<any> = [];

        for(let key in object) {
            fields.push(key);
            stmt.push(':' + key);
            values.push(object[key]);
        }

        let sql = `INSERT INTO ${tableName} (${fields.join(', ')}) VALUES (${stmt.join(',')})`;

        return this.execute(sql, values, object);
    }

    protected query(sql: string, params?: Object, conversor?: Function) {
        return new Promise( (resolve, reject) => {
            let options = {
                sql: sql,
            };

            let rows: Array<any> = [];
            this.conn.query(options, params)
                .on('error', (error) => reject(error))
                .on('result', (row, index) => {
                    if (conversor) {
                        rows.push(conversor(row));
                    } else {
                        rows.push(row);
                    }
                })
                .on('end', () => resolve(rows));
        });
    }

    private extractStmtUpdateParams(object: any) {
        let stmt: Array<any> = [];

        for(let key in object) {

            if (key == 'id') {
                continue;
            }

            stmt.push(`${key} = :${key}`);
        }

        return stmt;
    }

    private extractStmtWhereParams(object: any) {
        let stmt: Array<any> = [];

        for(let key in object) {
            stmt.push(`${key} = :${key}`);
        }

        return stmt;
    }

    private extractValues(object: any) {
        let values: Array<any> = [];

        for(let key in object) {
            values.push(object[key]);
        }

        return values;
    }

    private execute(sql: string, values: any, object: any) {
        return new Promise( (resolve, reject) => {
            this.conn.query(sql, values, (error, result) => {
                if (error) {
                    reject(error);
                    return ;
                }

                object.id = result.insertId;
                resolve(object);
            });
        });
    }

}
