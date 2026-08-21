document.addEventListener("DOMContentLoaded", function () {
  const registerButton = document.getElementById("registerBtn");
  if (!registerButton) return;

  registerButton.addEventListener("click", function () {
    const titleInput = document.querySelector(".title input");
    const writerInput = document.querySelector(".info input");
    const contentInput = document.querySelector(".cont textarea");

    const title = titleInput ? titleInput.value.trim() : "";
    const writer = writerInput ? writerInput.value.trim() : "";
    const content = contentInput ? contentInput.value.trim() : "";

    if (!title || !writer || !content) {
      alert("모든 필드를 채워주세요.");
      return;
    }

    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    const nextId = posts.reduce((maxId, post) => Math.max(maxId, post.id || 0), 0) + 1;

    posts.push({
      id: nextId,
      title,
      writer,
      date: new Date().toISOString().split("T")[0],
      count: 0
    });

    localStorage.setItem("posts", JSON.stringify(posts));
    alert("게시글이 등록되었습니다!");
    window.location.href = "communitylist.html";
  });
});
