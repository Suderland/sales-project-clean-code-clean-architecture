import Connection from "./Connection";
import pgp from "pg-promise";

export default class PgPromise implements Connection {
  connection: any;

  constructor () {
    this.connection = pgp()('postgres://postgres:admin@localhost:5432/postgres');
  }

  async query(statement: string, params: any): Promise<any> {
    return this.connection.query(statement, params);
  }

  async close(): Promise<void> {
    await this.connection.$pool.end();
  }

}