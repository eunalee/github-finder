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
      let strHtml = "";
      for (let i = 0; i < userList.length; i++) {
        strHtml += `<div class="search__result--box">`;
        strHtml += `  <div class="search__result--item">`;
        strHtml += `    <img src="${userList[i].avatar_url}" alt="${userList[i].login}" />`;
        strHtml += `    <span class="item__info">${userList[i].login}<br />developer</span>`;
        strHtml += `  </div>`;
        strHtml += `</div>`;
      }

      searchResult.innerHTML = strHtml;
    }
  }
});

// get userList from Github API
const getUserList = (keyword) => {
  return fetch(`https://api.github.com/search/users?q=${keyword}`, {
    headers: {
      Authorization: `token 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`,
    },
  })
    .then((response) => response.json())
    .then((data) => data.items);
};
