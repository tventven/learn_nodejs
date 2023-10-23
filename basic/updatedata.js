const koneksi = require("../koneksidb");

const update = (id, username, password) => {
  const query = {
    text: "UPDATE try SET username = $2, password = $3 WHERE id =$1",
    values: [id, username, password],
  };
  koneksi.query(query, (error, result) => {
    if (error) {
      console.error(error);
    } else {
      console.log("data berhasil di update");
    }
    koneksi.end();
  });
};
const id = 1;
const username = "root";
const password = "root";

update(id, username, password);
