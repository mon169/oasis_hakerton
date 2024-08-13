document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('productModal');
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

    
    const products = {
        localFood: [
            {
                name: "[고구마] 24년 8월 토종 햇 밤고구마 2kg 3kg 5kg",
                price: "8,900원~",
                image: "image/product_image/고구마.png",
                description: ` 
                    2kg - 8,900<br>
                    3kg - 12,500<br>
                    4kg - 16,000<br><br>

                    익산 황토 밤고구마 옵션 선택!<br>
                    24년 8월에 직접 수확한 신선한 토종 햇 밤고구마입니다.<br>
                    구매 문의 010-1234-5678
                    `
            },
            {   
                name: "[새송이 버섯] 장성군 무농약 새송이 버섯 400g",
                price: "2,600원",
                image: "image/product_image/새송이버섯.png",
                description: `
                    제품 설명
                `
            },
            {
                name: "[당근] 순천시 낙안면 유기농 노지 흙 당근 (주스 이유식 즙용)",
                price: "7,000원~",
                image: "image/product_image/당근.png",
                description: `
                    제품 설명
                `
            }
        ],
        ecoProducts: [
            {
                name: "[수세미] 천연 식물수세미 주방스펀지",
                price: "2,000원",
                image: "image/product_image/수세미.png",
                description: `
                    제품설명
                `
            },
            {
                name: "[홈키트] 제로웨이스트 홈 키트 선물 세트",
                price: "12,000원",
                image: "image/product_image/홈키트.png",
                description: `
                    제품설명
                `
            },
            {
                name: "[봉투] 친환경 비닐봉투(생분해)",
                price: "1,900원~",
                image: "image/product_image/비닐봉투.png",
                description: `
                    제품설명
                `
            }
        ],
        gift: [
            {
            }
        ]
    };

        const pageId = document.body.id; // 현재 페이지의 id를 가져옴
        const container = document.querySelector(`#${pageId} .row`); // 페이지의 .row 요소 선택
        
        console.log('Page ID:', pageId); // 페이지 ID 확인
    
        if (container) {
            loadProducts(pageId, container); // pageId와 container를 인자로 전달
        } else {
            console.error('Container not found for:', pageId);
        }
    

    function loadProducts(page, container) {
        // 제품 카드 생성
        const productList = products[page];

        if (productList) {
            container.innerHTML = productList.map(product => `
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
            console.error('Container not found for:', pageId);
        }
    }
});  
 
