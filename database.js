const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "gram_db",
});

connection.connect();

let query = "";

connection.query();
