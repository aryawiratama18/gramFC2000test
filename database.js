const mysql = require("mysql");
const serialport = require("serialport");

// Fungsi untuk simpan data serial
serialport.list((err, ports) => {
  console.log("ports", ports);

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

  let port = new serialport(ports[0].comName, {
    baudRate: 9600,
  });
  let dataArr = [];

  // Kondisi awal port tertutup
  port.close((err) => {
    console.log("Port Closed", err);
  });

  // Tombol Record
  let recordButton = document.getElementById("rec-button");
  recordButton.addEventListener("click", (e) => {
    // ketika tombol connect ditekan, maka akan mulai record data
    if (recordButton.innerHTML === "Start Record") {
      dataArr = []; // Sebelum dimulai pengisian array, dikosongi terlebih dahulu
      var nama_barang = document.getElementById("nama_barang").value;
      var tipe_barang = document.getElementById("tipe_barang").value;
      var id_barang = document.getElementById("id_barang").value;
      var tanggal_registrasi = document.getElementById("tanggal_registrasi")
        .value;
      recordButton.innerHTML = "Stop Record";
      console.log(nama_barang);
      console.log(tipe_barang);
      console.log(id_barang);
      console.log(tanggal_registrasi);
      var query =
        "INSERT INTO form_barang (nama_barang,tipe_barang,id_barang,tanggal_registrasi) VALUES (?,?,?,?)";
      var table = [nama_barang, tipe_barang, id_barang, tanggal_registrasi];
      query = mysql.format(query, table);
      connection.query(query, (error) => {
        if (error) {
          console.log(error);
        } else {
          console.log("Berhasil menambahkan data barang");
        }
      });

      if (ports.length === 0) {
        console.log("No ports discovered");
      }
      // Mulai terima data serial
      port.open(() => {
        // console.clear(); // Membersihkan console
        port.on("data", (data) => {
          let dataSerial = data.toString("utf-8"); // dikonversi menjadi string dulu sebelum dimasukkan array
          dataArr.push(dataSerial);
          console.log(dataArr);
        });
      });
    } else {
      port.close((err) => {
        console.log("Port Closed", err);
      });
      console.log("Ini data array terakhir");
      console.log(dataArr);
      const parser = new TextParser();
      if (dataArr != 0) {
        for (let i = 0; i < dataArr.length; i++) {
          for (let j = 0; j < dataArr[i].length; j++) {
            if (parser.parse(dataArr[i][j])) {
              connection.query(
                "INSERT INTO data_timbangan (data) VALUES (?)",
                [parser.message],
                (error) => {
                  if (error) {
                    console.log(error);
                  } else {
                    console.log("Sukses insert data");
                  }
                }
              );
            }
          }
        }
      }
      recordButton.innerHTML = "Start Record";
    }
  });
});
