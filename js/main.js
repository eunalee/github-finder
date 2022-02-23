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
    }
  }
});
