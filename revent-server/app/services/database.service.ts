import { Account } from "@app/interfaces/account";
import * as pg from "pg";
export class DatabaseService {
    public connectionConfig: pg.ConnectionConfig = {
      user: "postgres",
      database: "revent",
      password: "",
      port: 5432,         
      host: "127.0.0.1",
      keepAlive: true
    };
  
    public pool: pg.Pool = new pg.Pool(this.connectionConfig);
  
    async getAccounts(): Promise<Account> {
      const client = await this.pool.connect();
      const result: pg.QueryResult<Account> = await client.query('SELECT * FROM Account;');
      client.release();
      return result.rows[0];
    }
}