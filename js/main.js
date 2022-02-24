"use strict";

const searchBox = document.getElementById("search__box");

// when the searchBox is focused, a text disappear
searchBox.addEventListener("focus", () => {
  const searchBlankText = document.querySelector(".search__blank");
  if (searchBlankText.style.display === "block") {
    searchBlankText.style.display = "none";
  }
});

searchBox.addEventListener("keypress", (event) => {
  // when the enter key is pressed
  if (event.key === "Enter") {
    const keyword = document.getElementById("search__box").value;
    if (keyword === "") {
      // there is no keyword
      document.querySelector(".search__blank").style.display = "block";
    } else {
      // select user's data with keyword using Github API
      // fetch()
      const resultBox = document.createElement("div");
      resultBox.setAttribute("class", "search__result--box");

      const resultItem = document.createElement("div");
      resultItem.setAttribute("class", "search__result--item");

      const img = document.createElement("img");
      img.setAttribute("src");
      img.setAttribute("alt");

      const name = document.createElement("span");
      span.setAttribute("class", "item__info");

      const userList = getUserList(keyword);
      console.log(typeof userList);
      console.log(userList);
    }
  }
});

// getUserList
const getUserList = function (keyword) {
  return fetch(`https://api.github.com/search/users?q=${keyword}`)
    .then((response) => response.json())
    .then((data) => console.log(data.items))
    .catch(console.log);
};
