$(document).ready(() => {
  const container = $("#container");
  const listContainer = $(".listContainer");
  const input = $("#itemInput");
  const list = $("#list");
  let itemArr = ["haha", "i lost my hw", "lol"];

  // list.append(
  //   "<li class='listItem'>hello<button id='checkItem'><i class='fas fa-check'></i></button>    <button id='deleteItem'><i class='fas fa-ban'></i></button></li><hr class='separator'>"
  // );
  // list.append(
  //   "<li class='listItem'>hello<button id='checkItem'><i class='fas fa-check'></i></button>    <button id='deleteItem'><i class='fas fa-ban'></i></button></li><hr class='separator'>"
  // );
  // list.append(
  //   "<li class='listItem'>hello<button id='checkItem'><i class='fas fa-check'></i></button>    <button id='deleteItem'><i class='fas fa-ban'></i></button></li><hr class='separator'>"
  // );

  for (let i = 0; i < itemArr.length; i++) {
    addNewItem(itemArr[i], i + 1);
  }

  function addNewItem(text, index) {
    list.append(
      "<li class='listItem' id='" +
        text +
        "'>" +
        index +
        ". " +
        text +
        "<button id='checkItem'><i class='fas fa-check'></i></button>    <button id='deleteItem'><i class='fas fa-ban'></i></button></li><hr class='separator'>"
    );
  }
});
