import * as mysql from 'mysql';
import { config } from '../config/database';

const conn = mysql.createConnection({
    host: config.hostname,
    user: config.username,
    password : config.password,
    port : config.port,
    database: config.database
});

conn.config.queryFormat = function (query, values) {
  if (!values) return query;
  return query.replace(/\:(\w+)/g, function (txt: string, key: string) {
    if (values.hasOwnProperty(key)) {
      return this.escape(values[key]);
    }
    return txt;
  }.bind(this));
};

conn.connect();
export = conn;
