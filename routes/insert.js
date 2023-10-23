const express = require("express");
const router = express.Router();
const koneksi = require("../koneksidb");

router.get("/", (req, res) => {
  res.render("insert");
});
router.post("/submit", (req, res) => {
  const { username, password } = req.body;
  const query = "INSERT INTO try (username,password) VALUES ($1,$2);";
  koneksi.query(query, [username, password], (error, result) => {
    if (error) {
      console.error("gagal:", error);
      res.status(500).send("gagal");
    } else {
      res.redirect("/");
    }
  });
});
module.exports = router;
