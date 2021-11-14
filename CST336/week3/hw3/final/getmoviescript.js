$("document").ready(function () {
  console.log("hi");
  async function getCrew(movieID) {
    let crewURI = `https://api.themoviedb.org/3/movie/${movieID}/credits?api_key=b3ba8a8cfb333202db1a9d6497da1f47&language=en-US`;
    let crewResult = await fetch(crewURI);
    let crewData = await crewResult.json();
    return crewData;
  }

  async function getMovieDetails(movieID) {
    let movieURI = `https://api.themoviedb.org/3/movie/${movieID}?api_key=b3ba8a8cfb333202db1a9d6497da1f47&language=en-US`;
    let movieResult = await fetch(movieURI);
    let movieData = await movieResult.json();
    return movieData;
  }

  async function displayMovie(movieID) {
    let personnel = await getCrew(movieID);
    let cast = personnel.cast;
    let crew = personnel.crew;
    let topBilled = [];
    let director = crew.filter((person) => person.job === "Director")[0];

    for (let i = 0; i < 4; i++) {
      topBilled.push(cast[i]);
      // console.log(`${cast[i].name} as ${cast[i].character}`);
    }

    let movie = await getMovieDetails(movieID);

    let posterURI = "https://image.tmdb.org/t/p/w500/" + movie.poster_path;
    let castList = $("#castList");
    let dirList = $("#dirList");
    $("#title").html(movie.title);
    $("#tagline").html(movie.tagline);
    $("#poster").attr("src", posterURI);
    $("#rating").html(`${movie.vote_average} / 10`);
    $("#year").html(movie.release_date.slice(0, 4));
    $("#productionCompany").html(movie.production_companies[0].name);
    $("#country").html(movie.production_companies[0].origin_country);
    $("#overview").html(movie.overview);
    topBilled.forEach((person) => {
      castList.append(
        `<li class="list-unstyled"><div class="fw-bold ms-5">${person.name}</div><div class="ms-5 ps-5 h5 text-muted">${person.character}</div></li>`
      );
    });
    dirList.append(
      `<li class="list-unstyled"><div class="fw-bold ms-5">${director.name}</div></li>`
    );
  }
});

/*
            <li class="list-unstyled">
              <div class="fw-bold ms-5">cast[i].name</div>
              <div class="ms-5 ps-5 h5 text-muted">cast[i].character</div>
            </li>

            `
        <li class="list-unstyled"><div class="fw-bold ms-5">${person.name}</div><div class="ms-5 ps-5 h5 text-muted">${person.character}</div></li>`);
*/
