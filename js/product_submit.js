import { auth, storage, storageRef, uploadBytes, getDownloadURL } from './firebase.js';
import { getAllProducts, saveProductData } from './firebase.js';

document.addEventListener('DOMContentLoaded', function() {
    const pageId = document.body.id;
    const container = document.querySelector(`#${pageId} .row`); // 페이지의 .row 요소 선택

    const modal = document.getElementById('submitModal');
    const submitProductButton = modal.querySelector('.btn-primary');


    if(submitProductButton) {
        submitProductButton.addEventListener('click', function(event) {
            event.preventDefault(); // 기본 제출 동작 막기

            const name = document.querySelector('#productName').value;
            const price = document.querySelector('#productPrice').value;
            const imageFile = document.querySelector('#productImage').files[0];
            const description = document.querySelector('#productDescription').value;
            
            if (!name || !price || !imageFile || !description) {
                alert('모든 항목을 입력해주세요.');
                return;
            }

            const user = auth.currentUser;
            if (!user) {
                alert('로그인 후 상품을 등록해 주세요.');
                return;
            }

            //이미지를 Firebase Storage에 업로드
            const imageRef = storageRef(storage, `products/${pageId}/${user.uid}/${Date.now()}_${imageFile.name}`);
            uploadBytes(imageRef, imageFile).then((snapshot) => {
                return getDownloadURL(snapshot.ref);
            }).then((imageUrl) => {
                const product = { name, price, image: imageUrl, description };

                // 데이터베이스에 저장
                return saveProductData(pageId, product)
            }).then((productId) => {
                console.log('Product saved with ID:', productId);
                alert('상품이 성공적으로 등록되었습니다!');
                loadProducts(pageId);
            })
            .catch((error) => {
                console.error('Error submitting product:', error);
                alert('상품 등록에 실패했습니다.');
            });
        });
    }

    // 페이지 로드 시 기존 상품을 불러와 표시
    loadProducts(pageId);

    function createProductCard(product) {
            const name = product.name || '';
            const price = product.price || '';
            const image = product.image || '';
            const description = product.description || '';

            const col = document.createElement('div');
            col.className = 'col mb-5';

            const card = document.createElement('div');
            card.className = 'card h-100';

            const img = document.createElement('img');
            img.className = 'card-img-top product-image';
            img.src = image;
            img.alt = name;

            const body = document.createElement('div');
            body.className = 'card-body p-4';

            const title = document.createElement('h5');
            title.className = 'product-name';
            title.textContent = name;

            const priceElement = document.createElement('span');
            priceElement.className = 'product-price';
            priceElement.textContent = price;

            const footer = document.createElement('div');
            footer.className = 'card-footer p-4 pt-0 border-top-0 bg-transparent';

            const actions = document.createElement('div');
            actions.className = 'text-center';

            const detailButton = document.createElement('a');
            detailButton.className = 'btn btn-outline-dark mt-auto';
            detailButton.href = '#';
            detailButton.setAttribute('data-bs-toggle', 'modal');
            detailButton.setAttribute('data-bs-target', '#productModal');
            detailButton.dataset.name = name;
            detailButton.dataset.price = price;
            detailButton.dataset.image = image;
            detailButton.dataset.description = description;
            detailButton.textContent = '상세정보 확인';

            body.append(title, priceElement);
            actions.appendChild(detailButton);
            footer.appendChild(actions);
            card.append(img, body, footer);
            col.appendChild(card);

            return col;
        }

    //데이터베이스에서 불러오기
    function loadProducts(pageId) {
            const container = document.querySelector('#productList'); // 상품 목록을 표시할 컨테이너 요소
            getAllProducts(pageId, (products) => {
                if (container) {
                    container.replaceChildren(...products.map(createProductCard));
                } else {
                    console.error('Product list container not found.');
                }
            });
        }
    });
