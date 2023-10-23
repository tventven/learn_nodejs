const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 4000;

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));

// koneksi ke database
const { Client } = require("pg");
const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "postgres",
  port: 5432,
});
// =====================

// menampilkan data
app.get("/", (req, res) => {
  client.query("SELECT * FROM try", (error, result) => {
    if (error) throw error;
    res.render("index.js", { users: result.rows });
  });
});

// Menyimpan data pengguna
app.post("/addUser", (req, res) => {
  const { username, password } = req.body;
  const query = "INSERT INTO try(username, password) VALUES($1, $2)";
  const values = [username, password];
  client.query(query, values, (err, result) => {
    if (err) throw err;
    res.redirect("/");
  });
});

// Menghapus data pengguna
app.get("/deleteUser/:id", (req, res) => {
  const id = req.params.id;
  const query = "DELETE FROM try WHERE id = $1";
  const values = [id];
  client.query(query, values, (err, result) => {
    if (err) throw err;
    res.redirect("/");
  });
});

// port yang berjalan
app.listen(port, () => {
  console.log(`berjalan di localhost:${port}`);
});
