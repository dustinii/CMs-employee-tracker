const mysql = require("mysql2");

// create the connection to employees db
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "employees"
});

connection.connect(function (err) {
  if (err) throw console.log(err);
});

module.exports = connection;