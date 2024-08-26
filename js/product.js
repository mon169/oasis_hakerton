import { getAllProducts, updateUserPoints, db, doc, updateDoc, getDoc, auth } from './firebase.js';

document.addEventListener('DOMContentLoaded', function() {
    const pageId = document.body.id;
    const container = document.querySelector('#productList');
    const regionSelect = document.getElementById('regionSelect'); 

    const modal = document.getElementById('productModal');
    const addToCartButton = modal.querySelector('.btn-primary');
    const purchaseModal = document.getElementById('purchaseModal');

    const usePointsButton = document.getElementById('usePointsButton');
    const finalPriceElement = document.getElementById('finalPrice');
    const mileageInput = document.getElementById('mileage');
    const finalPurchaseButton = document.getElementById('finalPurchaseButton');

    let productPrice = 0; // 초기값 설정

    // 지역 선택 시 해당 지역 제품 로드
    if (regionSelect) {
        regionSelect.addEventListener('change', function() {
            const selectedRegion = regionSelect.value;
            loadProducts(pageId, selectedRegion); 
        });
    } 

    // 페이지 로드 시 기본 데이터 로드
    if (pageId === 'gift') {
        const defaultRegion = '전남';
        loadProducts(pageId, defaultRegion);
    } else {
        loadProducts(pageId);
    }

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

    // purchaseModal 설정
    purchaseModal.addEventListener('show.bs.modal', function(event) {
        const button = event.relatedTarget;
        const name = button.getAttribute('data-name');
        const price = button.getAttribute('data-price');
        productPrice = parseFloat(button.getAttribute('data-price')); // 상품 가격을 직접 파싱

        purchaseModal.querySelector('.modalProductName').textContent = name;
        purchaseModal.querySelector('.modalProductPrice').textContent = `상품 금액: ${price}`;
        finalPriceElement.textContent = `결제 금액: ${productPrice}`; // 모달 열 때 초기 결제 금액 설정
    });

    // 마일리지 사용 버튼 클릭 시
    if (usePointsButton) {
        usePointsButton.addEventListener('click', function() {
            const mileage = parseFloat(mileageInput.value) || 0;
            const finalPrice = Math.max(productPrice - mileage, 0); // 상품 가격에서 마일리지를 차감, 최소 0으로 설정

            finalPriceElement.textContent = `결제 금액: ${finalPrice}`;
        });
    } else {
        console.error('Use Points button not found.');
    }

     // 최종 구매 버튼 클릭 시
     if (finalPurchaseButton) {
        finalPurchaseButton.addEventListener('click', async function() {
            const usedMileage = parseFloat(mileageInput.value) || 0;

            try {
                const user = auth.currentUser; // 현재 로그인한 사용자 가져오기
                if (!user) {
                    alert('로그인 후 구매해 주세요.');
                    return;
                }

                const userRef = doc(db, "users", user.uid);
                const userDoc = await getDoc(userRef);
                
                if (userDoc.exists()) {
                    const currentPoints = userDoc.data().points;

                    if (usedMileage <= currentPoints) {
                        // 포인트를 차감하고 데이터베이스에 업데이트
                        const newPoints = currentPoints - usedMileage;
                        await updateUserPoints(user.uid, newPoints);

                        alert('구매가 완료되었습니다! 남은 마일리지: ' + newPoints);
                        loadUserPoints();

                        // 모달 닫기
                        const purchaseModalInstance = bootstrap.Modal.getInstance(purchaseModal);
                        if (purchaseModalInstance) {
                            purchaseModalInstance.hide();
                        }
                    } else {
                        alert('사용할 마일리지가 부족합니다.');
                    }
                } else {
                    console.error('User document not found.');
                }
            } catch (error) {
                console.error('Error updating points:', error);
            }
        });
    } else {
        console.error('Final purchase button not found.');
    }

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
            let path;

            if (pageId === 'gift' && region) {
                path = `gift/${region}`; // gift 페이지에서는 region을 사용해 경로 설정
            } else {
                path = pageId; // ecoProducts와 localFood는 pageId만 사용
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
                             <a class="btn btn-primary purchase-button" data-bs-toggle="modal" data-bs-target="#purchaseModal" data-name="${product.name}" data-price="${product.price}">구매</a>
                             </div> 
                         </div>     
                         </div>
                     </div>
                     `).join('');
                 }
            });
        }
    });
    


    


    