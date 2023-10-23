const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 1990;
// views
app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.urlencoded({ extended: true }));

// koneksi ke database
const koneksi = require("./koneksidb");

// halaman login
app.get("/", (req, res) => {
  const { username, password } = req.body;
  const querys = "SELECT * FROM try WHERE username = $1 AND password = $2;";
  koneksi.query(querys, [username, password], (error, result) => {
    res.render("index");
  });
});
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const querys = "SELECT * FROM try WHERE username = $1 AND password = $2;";
  koneksi.query(querys, [username, password], (error, result) => {
    if (error) {
      console.error(error);
      res.status(500).send("Terjadi kesalahan dalam mengambil data dari database.");
    } else {
      if (result.rows.length > 0) {
        // Jika login berhasil, Anda dapat menampilkan data pengguna di sini
        res.render("page", { results: result.rows });
      } else {
        res.status(401).send("data yang anda inputkan tidak valid");
      }
    }
  });
});
// route dari page.ejs
app.get("/data/:id", (req, res) => {
  const id = req.params.id;
  const query = "SELECT * FROM try WHERE id = $1 ;";
  koneksi.query(query, [id], (error, result) => {
    res.render("data", { results: result.rows });
  });
});

//dari routes
const insertRoute = require("./routes/insert");
const showRoute = require("./routes/data");
app.use("/insert", insertRoute);
app.use("/data", showRoute);

app.get("/update/:id", (req, res) => {
  const id = req.params.id;
  const query = "SELECT * FROM try WHERE id = $1 ;";
  koneksi.query(query, [id], (error, result) => {
    if (error) {
      console.error("Gagal mengambil data:", error);
      res.status(500).send("Terjadi kesalahan dalam mengambil data dari database.");
    } else {
      const userData = result.rows[0];
      res.render("update", { data: userData });
    }
  });
});

app.post("/update/:id", (req, res) => {
  const id = req.params.id;
  const { username, password } = req.body;
  const query = "UPDATE try SET username = $1, password = $2 WHERE id = $3;";
  koneksi.query(query, [username, password, id], (error, result) => {
    if (error) {
      console.error("Gagal memperbarui data:", error);
      res.status(500).send("Gagal memperbarui data.");
    } else {
      res.redirect("/data");
    }
  });
});

// Rute untuk penghapusan data
app.post("/delete/:id", (req, res) => {
  const id = req.params.id;
  const query = "DELETE FROM try WHERE id = $1;";
  koneksi.query(query, [id], (error, result) => {
    if (error) {
      console.error("Gagal menghapus data:", error);
      res.status(500).send("Gagal menghapus data.");
    } else {
      res.redirect("/data");
    }
  });
});

// rute page
app.get("/page/:username", (req, res) => {
  const qq = "SELECT * FROM try WHERE username = $1;";
  const username = req.params.username;
  koneksi.query(qq, [username], (error, result) => {
    if (error) throw error;
    res.render("page", { results: result.rows });
  });
});

// port
app.listen(port, () => {
  console.log(`web berjalan di http://localhost:${port}`);
});
