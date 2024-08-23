import { getAllProducts } from './firebase.js';

document.addEventListener('DOMContentLoaded', function() {
    const pageId = document.body.id;
    const container = document.querySelector('#productList');
    const regionSelect = document.getElementById('regionSelect'); 

    const modal = document.getElementById('productModal');
    const addToCartButton = modal.querySelector('.btn-primary');

    if (regionSelect) {
        regionSelect.addEventListener('change', function() {
            const selectedRegion = regionSelect.value;
            loadProducts(pageId, selectedRegion); // 선택된 지역으로 데이터 로드
        });
    } else {
        console.error('Region select element not found.');
    }
    // 페이지 로드 시 기본 데이터 로드
    const defaultRegion = '전남';
    loadProducts(pageId, defaultRegion);

    // 모달이 표시될 때 제품 정보를 설정
    modal.addEventListener('show.bs.modal', function(event) {
        const button = event.relatedTarget;
        const name = button.getAttribute('data-name');
        const price = button.getAttribute('data-price');
        const image = button.getAttribute('data-image');
        const description = button.getAttribute('data-description');

        modal.querySelector('#modalProductImage').src = image;
        modal.querySelector('#modalProductName').textContent = name;
        modal.querySelector('#modalProductPrice').textContent = price;
        modal.querySelector('#modalProductDescription').innerHTML = description;
    });

    // 장바구니 추가 버튼 클릭 시
    if (addToCartButton) {
        addToCartButton.addEventListener('click', function() {
            const name = modal.querySelector('#modalProductName').textContent;
            const price = modal.querySelector('#modalProductPrice').textContent;
            const image = modal.querySelector('#modalProductImage').src;
            const description = modal.querySelector('#modalProductDescription').textContent;

            const product = { name, price, image, description };
            console.log('Adding to cart:', product);
            alert('장바구니에 추가되었습니다!');

            // 장바구니에 제품 추가 (로컬 저장소 사용 예시)
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart.push(product);
            localStorage.setItem('cart', JSON.stringify(cart));
        });
    } else {
        console.error('Add to Cart button not found.');
    }
    
        if (container) {
            loadProducts(pageId, container); // pageId와 container를 인자로 전달
        } else {
            console.error('Container not found for:', pageId);
        }
    
     //데이터베이스에서 불러오기
     function loadProducts(pageId, region) {
             const path = region ? `gift/${region}` : pageId;

             if (!container) {
                console.error('Product list container not found.');
                return;
            }

             if (typeof path !== 'string' || path.includes('[object HTMLDivElement]')) {
                console.error('Invalid path detected:', path);
                return;
            }

             getAllProducts(path, (products) => {
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
             });
         }
    })
 


    