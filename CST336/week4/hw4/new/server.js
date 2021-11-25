const express = require("express");
const ejs = require("ejs");
const axios = require("axios");
const faker = require("faker");

const app = express();
app.use(express.static("public"));
app.use(express.static("public/css"));
app.use(express.static("public/img"));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  let result = faker.company.companyName();
  res.render("index", { active: "home", fakeCompany: result });
});

app.get("/express", (req, res) => {
  let result = faker.company.companyName();
  res.render("express", { active: "express", fakeCompany: result });
});

app.get("/mongoose", (req, res) => {
  let result = faker.company.companyName();
  res.render("mongoose", { active: "mongoose", fakeCompany: result });
});
app.get("/socketio", async (req, res) => {
  let result = faker.company.companyName();
  console.log(result);
  res.render("socketio", { active: "socketio", fakeCompany: result });
});

app.listen(3000, () => {
  console.log("Server running on 3000.");
});
