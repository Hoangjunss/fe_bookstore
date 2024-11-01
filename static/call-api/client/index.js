    document.addEventListener("DOMContentLoaded", () => {
        fetchProducts();
    });

    /**
     * Hàm lấy danh sách sản phẩm từ API và hiển thị chúng trên trang
     */
    async function fetchProducts() {
        try {
            const response = await fetch('http://localhost:8080/api/v1/productsales?page=0&size=12', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    // Thêm các header cần thiết nếu có, ví dụ: Authorization
                }
            });

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            const productPage = await response.json();
            const products = productPage.content;

            renderProducts(products);
            renderTrendingProducts(products);
            renderYouMayLikeProducts(products);
        } catch (error) {
            console.error('Error fetching products:', error);
            alert('Có lỗi xảy ra khi tải danh sách sản phẩm.');
        }
    }

    /**
     * Hàm hiển thị danh sách sản phẩm trong mục "Products"
     * @param {Array} products - Danh sách sản phẩm
     */
    function renderProducts(products) {
        const productsContainer = document.getElementById("productsContainer");
        productsContainer.innerHTML = ""; // Xóa nội dung hiện tại

        if (products.length === 0) {
            productsContainer.innerHTML = "<p class='text-center'>Không có sản phẩm nào để hiển thị.</p>";
            return;
        }

        products.forEach(productSale => {
            const product = productSale.product;
            const productId = productSale.id;
            const productName = product.name || 'Tên sản phẩm';
            const salePrice = productSale.price || 0;
            const thumbnail = product.image ? product.image.url : '../../static/client_assets/img/gallery/sample_product_thumbnail.jpg';

            const formattedPrice = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(salePrice);

            const productHTML = `
                <div class="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                    <div class="single-items mb-20">
                        <div class="items-img">
                            <img src="${thumbnail}" alt="${productName}">
                        </div>
                        <div class="items-details">
                            <h4><a href="product-details.php?id=${productId}">${productName}</a></h4>
                            <p>${formattedPrice}</p>
                            <a href="product-details.php?id=${productId}" class="browse-btn">Shop Now</a>
                            <a href="javascript:void(0);" class="add-to-cart-link" onclick="addToCart(${productId})">Add to Cart</a>
                        </div>
                    </div>
                </div>
            `;

            productsContainer.insertAdjacentHTML('beforeend', productHTML);
        });
    }

    /**
     * Hàm hiển thị danh sách sản phẩm trong mục "Trending This Week"
     * @param {Array} products - Danh sách sản phẩm
     */
    function renderTrendingProducts(products) {
        const trendingContainer = document.getElementById("trendingProducts");
        trendingContainer.innerHTML = ""; // Xóa nội dung hiện tại

        if (products.length === 0) {
            trendingContainer.innerHTML = "<p class='text-center'>Không có sản phẩm nào để hiển thị.</p>";
            return;
        }

        products.forEach(productSale => {
            const product = productSale.product;
            const productId = productSale.id;
            const productName = product.name || 'Tên sản phẩm';
            const salePrice = productSale.price || 0;
            const thumbnail = product.image ? product.image.url : '../../static/client_assets/img/gallery/sample_product_thumbnail.jpg';

            const formattedPrice = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(salePrice);

            const trendingHTML = `
                <div class="properties pb-30">
                    <div class="properties-card">
                        <div class="properties-img">
                            <a href="product-details.php?id=${productId}">
                                <img src="${(thumbnail)}" alt="${productName}" style="max-width: 100%; max-height: 100%;">
                            </a>
                            <div class="socal_icon">
                                <a href="javascript:void(0);" class="add-to-cart-link" onclick="addToCart(${productId})"><i class="ti-shopping-cart"></i></a>
                            </div>
                        </div>
                        <div class="properties-caption properties-caption2">
                            <h3><a href="product-details.php?id=${productId}">${productName}</a></h3>
                            <div class="properties-footer">
                                <div class="price">
                                    <span>${formattedPrice}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            trendingContainer.insertAdjacentHTML('beforeend', trendingHTML);
        });
    }

    /**
     * Hàm hiển thị danh sách sản phẩm trong mục "You May Like"
     * @param {Array} products - Danh sách sản phẩm
     */
    function renderYouMayLikeProducts(products) {
        const youMayLikeContainer = document.getElementById("youMayLikeProducts");
        youMayLikeContainer.innerHTML = ""; // Xóa nội dung hiện tại

        if (products.length === 0) {
            youMayLikeContainer.innerHTML = "<p class='text-center'>Không có sản phẩm nào để hiển thị.</p>";
            return;
        }

        products.forEach(productSale => {
            const product = productSale.product;
            const productId = productSale.id;
            const productName = product.name || 'Tên sản phẩm';
            const salePrice = productSale.price || 0;
            const thumbnail = product.image ? product.image.url : '../../static/client_assets/img/gallery/sample_product_thumbnail.jpg';

            const formattedPrice = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(salePrice);

            const youMayLikeHTML = `
                <div class="properties pb-30">
                    <div class="properties-card">
                        <div class="properties-img">
                            <a href="product-details.php?id=${productId}">
                                <img src="${(thumbnail)}" alt="${productName}" style="max-width: 100%; max-height: 100%;">
                            </a>

                            <div class="socal_icon">
                                <a href="javascript:void(0);" class="add-to-cart-link" onclick="addToCart(${productId})"><i class="ti-shopping-cart"></i></a>
                                <a href="#"><i class="ti-heart"></i></a>
                                <a href="#"><i class="ti-zoom-in"></i></a>
                            </div>
                        </div>
                        <div class="properties-caption properties-caption2">
                            <h3><a href="product-details.php?id=${productId}">${productName}</a></h3>
                            <div class="properties-footer">
                                <div class="price">
                                    <span>${formattedPrice}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            youMayLikeContainer.insertAdjacentHTML('beforeend', youMayLikeHTML);
        });
    }

    /**
     * Hàm thêm sản phẩm vào giỏ hàng
     * @param {Number} productSaleId - ID của sản phẩm sale
     */
    async function addToCart(productSaleId) {
        if (!productSaleId) {
            alert('Không xác định được sản phẩm để thêm vào giỏ hàng.');
            return;
        }
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Bạn chưa đăng nhập. Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/api/v1/cart-details', { // Điều chỉnh URL theo cấu hình backend của bạn
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    id: null, // ID sẽ do hệ thống tự tạo
                    quantity: 1, // Số lượng mặc định là 1
                    productSaleId: productSaleId
                    
                })
            });

            if (!response.ok) {
                const contentType = response.headers.get("content-type");
                if (contentType && contentType.includes("application/json")) {
                    // Nếu là JSON, phân tích và xử lý lỗi thông thường
                    const errorData = await response.json();
                    if (errorData.message === 'Invalid quantity') {
                        alert('Sản phẩm đã hết hàng.');
                    } else {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                } else {
                    // Nếu không phải JSON, đọc phản hồi dạng text
                    const errorText = await response.text();
                    if (errorText === 'Invalid quantity') {
                        alert('Sản phẩm đã hết hàng.');
                    } else {
                        alert(`Lỗi xảy ra: ${errorText}`);
                    }
                }
                return;
            }

            const addedCartDetail = await response.json();
            alert('Đã thêm sản phẩm vào giỏ hàng thành công!');
            // Cập nhật biểu tượng giỏ hàng nếu cần
        } catch (error) {
            console.error('Error adding to cart:', error);
            alert('Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng.');
        }
    }