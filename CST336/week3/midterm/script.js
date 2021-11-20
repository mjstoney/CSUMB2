$(document).ready(function () {
  const videoURI =
    "https://itcdland.csumb.edu/~milara/ajax/videosAPI.php?videoId=";

  const videoAction = "&action=";
  const videoID = "aam9VvzFuI0";

  const currentLikes = $(".currentLikes");
  const currentDislikes = $(".currentDislikes");
  const commentsBtn = $(".comments");
  const questionBtn = $(".question");
  const likeBtn = $(".like");
  const cancelLikeBtn = $(".cancelLike");
  const dislikeBtn = $(".dislike");
  const cancelDislikeBtn = $(".cancelDislike");
  const content = $(".content");
  const selectMenu = $(".selectMenu");
  const answerResult = $(".answerResult");

  cancelDislikeBtn.hide();
  cancelLikeBtn.hide();
  getLikes();

  async function getLikes() {
    res = await fetch(videoURI + videoID);
    data = await res.json();
    console.log(data);
    currentLikes.html(data.likes);
    currentDislikes.html(data.dislikes);
  }

  async function updateLikes(action) {
    try {
      res = await fetch(videoURI + videoID + videoAction + action);
      data = await res.json();
      getLikes();
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  async function getComments() {
    try {
      content.empty();
      res = await fetch(videoURI + videoID + videoAction + "comments");
      data = await res.json();
      data.forEach((comment) => {
        let starRating = "";
        for (let i = 0; i < comment.rating; i++) {
          starRating += '<i class="fas fa-star"></i>';
        }
        stars = "<p>" + starRating + "</p>";
        console.log(stars);
        content.append(
          `<p><span style="font-weight: bold;"> ${comment.author}</span> <span style="font-style: italic">${comment.date}</p><p>${comment.comment}</span></p><p class="starRating">${stars}</p><br/>`
        );
      });
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  function showQuestion() {
    const questionHTML =
      '<div class="question">' +
      "<h1>What was this video about?</h1>" +
      '<select name="selectMenu" class="selectMenu">' +
      '<option value="1">Rip and Tear</option>' +
      '<option value="2">A Night at the Opera</option>' +
      '<option value="3">DOOM</option>' +
      '<option value="4">Baseball</option>' +
      '<option value="5">Pet Fashion Show</option>' +
      "</select>" +
      "</div><br/><br/>" +
      "<div class='answerResult'></div>";
    content.empty();
    content.append(questionHTML);
    $(".selectMenu").on("change", () => {
      $(".answerResult").empty();
      if ($(".selectMenu option:selected").val() === "3") {
        $(".answerResult").append("<h3>Correct!</h3>");
        $(".answerResult").css("background-color", "green");
      } else {
        $(".answerResult").append("<h3>Incorrect!</h3>");
        $(".answerResult").css("background-color", "red");
      }
    });
  }
  /*​
{
  "comment": "It was fun watching it",
  "rating": 3,
  "author": "Tyrion",
  "date": "2021-11-12"
}
​*/
  likeBtn.click(() => {
    updateLikes("like");
    likeBtn.hide();
    cancelLikeBtn.show();
  });
  dislikeBtn.click(() => {
    updateLikes("dislike");
    dislikeBtn.hide();
    cancelDislikeBtn.show();
  });
  cancelLikeBtn.click(() => {
    updateLikes("cancel_like");
    cancelLikeBtn.hide();
    likeBtn.show();
  });
  cancelDislikeBtn.click(() => {
    updateLikes("cancel_dislike");
    cancelDislikeBtn.hide();
    dislikeBtn.show();
  });
  commentsBtn.click(() => {
    getComments();
  });

  questionBtn.click(() => {
    showQuestion();
  });
});
