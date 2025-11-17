import {Pool} from "pg";

const ROLE_NAME = process.env.PSQL_ROLE_NAME;
const ROLE_PASSWORD = process.env.PSQL_ROLE_PASSWORD;
const DB = process.env.PSQL_DB;


export const Database = new Pool({
  connectionString: `postgresql://${ROLE_NAME}:${ROLE_PASSWORD}@localhost:5432/${DB}`,
});
