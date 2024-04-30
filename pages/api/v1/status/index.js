import database from "infra/database";

export default async function status(_request, response) {
  const updatedAt = new Date().toISOString();
  const serverVersionRes = await database.query("SHOW server_version;");
  const dbName = process.env.POSTGRES_DB;
  const serverVersion = serverVersionRes.rows[0].server_version;
  const dbMaxConnectionsRes = await database.query("SHOW max_connections;");
  const dbMaxConnections = dbMaxConnectionsRes.rows[0].max_connections;
  const dbOpenedConnectionsRes = await database.query({
    text: "SELECT COUNT(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [dbName],
  });
  const dbOpenedConnections = dbOpenedConnectionsRes.rows[0].count;
  console.log(dbOpenedConnections.length);

  return response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: serverVersion,
        max_connections: Number(dbMaxConnections),
        opened_connections: dbOpenedConnections,
      },
    },
  });
}
