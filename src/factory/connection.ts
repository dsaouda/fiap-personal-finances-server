import * as mysql from 'mysql';
import { config } from '../config/database';

const conn = mysql.createConnection({
    host: config.hostname,
    user: config.username,
    password : config.password,
    port : config.port,
    database: config.database
});

conn.connect();
export = conn;
