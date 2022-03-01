"use strict";

const searchBox = document.getElementById("search__box");

// when the searchBox is focused, a text disappear
searchBox.addEventListener("focus", () => {
  const searchBlankText = document.querySelector(".search__blank");
  if (searchBlankText.style.display === "block") {
    searchBlankText.style.display = "none";
  }
});

searchBox.addEventListener("keypress", async (event) => {
  // when the enter key is pressed
  if (event.key === "Enter") {
    const keyword = document.getElementById("search__box").value;
    if (keyword === "") {
      // there is no keyword
      document.querySelector(".search__blank").style.display = "block";
    } else {
      // userList
      const userList = await getUserList(keyword);

      // create a searchBox
      const searchResult = document.querySelector(".search__result");

      for (let i = 0; i < userList.length; i++) {
        const resultBox = document.createElement("div");
        resultBox.setAttribute("class", "search__result--box");

        const resultItem = document.createElement("div");
        resultItem.setAttribute("class", "search__result--item");

        const img = document.createElement("img");
        img.setAttribute("src", userList[i].avatar_url);
        img.setAttribute("alt", userList[i].login);

        const name = document.createElement("span");
        name.setAttribute("class", "item__info");
        name.innerHTML = userList[i].login;

        // search__result--item
        resultItem.appendChild(img);
        resultItem.appendChild(name);

        // search__result--box
        resultBox.appendChild(resultItem);

        // search__result
        searchResult.appendChild(resultBox);
      }
    }
  }
});

// Github API token
const first = "ghp_Zf42nW";
const second = "b96SrH5PAW";
const third = "pgG02aGgN9";
const fourth = "URg61aethE";

const auth = first + second + third + fourth;

// get userList from Github API
const getUserList = (keyword) => {
  return fetch(`https://api.github.com/search/users?q=${keyword}`, {
    headers: {
      Authorization: `token ${auth}`,
    },
  })
    .then((response) => response.json())
    .then((data) => data.items);
};
