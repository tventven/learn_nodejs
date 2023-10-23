const koneksi = require("../koneksidb");

const deleteData = (id) => {
  const query = {
    text: "DELETE FROM try WHERE id = $1",
    values: [id],
  };

  koneksi.query(query, (error, result) => {
    if (error) {
      console.error(error);
    } else {
      console.log("delete data berhasil");
    }
    koneksi.end();
  });
};

const id = 2;
deleteData(id);
