(function () {
  const postId = document.body.dataset.postId;
  const commentsStorageKey = postId ? `comments-${postId}` : null;

  function getSavedComments() {
    if (!commentsStorageKey) return [];

    try {
      return JSON.parse(localStorage.getItem(commentsStorageKey)) || [];
    } catch (error) {
      return [];
    }
  }

  function saveComments(comments) {
    if (!commentsStorageKey) return;
    localStorage.setItem(commentsStorageKey, JSON.stringify(comments));
  }

  function appendComment(commentsList, nickname, comment) {
    const listItem = document.createElement("li");
    listItem.textContent = `${nickname}: ${comment}`;
    commentsList.appendChild(listItem);
  }

  document.addEventListener("DOMContentLoaded", function () {
    const postContent = document.getElementById("postContent");
    const savedContent = postId ? localStorage.getItem(`postContent-${postId}`) : null;

    if (postContent && savedContent && savedContent.trim()) {
      postContent.innerHTML = savedContent;
    }

    const submitButton = document.getElementById("submitComment");
    const commentsList = document.getElementById("comments");

    if (commentsList) {
      getSavedComments().forEach((savedComment) => {
        appendComment(commentsList, savedComment.nickname, savedComment.comment);
      });
    }

    if (!submitButton) return;

    submitButton.addEventListener("click", function () {
      const nicknameInput = document.getElementById("nicknameInput");
      const commentInput = document.getElementById("commentInput");

      if (!nicknameInput || !commentInput || !commentsList) return;

      const nickname = nicknameInput.value.trim();
      const comment = commentInput.value.trim();

      if (!nickname || !comment) {
        alert("닉네임과 댓글을 모두 입력해 주세요.");
        return;
      }

      appendComment(commentsList, nickname, comment);
      saveComments([...getSavedComments(), { nickname, comment }]);

      nicknameInput.value = "";
      commentInput.value = "";
    });
  });
})();
