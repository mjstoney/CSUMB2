const express = require("express");
const ejs = require("ejs");
const pool = require("./dbPool");

const app = express();

app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));
// app.use(express.static("/public"));
app.get("/", async (req, res) => {
  let sqlAuth = `SELECT authorId, firstName, lastName
  FROM q_authors
  ORDER BY lastName`;
  let rowsAuth = await executeSQL(sqlAuth);

  let sqlCat = `SELECT DISTINCT category FROM q_quotes`;
  let rowsCat = await executeSQL(sqlCat);
  res.render("index", { authors: rowsAuth, categories: rowsCat });
});

app.get("/searchByKeyword", async (req, res) => {
  let userKeyword = req.query.keyword;
  let params = [`%${userKeyword}%`];
  let sql = `SELECT quote, authorId, firstName, lastName FROM q_quotes NATURAL JOIN q_authors WHERE quote LIKE '%${userKeyword}%'`;
  let rows = await executeSQL(sql, params);
  console.log(rows);

  res.render("results", { quotes: rows });
});

app.get("/searchByAuthor", async (req, res) => {
  let userAuthorId = req.query.authorId;
  let sql = `SELECT quote, authorId, firstName, lastName
            FROM q_quotes
            NATURAL JOIN q_authors
            WHERE authorId = ?`;
  let params = [userAuthorId];
  let rows = await executeSQL(sql, params);
  res.render("results", { quotes: rows });
});

app.get("/searchByCategory", async (req, res) => {
  let category = req.query.category;
  let params = [category];
  console.log(category);
  sql = `select * from q_quotes as q join q_authors as a on q.authorId=a.authorId where q.category = ?;`;
  let rows = await executeSQL(sql, params);

  res.render("results", { quotes: rows });
});

app.get("/searchByLikes", async (req, res) => {
  let { minLikes, maxLikes } = req.query;
  let params = [`${minLikes}`, `${maxLikes}`];
  let sql = `select * from q_quotes as q join q_authors as a on q.authorId = a.authorId where likes > ? and likes < ?;`;
  let rows = await executeSQL(sql, params);
  res.render("results", { quotes: rows });
});

app.get("/api/author/:id", async (req, res) => {
  let authorId = req.params.id;
  let sql = `SELECT * FROM q_authors WHERE authorId = ?`;
  let rows = await executeSQL(sql, [authorId]);
  res.send(rows);
});
// app.get("/dbTest", async (req, res) => {
//   let sql = "SELECT * FROM q_quotes";
//   let rows = await executeSQL(sql);
//   res.send(rows);
// });

// functions
async function executeSQL(sql, params) {
  return new Promise(function (resolve, reject) {
    pool.query(sql, params, function (err, rows, fields) {
      if (err) throw err;
      resolve(rows);
    });
  });
}

app.listen(3000, () => console.log("Server running on http://localhost:3000/"));
