import { Pool, PoolClient, QueryResultRow } from "pg";

let pool: Pool | null = null;
let db: PoolClient | null = null;

async function getPool() {
  if (!pool) {
    pool = new Pool({
      host: "localhost",
      // user: 'database-user',
      //   password: 'secretpassword!!',
      port: 5432,
      database: "postgres",
    });
  }

  if (!db) {
    try {
      db = await pool.connect();
    } catch (error) {
      throw error;
    }
  }

  return db;
}

export async function query<T extends QueryResultRow>(
  query: string,
  params?: any[],
) {
  const db = await getPool();

  const start = Date.now();
  const res = await db.query<T>(query, params);
  const duration = Date.now() - start;
  console.log("executed query", { query, duration, rows: res.rowCount });
  return res.rows;
}
