import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
  host: "localhost",
  // user: 'database-user',
  //   password: 'secretpassword!!',
  port: 5432,
  database: "postgres",
});

export async function query<T extends pg.QueryResultRow>(
  query: string,
  params?: any[],
) {
  const start = Date.now();
  const res = await pool.query<T>(query, params);
  const duration = Date.now() - start;
  console.log("executed query", { query, duration, rows: res.rowCount });
  return res.rows;
}
