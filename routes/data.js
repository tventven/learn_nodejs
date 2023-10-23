const express = require("express");
const router = express.Router();
const koneksi = require("../koneksidb");

router.get("/", (req, res) => {
  const querys = "SELECT * FROM try;";
  koneksi.query(querys, (error, result) => {
    if (error) {
      console.error(error);
      res.status(500).send("terjadi kesalahan");
    } else {
      res.render("data", { results: result.rows });
    }
  });
});
module.exports = router;
