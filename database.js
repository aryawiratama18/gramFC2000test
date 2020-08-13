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

// Class Parser
class TextParser {
  constructor() {
    this.string = "";
  }
  static isEndMarker(char) {
    return char == "\r" || char == "\n"; // New line characters (NL & CR)
  }
  parse(char) {
    if (this.clear) {
      this.string = "";
      this.clear = false;
    }
    if (TextParser.isEndMarker(char)) {
      if (this.string.length > 0) {
        this.clear = true;
        return true;
      }
      return false;
    } else {
      this.string += char;
    }
  }
  get message() {
    return this.string;
  }
}

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

  var formRegistrasi = {
    nama_barang: document.getElementById("nama_barang").value,
    tipe_barang: document.getElementById("tipe_barang").value,
    id_barang: document.getElementById("id_barang").value,
    tanggal_registrasi: document.getElementById("tanggal_registrasi").value,
  };

  // Tombol Record
  let recordButton = document.getElementById("rec-button");
  recordButton.addEventListener("click", () => {
    // ketika tombol connect ditekan, maka akan mulai record data
    if (connButton.innerHTML === "Start Record") {
      connButton.innerHTML = "Stop Record";

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

  const parser = new TextParser();
  if (dataArr != 0) {
    let dataArr = dataArr.toString("utf-8"); // Konversi tipe karakter ke utf-8

    for (let i = 0; i < dataArr.length; i++) {
      for (let j = 0; j < dataArr[i].length; j++) {
        if (parser.parse(dataArr[i][j])) {
          insertIntoDatabase(parser.message);
        }
      }
    }
  }
});

insertIntoDatabase = (value) => {
  connection.query(
    "INSERT INTO data_timbangan (data) VALUE (?)",
    [value],
    (error) => {
      if (error) {
        console.log(error);
      } else {
        response.ok("Sukses insert data");
      }
    }
  );
};
