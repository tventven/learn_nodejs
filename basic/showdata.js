const koneksi = require("../koneksidb");

const lihatData = () => {
  const query = "SELECT * FROM try";

  koneksi.query(query, (error, result) => {
    if (error) {
      console.error(error);
    } else {
      console.log("ini adalah datanya:");
      console.table(result.rows);
    }
    koneksi.end();
  });
};
lihatData();
