const express = require("express");
const fetch = require("node-fetch");
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.static("public/img"));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/mercury", async (req, res) => {
  let url =
    "https://api.unsplash.com/photos/random/?client_id=7756a1e81f817c186cf57294e1c19b37b49c54b8f34e7c499ee0ce5cd86cd16e&featured=true&query=planet-mercury";
  // let response = await fetch(url);
  // let data = await response.json();
  // let image = data.urls.small;
  image = "mercury.jpg";
  res.render("mercury", { mercuryUrl: image });
});
app.get("/venus", async (req, res) => {
  let url =
    "https://api.unsplash.com/photos/random/?client_id=7756a1e81f817c186cf57294e1c19b37b49c54b8f34e7c499ee0ce5cd86cd16e&featured=true&query=planet-venus";
  // let response = await fetch(url);
  // let data = await response.json();
  // let image = data.urls.small;
  image = "venus.jpg";
  res.render("venus", { venusUrl: image });
});

app.get("/earth", async (req, res) => {
  let url =
    "https://api.unsplash.com/photos/random/?client_id=7756a1e81f817c186cf57294e1c19b37b49c54b8f34e7c499ee0ce5cd86cd16e&featured=true&query=planet-earth";
  // let response = await fetch(url);
  // let data = await response.json();
  // let image = data.urls.small;
  image = "earth.jpg";
  res.render("earth", { earthUrl: image });
});
app.get("/mars", async (req, res) => {
  let url =
    "https://api.unsplash.com/photos/random/?client_id=7756a1e81f817c186cf57294e1c19b37b49c54b8f34e7c499ee0ce5cd86cd16e&featured=true&query=planet-mars";
  // let response = await fetch(url);
  // let data = await response.json();
  // let image = data.urls.small;
  image = "mars.jpg";
  res.render("mars", { marsUrl: image });
});
app.get("/jupiter", async (req, res) => {
  let url =
    "https://api.unsplash.com/photos/random/?client_id=7756a1e81f817c186cf57294e1c19b37b49c54b8f34e7c499ee0ce5cd86cd16e&featured=true&query=planet-jupiter";
  try {
    // let response = await fetch(url);
    // let data = await response.json();
    // let image = data.urls.small;
    image = "jupiter.jpg";
    res.render("jupiter", { jupiterUrl: image });
  } catch (error) {
    res.status(404).send("Error: ", error);
  }
});

app.listen(3000, (req, res) => {
  console.log("Server started");
});
