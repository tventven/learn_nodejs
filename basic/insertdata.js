const koneksi = require("../koneksidb");

const insertData = (username, password) => {
  const query = {
    text: "INSERT INTO try(username,password)VALUES($1,$2)",
    values: [username, password],
  };
  koneksi.query(query, (error, result) => {
    if (error) {
      console.error(error);
    } else {
      console.log("insert data sukses");
    }
    koneksi.end();
  });
};

const username = "admin";
const password = "admin";
insertData(username, password);
