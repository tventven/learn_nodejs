const koneksi = require("../koneksidb");
const createTable = () => {
  const query = `CREATE TABLE IF NOT EXISTS try(
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL
  )`;
  koneksi.query(query, (error, result) => {
    if (error) {
      console.error(error);
    } else {
      console.log("tabel berhasil dibuat");
    }
  });
};
createTable();
