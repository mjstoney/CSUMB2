const mysql = require("mysql");

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "jtb9ia3h1pgevwb1.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
  user: "iwc5pnqceeo9cdkx",
  password: "u6to593t3esjzyh9",
  database: "py4uyace6e17lsdz",
});

module.exports = pool;

//mysql://iwc5pnqceeo9cdkx:u6to593t3esjzyh9@jtb9ia3h1pgevwb1.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/py4uyace6e17lsdz
