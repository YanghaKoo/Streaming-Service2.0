module.exports = function() {  
  var mysql = require("mysql");
  const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE
  });
  conn.connect();

  return conn;
};
