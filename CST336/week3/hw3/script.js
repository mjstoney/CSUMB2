/*https://api.themoviedb.org/3/movie/550?api_key=b3ba8a8cfb333202db1a9d6497da1f47

b3ba8a8cfb333202db1a9d6497da1f47

1. Search movie: get: /search/movie

https://api.themoviedb.org/3/search/movie?api_key=b3ba8a8cfb333202db1a9d6497da1f47&language=en-US&query=fight%20club&page=1&include_adult=false

2. get top movies: GET: /trending/movie/week

https://api.themoviedb.org/3/trending/movie/week?api_key=b3ba8a8cfb333202db1a9d6497da1f47


3. get list of genres:
https://api.themoviedb.org/3/genre/movie/list?api_key=b3ba8a8cfb333202db1a9d6497da1f47&language=en-US

4. get top movies within genres:

https://api.themoviedb.org/3/discover/movie?api_key=b3ba8a8cfb333202db1a9d6497da1f47&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=28&with_watch_monetization_types=flatrate
** query_string: with_genres uses the ID # of the genres from the above genre list in #3

5. get poster: https://image.tmdb.org/t/p/w500/6AdXwFTRTAzggD2QUTt5B7JFGKL.jpg
--> poster path from movie details api endpoint



const eternalMovie = {
  adult: false,
  backdrop_path: "/fzKWwcaam9QSTaMSJlORuSojxio.jpg",
  belongs_to_collection: null,
  budget: 200000000,
  genres: [
    { id: 28, name: "Action" },
    { id: 12, name: "Adventure" },
    { id: 878, name: "Science Fiction" },
  ],
  homepage: "https://www.marvel.com/movies/the-eternals",
  id: 524434,
  imdb_id: "tt9032400",
  original_language: "en",
  original_title: "Eternals",
  overview:
    "The Eternals are a team of ancient aliens who have been living on Earth in secret for thousands of years. When an unexpected tragedy forces them out of the shadows, they are forced to reunite against mankind’s most ancient enemy, the Deviants.",
  popularity: 2868.332,
  poster_path: "/6AdXwFTRTAzggD2QUTt5B7JFGKL.jpg",
  production_companies: [
    {
      id: 420,
      logo_path: "/hUzeosd33nzE5MCNsZxCGEKTXaQ.png",
      name: "Marvel Studios",
      origin_country: "US",
    },
  ],
  production_countries: [
    { iso_3166_1: "US", name: "United States of America" },
  ],
  release_date: "2021-11-03",
  revenue: 170909980,
  runtime: 157,
  spoken_languages: [
    { english_name: "Arabic", iso_639_1: "ar", name: "العربية" },
    { english_name: "English", iso_639_1: "en", name: "English" },
    { english_name: "Hindi", iso_639_1: "hi", name: "हिन्दी" },
    { english_name: "Latin", iso_639_1: "la", name: "Latin" },
    { english_name: "Spanish", iso_639_1: "es", name: "Español" },
  ],
  status: "Released",
  tagline: "In the beginning...",
  title: "Eternals",
  video: false,
  vote_average: 7.1,
  vote_count: 718,
};
*/

$(document).ready(() => {
  const dropdownList = $("#dropdownList");
  const searchField = $("#searchField");
  const searchBtn = $("#searchBtn");
  const topMoviesLink = $("#topMoviesLink");
  const homeLink = $("#homeLink");

  $("#searchForm").submit((event) => {
    event.preventDefault();
  });

  /***************************************************************
   *
   *        FUNCTIONS
   *
   ***************************************************************/
  async function getMovies(arr) {
    let posterAPI = "https://image.tmdb.org/t/p/w500/";
    if (arr) {
      $(".main").empty();
      arr.forEach((movie) => {
        let poster = posterAPI + movie.poster_path;
        $(".main").append(
          `<div class="flip-card rounded-3 shadow-lg"><div class="flip-card-inner rounded"><div class="flip-card-front rounded"><img src="${poster}" class="rounded" alt="${movie.title}" /></div><div class="flip-card-back rounded overflow-auto"><h1>${movie.title}</h1><p>${movie.vote_average} / 10</p><p>${movie.overview}</p></div></div></div>`
        );
      });
    }
  }

  async function populateCategoriesMenu() {
    const genreURI =
      "https://api.themoviedb.org/3/genre/movie/list?api_key=b3ba8a8cfb333202db1a9d6497da1f47&language=en-US";
    let results = await fetch(genreURI);
    let data = await results.json();
    data.genres.forEach((genre) => {
      dropdownList.append(
        `<li><a href="#" id="${genre.id}" class="dropdown-item">${genre.name}</a></li>`
      );
    });
  }

  async function executeSearch(searchText) {
    if (searchText.length == 0) {
      alert("Please enter a movie to search for...");
    }
    if (searchText != "") {
      let searchURI = `https://api.themoviedb.org/3/search/movie?api_key=b3ba8a8cfb333202db1a9d6497da1f47&language=en-US&query=${searchText}&page=1&include_adult=false`;
      let result = await fetch(searchURI);
      let data = await result.json();
      getMovies(data.results);
    }
    searchField.val("");
  }

  /***************************************************************
   *
   *        EVENT LISTENERS
   *
   ***************************************************************/
  homeLink.click(() => {
    $(".main").load("home.html");
  });

  searchBtn.on("click", (e) => {
    e.preventDefault();
    executeSearch(searchField.val());
  });

  searchField.on("keypress", (e) => {
    if (e.which === 14) {
      executeSearch(searchField.val());
    }
  });

  topMoviesLink.click(async () => {
    const trendingURI =
      "https://api.themoviedb.org/3/trending/movie/week?api_key=b3ba8a8cfb333202db1a9d6497da1f47";

    const trending = await fetch(trendingURI);
    const data = await trending.json();
    getMovies(data.results);
  });

  //   getTrendingMovies();
  populateCategoriesMenu();
});
//movies?search=hellboy
