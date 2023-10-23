const { Client } = require("pg");
const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "postgres",
  port: 5432,
});
client.connect((error) => {
  if (error) console.error(error);
  console.log("berhasil");
});
module.exports = client;
