const mysql = require("mysql");
const response = require("./response.js");
const serialport = require("serialport");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "gram_db",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Mysql connected");
});

exports.registrasiFormBarang = (req, res) => {
  var formRegistrasi = {
    nama_barang: req.body.nama_barang,
    tipe_barang: req.body.tipe_barang,
    id_barang: req.body.id_barang,
    tanggal_registrasi: new Date(),
  };

  var query = "INSERT INTO ?? SET ?";
  var table = ["form_barang"];
  query = mysql.format(query, table);
  connection.query(query, formRegistrasi, (error) => {
    if (error) {
      console.log(error);
    } else {
      response.ok("Berhasil menambahkan data barang");
    }
  });
};

// Fungsi untuk simpan data serial
serialport.list((err, ports) => {
  console.log("ports", ports);
  let port = new serialport(ports[0].comName, {
    baudRate: 9600,
  });
  let dataArr = [];

  // Kondisi awal port tertutup
  port.close((err) => {
    console.log("Port Closed", err);
  });

  // Tombol Record
  let recordButton = document.querySelector("#rec-button");
  recordButton.addEventListener("click", () => {
    // ketika tombol connect ditekan, maka akan mulai record data
    if (connButton.innerHTML === "Start Record") {
      connButton.innerHTML = "Stop Record";
      if (ports.length === 0) {
        console.log("No ports discovered");
      }
      // Mulai terima data serial
      port.open(() => {
        console.clear(); // Membersihkan console
        port.on("data", (data) => {
          let dataSerial = data.toString("utf-8");
          dataArr.push(dataSerial);
          console.log(dataArr);
        });
      });
    } else {
      port.close((err) => {
        console.log("Port Closed", err);
      });
      dataArr = []; // Ketika selesai record, array dikosongkan
      recordButton.innerHTML = "Start Record";
    }
  });

  // Insert ke database.
  if (dataArr.length != 0) {
    // Jika array tidak kosong, isi dengan data array yang terakhir
    connection.query(
      "INSERT INTO data_timbangan (data) VALUE (?)",
      [dataArr.slice(-1).pop()],
      (error) => {
        if (error) {
          console.log(error);
        } else {
          response.ok("Sukses insert data");
        }
      }
    );
  }
});
