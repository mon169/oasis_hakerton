import { storage, database, ref, set, push, storageRef, uploadBytes, getDownloadURL } from './firebase.js';
import { getAllProducts, saveProductData } from './firebase.js';

document.addEventListener('DOMContentLoaded', function() {
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

            //이미지를 Firebase Storage에 업로드
            const imageRef = storageRef(storage, `products/${Date.now()}_${imageFile.name}`);
            uploadBytes(imageRef, imageFile).then((snapshot) => {
                return getDownloadURL(snapshot.ref);
            }).then((imageUrl) => {
                const product = { name, price, image: imageUrl, description };

                // 데이터베이스에 저장
                return saveProductData(product)
            }).then((productId) => {
                console.log('Product saved with ID:', productId);
                alert('상품이 성공적으로 등록되었습니다!');
                loadProducts(); // 등록 후 모든 상품을 다시 로드하여 웹에 표시
            })
            .catch((error) => {
                console.error('Error submitting product:', error);
                alert('상품 등록에 실패했습니다.');
            });
        });
    }

    // 페이지 로드 시 기존 상품을 불러와 표시
    loadProducts();

    //데이터베이스에서 불러오기
    function loadProducts() {
        getAllProducts()
            .then((products) => {
            const container = document.querySelector('#productList'); // 상품 목록을 표시할 컨테이너 요소
            if (container) {
                container.innerHTML = products.map(product => `
                <div class="col mb-5">
                    <div class="card h-100">
                    <img class="card-img-top product-image" src="${product.image}" alt="${product.name}"/>
                    <div class="card-body p-4">
                        <h5 class="product-name">${product.name}</h5>  
                        <span class="product-price">${product.price}</span>     
                    </div>
                    <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                        <div class="text-center">
                        <a class="btn btn-outline-dark mt-auto" href="#" data-bs-toggle="modal" data-bs-target="#productModal" data-name="${product.name}" data-price="${product.price}" data-image="${product.image}" data-description="${product.description}">상세정보 확인</a>
                        </div> 
                    </div>     
                    </div>
                </div>
                `).join('');
            } else {
                console.error('Product list container not found.');
            }
            })
            .catch((error) => {
            console.error('Error loading products:', error);
            });
        }
    });