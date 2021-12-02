const express = require("express");
const axios = require("axios").default;
const app = express();
const key = "6XMe_k2_Yr_GPZOr_axRdpTTdxw1WWEgUyZPP3He9wU";
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.static("public"));

app.get("/", async (req, res) => {
  let url = `https://api.unsplash.com/photos/random/?client_id=${key}&featured=true`;
  let response = await axios.get(url);
  imageUrl = response.data.urls.small;
  ownerUrl = response.data.links.html;
  imageOwner = response.data.user.name;
  console.log(imageUrl + "\n" + ownerUrl + "\n" + imageOwner);
  res.render("index", {
    imageUrl: imageUrl,
    imageOwner: imageOwner,
    ownerUrl: ownerUrl,
  });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
