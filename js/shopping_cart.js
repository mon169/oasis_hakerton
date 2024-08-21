document.addEventListener('DOMContentLoaded', function() {
    const cartContainer = document.getElementById('cartContainer');

    function renderCartItems() {
        // 로컬 저장소에서 장바구니 제품 불러오기
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        if (cart.length > 0) {
            // 장바구니에 제품이 있을 경우
            cartContainer.innerHTML = cart.map((item, index) => `
                <div class="col mb-5">
                    <div class="card h-100">
                        <img class="card-img-top" src="${item.image}" alt="${item.name}" />
                        <div class="card-body p-4">
                            <h5 class="card-title">${item.name}</h5>
                            <p class="card-text">${item.price}</p>
                        </div>
                        <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                            <div class="text-center">
                                <button class="btn btn-outline-dark btn-remove" data-index="${index}">삭제</button>
                            </div>
                        </div>
                    </div>
                </div>
            `).join('');
        } else {
            // 장바구니가 비어 있을 경우
            cartContainer.innerHTML = '<p>장바구니에 제품이 없습니다.</p>';
        }
    }


    // 장바구니 제품 표시
    renderCartItems();

    // 장바구니에서 제품 삭제
    cartContainer.addEventListener('click', function(event) {
        if (event.target.classList.contains('btn-remove')) {
        
            const index = event.target.getAttribute('data-index');

            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCartItems(); // 제품 목록 다시 렌더링
        }
    });
});

