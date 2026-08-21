(function () {
  const postId = document.body.dataset.postId;
  const editorId = document.body.dataset.editorId;
  const viewPage = document.body.dataset.viewPage;

  if (!postId || !editorId) return;

  const storageKey = `postContent-${postId}`;

  function confirmDelete() {
    if (confirm("정말로 이 게시글을 삭제하시겠습니까?")) {
      window.location.href = `communitylist.html?deleteId=${postId}`;
    }
  }

  window.confirmDelete = confirmDelete;

  document.addEventListener("DOMContentLoaded", function () {
    if (!window.CKEDITOR || !document.getElementById(editorId)) return;

    if (!CKEDITOR.instances[editorId]) {
      CKEDITOR.replace(editorId);
    }

    const savedPost = localStorage.getItem(storageKey);
    const editor = CKEDITOR.instances[editorId];

    if (editor && savedPost) {
      editor.setData(savedPost);
    }

    const saveButton = document.querySelector(".bt_wrap .on");
    const deleteButton = document.querySelector(".delete-btn");

    if (saveButton) {
      saveButton.addEventListener("click", function (event) {
        event.preventDefault();

        const currentEditor = CKEDITOR.instances[editorId];
        if (!currentEditor) return;

        localStorage.setItem(storageKey, currentEditor.getData());
        alert("게시글이 저장되었습니다.");
        window.location.href = viewPage || saveButton.getAttribute("href");
      });
    }

    if (deleteButton) {
      deleteButton.addEventListener("click", function (event) {
        event.preventDefault();
        confirmDelete();
      });
    }
  });
})();
