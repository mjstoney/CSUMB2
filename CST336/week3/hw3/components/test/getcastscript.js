import fetch from "node-fetch";

async function getCast(movieID) {
  let uri = `https://api.themoviedb.org/3/movie/${movieID}/credits?api_key=b3ba8a8cfb333202db1a9d6497da1f47&language=en-US`;
  let result = await fetch(uri);
  let data = await result.json();
  let cast = data.cast;
  let crew = data.crew;

  let director = crew.filter((person) => person.job === "Director")[0];
  console.log(director.name);

  for (let i = 0; i < 4; i++) {
    console.log(`${cast[i].name} as ${cast[i].character}`);
  }
}

getCast(550);
