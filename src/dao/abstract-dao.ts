import {IConnection, IError} from 'mysql';

export abstract class AbstractDao {
    constructor(protected conn: IConnection) {}

    query(sql: string, params?: Object) {
        return new Promise( (resolve, reject) => {
            let options = {
                sql: sql,
            };

            let rows: Array<any> = [];
            this.conn.query(options, params)
                .on('error', (error) => reject(error))
                .on('result', (row, index) => rows.push(row))
                .on('end', () => resolve(rows));
        });
    }

}
