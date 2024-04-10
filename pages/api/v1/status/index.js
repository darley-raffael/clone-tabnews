import database from "../../../../infra/database.js";

export default async function status(request, response) {
  const result = await database.query("SELECT NOW() as now;");
  console.log(result);
  return response.status(200).json({ message: "OK" });
}
