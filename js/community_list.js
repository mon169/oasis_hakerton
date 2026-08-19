const defaultPosts = [
  { id: 1, title: "커뮤니티 이용안내", writer: "운영자", date: "2024.8.25", count: 8532 },
  { id: 2, title: "수많은 철새를 볼 수 있는 3대 철새 도래지인 <br>군산의 금강 생태습지 공원!", writer: "유소민", date: "2024.8.25", count: 3654 },
  { id: 3, title: "조금만 관심을 가진다면 만날 수 있는 작은 곤충의 세계! <br>금마 서동 생태관광지", writer: "최윤서", date: "2024.8.25", count: 2895 },
  { id: 4, title: "호남의 금강이라 불리며 조선 8경의 하나인 <br>내장산 국립공원!", writer: "김민재", date: "2024.8.25", count: 1465 },
  { id: 5, title: "프랑스미슐랭그린가이드에서 만점을 받은 대한민국 <br>최고의 명소! 반디랜드", writer: "강태훈", date: "2024.8.25", count: 786 },
  { id: 6, title: "군산에 놀러왔는데 가볼만 한 여행지 추천해주세요!", writer: "유소민", date: "2024.8.25", count: 387 },
  { id: 7, title: "익산에서 아이들과 가볼만 한 여행지가 있을까요?", writer: "최윤서", date: "2024.8.25", count: 456 },
  { id: 8, title: "정읍에서 힐링받을 만한 곳 있을까요?", writer: "김민재", date: "2024.8.25", count: 789 },
  { id: 9, title: "무주에서 아이 셋과 같이 갈만한 곳 추천해주세요!", writer: "강태훈", date: "2024.8.25", count: 325 },
  { id: 10, title: "집에서 감자를 키워보려고 하는데 심는 시기가 어떻게 되나요?", writer: "최윤서", date: "2024.8.26", count: 654 },
  { id: 11, title: "농업에 관심이 생겨서 배우고 싶어요.", writer: "유소민", date: "2024.8.26", count: 264 }
];

const postsStorageKey = "posts";
const postsStorageVersionKey = "postsStorageVersion";
const postsStorageVersion = "community-posts-v3";

function readPostsFromLocalStorage() {
  try {
    const savedPosts = JSON.parse(localStorage.getItem(postsStorageKey));
    return Array.isArray(savedPosts) ? savedPosts : null;
  } catch (error) {
    return null;
  }
}

function savePostsToLocalStorage(postsToSave) {
  localStorage.setItem(postsStorageKey, JSON.stringify(postsToSave));
  localStorage.setItem(postsStorageVersionKey, postsStorageVersion);
}

function getNormalizedPosts() {
  const savedPosts = readPostsFromLocalStorage();
  const isCurrentVersion = localStorage.getItem(postsStorageVersionKey) === postsStorageVersion;

  if (
    !isCurrentVersion ||
    !savedPosts ||
    savedPosts.some((post) => !Number.isInteger(post.id))
  ) {
    savePostsToLocalStorage(defaultPosts);
    return [...defaultPosts];
  }

  const defaultPostIds = new Set(defaultPosts.map((post) => post.id));
  const customPosts = savedPosts.filter((post) => !defaultPostIds.has(post.id));

  return [...defaultPosts, ...customPosts];
}

function getQueryParameter(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

function appendTitleWithLineBreaks(element, title) {
  const parts = title.split(/<br\s*\/?>/i);

  parts.forEach((part, index) => {
    if (index > 0) {
      element.appendChild(document.createElement("br"));
    }

    element.appendChild(document.createTextNode(part));
  });
}

let posts = getNormalizedPosts();
const deleteId = Number(getQueryParameter("deleteId"));

if (Number.isInteger(deleteId)) {
  posts = posts.filter((post) => post.id !== deleteId);
  savePostsToLocalStorage(posts);

  if (window.history.replaceState) {
    window.history.replaceState(null, "", window.location.pathname);
  }
}

const postsPerPage = 5;
let currentPage = 1;

function displayPosts(page) {
  const start = (page - 1) * postsPerPage;
  const end = start + postsPerPage;
  const postsToDisplay = posts.slice(start, end);
  const boardList = document.getElementById("boardList");

  if (!boardList) return;
  boardList.replaceChildren();

  postsToDisplay.forEach((post, index) => {
    const row = document.createElement("div");
    row.style.display = "flex";
    row.style.alignItems = "center";
    row.style.justifyContent = "space-between";
    row.style.height = "auto";

    const number = document.createElement("div");
    number.className = "num";
    number.style.fontSize = "24px";
    number.textContent = start + index + 1;

    const title = document.createElement("div");
    title.className = "title";
    title.style.flexGrow = "1";

    const titleLink = document.createElement("a");
    titleLink.href = `communityview${post.id || start + index + 1}.html`;
    if (post.title === "커뮤니티 이용안내") {
      titleLink.className = "special-title";
    }
    appendTitleWithLineBreaks(titleLink, post.title);
    title.appendChild(titleLink);

    const writer = document.createElement("div");
    writer.className = "writer";
    writer.style.marginLeft = "100px";
    writer.textContent = post.writer;

    const date = document.createElement("div");
    date.className = "date";
    date.style.marginLeft = "10px";
    date.textContent = post.date;

    const count = document.createElement("div");
    count.className = "count";
    count.style.marginLeft = "10px";
    count.textContent = post.count;

    const separator = document.createElement("hr");
    separator.style.border = "1px solid #ccc";
    separator.style.margin = "0px 0";

    row.append(number, title, writer, date, count);
    boardList.append(row, separator);
  });
}

function setupPagination() {
  const pagination = document.getElementById("pagination");
  if (!pagination) return;

  const totalPages = Math.ceil(posts.length / postsPerPage);
  pagination.replaceChildren();

  const createPageButton = (label, page, className = "bt") => {
    const button = document.createElement("a");
    button.href = "#";
    button.className = className;
    button.textContent = label;
    button.addEventListener("click", (event) => {
      event.preventDefault();
      changePage(page);
    });
    return button;
  };

  pagination.appendChild(createPageButton("<<", 1));
  pagination.appendChild(createPageButton("<", currentPage - 1, `bt ${currentPage === 1 ? "disabled" : ""}`));

  for (let i = 1; i <= totalPages; i++) {
    pagination.appendChild(createPageButton(String(i), i, `num ${i === currentPage ? "on" : ""}`));
  }

  pagination.appendChild(createPageButton(">", currentPage + 1, `bt ${currentPage === totalPages ? "disabled" : ""}`));
  pagination.appendChild(createPageButton(">>", totalPages));
}

function changePage(page) {
  if (page < 1 || page > Math.ceil(posts.length / postsPerPage)) return;
  currentPage = page;
  displayPosts(currentPage);
  setupPagination();
}

displayPosts(currentPage);
setupPagination();
