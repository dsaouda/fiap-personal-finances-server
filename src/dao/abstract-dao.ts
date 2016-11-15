import {IConnection, IError} from 'mysql';

export abstract class AbstractDao {
    constructor(protected conn: IConnection) {}

    query(sql: string): any {
        return new Promise( (resolve, reject) => {
            let options = {
                sql: sql,
            };

            let rows: Array<any> = [];
            this.conn.query(options)
                .on('error', (error) => reject(error))
                .on('result', (row, index) => rows.push(row))
                .on('end', () => resolve(rows));
        });
    }

}
