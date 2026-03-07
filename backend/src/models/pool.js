import {Pool} from "pg";

const connString = process.env.PGSQL_CONNECTION_STRING;

export const Database = new Pool({
  connectionString: connString,
});
