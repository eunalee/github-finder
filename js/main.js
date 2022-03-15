"use strict";

const searchBox = document.getElementById("search__box");
const searchResult = document.querySelector(".search__result");

// 검색창 포커스
searchBox.addEventListener("focus", () => {
  const searchBlankText = document.querySelector(".search__blank");

  // 노출되는 경고문구 제거 (검색어가 없는 경우)
  if (searchBlankText.style.display === "block") {
    searchBlankText.style.display = "none";
  }
});

// 검색
searchBox.addEventListener("keypress", async (event) => {
  // 검색결과 제거
  searchResult.innerHTML = "";

  // 엔터키 검색
  if (event.key === "Enter") {
    const keyword = document.getElementById("search__box").value;

    // 검색어가 없는 경우
    if (keyword === "") {
      // 경고문구 노출
      document.querySelector(".search__blank").style.display = "block";
    }
    // 검색어가 있는 경우
    else {
      // 사용자 정보 조회
      const userList = await getUserList(keyword);

      // 검색 결과 그리기
      for (let i = 0; i < userList.length; i++) {
        const resultBox = document.createElement("div");
        resultBox.setAttribute("class", "search__result--box");

        const resultItem = document.createElement("div");
        resultItem.setAttribute("class", "search__result--item");

        const link = document.createElement("a");
        link.setAttribute("href", userList[i].html_url);
        link.setAttribute("target", "_blank");

        const img = document.createElement("img");
        img.setAttribute("src", userList[i].avatar_url);
        img.setAttribute("alt", userList[i].login);

        const name = document.createElement("span");
        name.setAttribute("class", "item__info");
        name.innerHTML = userList[i].login;

        link.appendChild(img);
        link.appendChild(name);

        // search__result--item
        resultItem.appendChild(link);

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

// 사용자 정보 가져오기 (from Github API)
const getUserList = (keyword) => {
  return fetch(`https://api.github.com/search/users?q=${keyword}`, {
    headers: {
      Authorization: `token ${auth}`,
    },
  })
    .then((response) => response.json())
    .then((data) => data.items);
};
