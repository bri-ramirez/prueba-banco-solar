import pg from "pg";
const { Pool } = pg;

/* VARIABLES DE ENTORNO */
const USER_DB = process.env.DB_USER || "postgres";
const PASS_DB = process.env.DB_PASSWORD || "postgres";
const HOST_DB = process.env.DB_HOST || "localhost";
const PORT_DB = "5432";
const NAME_DB = process.env.DB_NAME || "bancosolar";

export const pool = new Pool({
  user: USER_DB,
  host: HOST_DB,
  password: PASS_DB,
  database: NAME_DB,
  port: PORT_DB,
});