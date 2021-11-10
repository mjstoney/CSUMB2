$(document).ready(() => {
  const container = $("#container");
  const listContainer = $(".listContainer");
  const input = $("#itemInput");
  const plusIcon = $("#plusIcon");
  const checkIcon = $("#checkIcon");
  const deleteIcon = $("#deleteIcon");
  const list = $("#list");

  let itemArr = [];
  let counter = 1; // keeps track of item numbers

  // add checklist icon to the header using javascript
  let headerImg = document.getElementById("headerImg");
  headerImg.src = "img/clipboard.png";
  /*************************************************
   *
   * function that populates the list using the items
   * in itemArr[]
   *
   ************************************************/
  function drawList() {
    for (let i = 0; i < itemArr.length; i++) {
      addNewItem(itemArr[i], i + 1);
    }
  }

  /*************************************************
   *
   * function to be called to add a new <li> to the list
   *
   ************************************************/
  function addNewItem(text) {
    list.append(
      "<li class='listItem' id='" +
        text +
        "'><span id='listSpan'>" +
        counter +
        ". " +
        text +
        "</span><i id='checkIcon' class='fas fa-check'></i> <i id='deleteIcon' class='fas fa-ban'></i></li>"
    );
    counter++;
  }

  /*************************************************
   *
   * add onClick to add an item to the list
   *
   ************************************************/
  plusIcon.click(() => {
    const text = input.val();
    if (text !== "") {
      addNewItem(text);
      input.val("");
      itemArr.push(text);
    }
  });

  /*************************************************
   *
   *  Add onClick functionality for deleting single item
   *
   ************************************************/
  list.on("click", "#deleteIcon", function () {
    const text = $(this).closest("li").attr("id");
    itemArr.splice(itemArr.indexOf(text), 1);
    $(this).closest("li").remove();
  });

  /*************************************************
   *
   *  Add onClick functionality for crossing out an item
   *
   ************************************************/
  list.on("click", "#checkIcon", function () {
    const item = $(this).closest("li");
    if (item.css("text-decoration").includes("line-through")) {
      item.css("text-decoration", "none");
    } else {
      item.css("text-decoration", "line-through");
    }
  });

  /*************************************************
   *
   *  Add onClick to button to clear entire list
   *
   ************************************************/
  $("#clearList").click(() => {
    counter = 1;
    $("li").remove();
  });

  /*************************************************
   *
   * Add onClick to redraw the list if the numbers are
   * out of order
   *
   ************************************************/
  $("#renumberList").click(() => {
    $("li").remove();
    counter = 1;
    for (let i = 0; i < itemArr.length; i++) {
      addNewItem(itemArr[i]);
    }
  });
});
