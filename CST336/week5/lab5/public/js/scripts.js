let authorLinks = document.querySelectorAll("a");
for (authorLink of authorLinks) {
  authorLink.addEventListener("click", getAuthorInfo);
}

async function getAuthorInfo() {
  var myModal = new bootstrap.Modal(document.getElementById("authorModal"));
  myModal.show();
  let url = `/api/author/${this.id}`;
  let response = await fetch(url);
  let data = await response.json();

  let authorInfo = document.querySelector("#authorInfo");
  authorInfo.innerHTML = `<h1>${data[0].firstName} ${data[0].lastName}</h1>`;
  authorInfo.innerHTML += `<img src="${data[0].portrait}" width="200"><br>`;
  authorInfo.innerHTML += `<p><strong><span>Biography: </span></strong>${data[0].biography}`;
  authorInfo.innerHTML += `<p><strong><span>Born: </span></strong>${data[0].dob}`;
  authorInfo.innerHTML += `<p><strong><span>Died: </span></strong>${data[0].dod}`;
  authorInfo.innerHTML += `<p><strong><span>Country: </span></strong>${data[0].country}`;

  authorInfo.innerHTML += `<p><strong><span>Profession: </span></strong>${data[0].profession}`;
  authorInfo.innerHTML += `<p><strong><span>Sex: </span></strong>${data[0].sex}`;

  console.log(data);
}
/**
 * authorId: 2
biography: "Dame Agatha Mary Clarissa Christie, Lady Mallowan, DBE was an English writer. She is known for her 66 detective novels and 14 short story collections, particularly those revolving around her fictional detectives Hercule Poirot and Miss Marple."
country: "United Kingdom"
dob: "1890-09-15T08:00:00.000Z"
dod: "1976-01-12T08:00:00.000Z"
firstName: "Agatha"
lastName: "Christie"
portrait: "http://www.gstatic.com/tv/thumb/persons/323/323_v9_ba.jpg"
profession: "Writer"
sex: "F"
 */
