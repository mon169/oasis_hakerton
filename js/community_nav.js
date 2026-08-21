(function () {
  const navRoot = document.getElementById("communityNav");
  if (!navRoot) return;

  navRoot.innerHTML = `
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container px-4 px-lg-5">
        <a class="navbar-brand" href="../mainsite.html">
          <img src="../assets/icons/common/푸른발자국.png" style="width: 2.5rem" />&nbsp;푸른발자국
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="../tripmain.html">여행 가이드</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="communitylist.html">커뮤니티</a>
            </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                id="navbarDropdown"
                href="../local_food.html"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >로컬 스토어</a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><a class="dropdown-item" href="../local_food.html">로컬푸드</a></li>
                <li><hr class="dropdown-divider" /></li>
                <li><a class="dropdown-item" href="../eco_product.html">친환경 제품</a></li>
                <li><hr class="dropdown-divider" /></li>
                <li><a class="dropdown-item" href="../gift.html">상품권 교환</a></li>
              </ul>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="../personal_trip.html">나만의 여행지</a>
            </li>
          </ul>
          <a class="btn btn-outline-dark" href="../shopping_cart.html">
            <i class="bi-cart-fill me-1"></i>
            장바구니
            <span class="badge bg-dark text-white ms-1 rounded-pill"></span>
          </a>
        </div>
      </div>
    </nav>
  `;
})();
