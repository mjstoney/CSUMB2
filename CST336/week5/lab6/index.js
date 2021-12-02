const express = require("express");
const mysql = require("mysql");
const app = express();
const pool = require("./dbPool");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
// ROUTES
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/author/new", (req, res) => {
  res.render("newAuthor");
});

app.post("/author/new", async (req, res) => {
  let {
    fName,
    lName,
    birthDate,
    deathDate,
    sex,
    profession,
    country,
    portrait,
    bio,
  } = req.body;
  let sql =
    "INSERT INTO q_authors (firstName, lastName, dob, dod, sex, profession, country, portrait, biography) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);";

  let params = [
    fName,
    lName,
    birthDate,
    deathDate,
    sex,
    profession,
    country,
    portrait,
    bio,
  ];
  let rows = await executeSQL(sql, params);
  res.render("newAuthor", { message: "Author added!" });
});

app.get("/authors", async (req, res) => {
  let sql = "SELECT * FROM q_authors ORDER BY lastName;";
  let rows = await executeSQL(sql);
  res.render("authorList", { authors: rows });
});

app.get("/author/edit", async (req, res) => {
  let authorId = req.query.authorId;
  let sql = `SELECT * , DATE_FORMAT(dob, '%Y-%m-%d') dobISO, DATE_FORMAT(dod, '%Y-%m-%d') dodISO FROM q_authors WHERE authorId = ${authorId};`;
  let rows = await executeSQL(sql);
  res.render("editAuthor", { authorInfo: rows });
});

app.post("/author/edit", async (req, res) => {
  let authorId = req.body.authorId;
  let {
    fName,
    lName,
    birthDate,
    deathDate,
    sex,
    profession,
    country,
    portrait,
    bio,
  } = req.body;

  let sql = `UPDATE q_authors
SET firstName = ?,
   lastName = ?,
   dob = ?,
   dod = ?,
   sex = ?,
   profession = ?,
   country = ?,
   portrait = ?,
   biography = ?
WHERE authorId =  ?`;

  let params = [
    fName,
    lName,
    birthDate,
    deathDate,
    sex,
    profession,
    country,
    portrait,
    bio,
    authorId,
  ];
  let rows = await executeSQL(sql, params);

  sql = `SELECT * , DATE_FORMAT(dob, '%Y-%m-%d') dobISO, DATE_FORMAT(dod, '%Y-%m-%d') dodISO FROM q_authors WHERE authorId = ${authorId};`;
  rows = await executeSQL(sql);

  res.render("editAuthor", { authorInfo: rows, message: "Author Updated!" });
});

app.get("/author/delete", async (req, res) => {
  let authorId = req.query.authorId;
  sql = `DELETE FROM q_authors WHERE authorId=${authorId};`;
  await executeSQL(sql);
  res.redirect("/authors");
});

app.get("/quotes", async (req, res) => {
  let sql =
    "SELECT quoteId, quote, category, likes, firstName, lastName FROM q_quotes q join q_authors a where q.authorId = a.authorId  ;";
  let rows = await executeSQL(sql);
  res.render("quotesList", { quotes: rows });
});

app.get("/quote/new", async (req, res) => {
  let sql = `SELECT DISTINCT category FROM q_quotes`;
  let rows = await executeSQL(sql);
  res.render("newQuote", { categories: rows });
});

app.post("/quote/new", async (req, res) => {
  let authorId;
  let { fName, lName, category, quote } = req.body;
  let sql = `SELECT authorId FROM q_authors WHERE firstName = ? and lastName = ?`;
  let params = [fName, lName];
  let rows = await executeSQL(sql, params);
  if (rows[0] != undefined) {
    authorId = rows[0].authorId;
  } else {
    sql = `INSERT INTO q_authors (firstName, lastName) VALUES (?, ?);`;
    params = [fName, lName];
    rows = await executeSQL(sql, params);
    authorId = rows.insertId;
  }

  let likes = Math.random() * 100;

  params = [quote, authorId, category, likes];
  sql =
    "INSERT INTO q_quotes (quote, authorId, category, likes) VALUES (?, ?, ?, ?);";
  rows = await executeSQL(sql, params);
  sql = `SELECT DISTINCT category FROM q_quotes`;
  let categories = await executeSQL(sql);
  res.render("newQuote", { categories: categories, message: "Quote added!" });
});

app.get("/quote/edit", async (req, res) => {
  let { quoteId } = req.query;
  sql = `SELECT DISTINCT category FROM q_quotes`;
  let categories = await executeSQL(sql);

  sql = `SELECT quoteId, quote, category, likes, firstName, lastName FROM q_quotes q join q_authors a where quoteId=? and q.authorId = a.authorId;`;
  let params = [quoteId];
  let quoteInfo = await executeSQL(sql, params);

  res.render("editQuote", { categories: categories, quoteInfo: quoteInfo });
});

app.post("/quote/edit", async (req, res) => {
  let { fName, lName, category, quote, quoteId } = req.body;
  let authorId = -1;
  let sql = `SELECT authorId from q_authors where firstName = ? and lastName = ?`;
  let params = [fName, lName];
  let rows = await executeSQL(sql, params);
  if (rows.length == 0) {
    sql = `INSERT INTO q_authors (firstName, lastName) VALUES (?, ?);`;
    rows = await executeSQL(sql, params);

    authorId = rows.insertId;
  } else {
    authorId = rows[0].authorId;
  }
  sql = `UPDATE q_quotes SET quote = ?, category =? WHERE quoteId = ?;`;
  params = [quote, category, quoteId];
  rows = await executeSQL(sql, params);
  quoteInfo = [
    {
      firstName: fName,
      lastName: lName,
      quote: quote,
      quoteId: quoteId,
    },
  ];

  sql = `SELECT DISTINCT category FROM q_quotes`;
  let categories = await executeSQL(sql);
  res.render("editQuote", {
    quoteInfo: quoteInfo,
    categories: categories,
    message: "Updated Successfully.",
  });
});

app.get("/quote/delete", async (req, res) => {
  let { quoteId } = req.query;
  sql = `DELETE FROM q_quotes WHERE quoteId=${quoteId};`;
  await executeSQL(sql);
  res.redirect("/quotes");
});

async function executeSQL(sql, params) {
  return new Promise(function (resolve, reject) {
    pool.query(sql, params, function (err, rows, fields) {
      if (err) throw err;
      resolve(rows);
    });
  });
}

app.listen(3000, () => {
  console.log("Express server running on http://localhost:3000");
});
