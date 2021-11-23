const express = require("express");
const ejs = require("ejs");
const axios = require("axios");

const app = express();
app.use(express.static("public"));
app.use(express.static("public/css"));
app.use(express.static("public/img"));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", { active: "home" });
});

app.get("/express", (req, res) => {
  res.render("express", { active: "express" });
});

app.get("/mongoose", (req, res) => {
  res.render("mongoose", { active: "mongoose" });
});
app.get("/socketio", (req, res) => {
  res.render("socketio", { active: "socketio" });
});

app.listen(3000, () => {
  console.log("Server running on 3000.");
});
