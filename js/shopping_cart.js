document.addEventListener('DOMContentLoaded', function() {
    const cartContainer = document.getElementById('cartContainer');

    function createCartItem(item, index) {
        const name = item.name || '';
        const price = item.price || '';
        const image = item.image || '';

        const col = document.createElement('div');
        col.className = 'col mb-5';

        const card = document.createElement('div');
        card.className = 'card h-100';

        const img = document.createElement('img');
        img.className = 'card-img-top';
        img.src = image;
        img.alt = name;

        const body = document.createElement('div');
        body.className = 'card-body p-4';

        const title = document.createElement('h5');
        title.className = 'card-title';
        title.textContent = name;

        const priceElement = document.createElement('p');
        priceElement.className = 'card-text';
        priceElement.textContent = price;

        const footer = document.createElement('div');
        footer.className = 'card-footer p-4 pt-0 border-top-0 bg-transparent';

        const actions = document.createElement('div');
        actions.className = 'text-center';

        const removeButton = document.createElement('button');
        removeButton.className = 'btn btn-outline-dark btn-remove';
        removeButton.dataset.index = index;
        removeButton.textContent = '삭제';

        body.append(title, priceElement);
        actions.appendChild(removeButton);
        footer.appendChild(actions);
        card.append(img, body, footer);
        col.appendChild(card);

        return col;
    }

    function renderCartItems() {
        // 로컬 저장소에서 장바구니 제품 불러오기
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        if (cart.length > 0) {
            // 장바구니에 제품이 있을 경우
            cartContainer.replaceChildren(...cart.map(createCartItem));
        } else {
            // 장바구니가 비어 있을 경우
            const emptyMessage = document.createElement('p');
            emptyMessage.textContent = '장바구니에 제품이 없습니다.';
            cartContainer.replaceChildren(emptyMessage);
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

