document.addEventListener("DOMContentLoaded", () => {
    fetchProducts();
    //updateCartCount(); // Cập nhật số lượng giỏ hàng khi trang được tải
    fetchCategoriesAndDisplayTabs();
    const profileLink = document.querySelector('a[href="/profile.php"]');
    const cartLink = document.querySelector('a[href="cart.php"]');
    
    function checkAuthAndRedirect(link, targetUrl) {
        const token = localStorage.getItem('token');
        if (token) {
            window.location.href = targetUrl;
        } else {
            showNotification('Vui lòng đăng nhập để truy cập trang này.', 'error');
        }
    }

    profileLink.addEventListener("click", function(event) {
        event.preventDefault();  // Ngăn chặn chuyển hướng mặc định
        checkAuthAndRedirect(profileLink, "/profile.php");
    });

    cartLink.addEventListener("click", function(event) {
        event.preventDefault();  // Ngăn chặn chuyển hướng mặc định
        checkAuthAndRedirect(cartLink, "cart.php");
    });

    updateAuthButton();
});

function updateAuthButton() {
    const authButtonContainer = document.getElementById("auth-button");
    const token = localStorage.getItem('token');

    if (token) {
        // Nếu có token, hiển thị nút Logout
        authButtonContainer.innerHTML = `
            <a href="javascript:void(0);" id="logout-button">
                    <i class="btn btn-light"> Logout</i>
                </a>
        `;

        // Xử lý sự kiện đăng xuất
        document.getElementById("logout-button").addEventListener("click", function() {
            localStorage.removeItem('token');  // Xóa token
            alert("Đã đăng xuất thành công.");
            updateAuthButton();  // Cập nhật nút
        });
    } else {
        // Nếu không có token, hiển thị nút Login
        authButtonContainer.innerHTML = `
            <a href="auth/login.php" id="login-button">
                    <i class="btn btn-light">Login</i>
                </a>
        `;

        // Xử lý sự kiện đăng nhập (chuyển hướng tới trang đăng nhập)
        document.getElementById("login-button").addEventListener("click", function(event) {
            event.preventDefault();  // Ngăn chặn chuyển hướng mặc định
            window.location.href = "auth/login.php";
        });
    }
}


/**
 * Hàm hiển thị thông báo
 * @param {string} message - Thông điệp thông báo
 * @param {string} type - Loại thông báo: 'success', 'error', 'info'
 */
function showNotification(message, type = 'info') {
    const notificationContainer = document.getElementById('notification-container');

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="close-btn">&times;</button>
    `;

    notificationContainer.appendChild(notification);

    // Cho phép CSS animate
    setTimeout(() => {
        notification.classList.add('show');
    }, 100); // Delay nhỏ để cho phép DOM cập nhật

    // Tự động ẩn sau 3 giây
    setTimeout(() => {
        notification.classList.remove('show');
        // Xóa phần tử sau khi animation kết thúc
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 3000);

    // Thêm sự kiện đóng khi nhấp vào nút close
    notification.querySelector('.close-btn').addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 500);
    });
}

/**
 * Hàm lấy danh sách sản phẩm từ API và hiển thị chúng trên trang
 */
async function fetchProducts() {
    try {
        const response = await fetch('http://localhost:8080/api/v1/product?page=0&size=12', {
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
        showNotification('Có lỗi xảy ra khi tải danh sách sản phẩm.', 'error');
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
        const productSaleId = productSale.id; // Sử dụng id của productSale
        const productName = productSale.name || 'Tên sản phẩm';
        const salePrice = productSale.price || 0;
        const thumbnail = productSale.image ? productSale.image : '../../static/client_assets/img/gallery/sample_product_thumbnail.jpg';

        const formattedPrice = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(salePrice);

        const productHTML = `
            <div class="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                <div class="single-items mb-20">
                    <div class="items-img">
                        <img src="${thumbnail}" alt="${productName}" class="cart-product-image">
                    </div>
                    <div class="items-details">
                        <h4><a href="product-details.php?id=${productSaleId}">${productName}</a></h4>
                        <p>${formattedPrice}</p>
                        <a href="product-details.php?id=${productSaleId}" class="browse-btn">Shop Now</a>
                        <a href="javascript:void(0);" class="add-to-cart-link" onclick="addToCart(${productSaleId})" style="padding: 10px 15px;">Add to Cart</a>
                    </div>
                </div>
            </div>
        `;

        productsContainer.insertAdjacentHTML('beforeend', productHTML);
    });
}

/**
 * Hàm lấy danh sách danh mục từ API và hiển thị chúng dưới dạng tab
 */
async function fetchCategoriesAndDisplayTabs() {
    
    try {
        const response = await fetch("http://localhost:8080/api/v1/category", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
        });
        
        const categories = await response.json();
        
        const navTab = document.getElementById("nav-tab");
        categories.forEach((category, index) => {
            const isActive = index === 0 ? "active" : ""; // Đánh dấu tab đầu tiên là active
            const tab = document.createElement("a");
            tab.className = `nav-link ${isActive}`;
            tab.id = `nav-${category.id}-tab`;
            tab.setAttribute("data-bs-toggle", "tab");
            tab.href = `#category-${category.id}`;
            tab.role = "tab";
            tab.setAttribute("aria-controls", `category-${category.id}`);
            tab.setAttribute("aria-selected", isActive === "active");
            tab.innerText = category.name;

            tab.addEventListener("click", () => fetchProductsByCategory(category.id));
            navTab.appendChild(tab);
        });

        // Gọi lần đầu tiên để hiển thị sản phẩm của tab đầu tiên
        if (categories.length > 0) {
            fetchProductsByCategory(categories[0].id);
        }
    } catch (error) {
        console.error("Error fetching categories:", error);
    }
}


async function fetchProductsByCategory(categoryId) {
    try {
        const response = await fetch(`http://localhost:8080/api/v1/product?categoryId=${categoryId}&page=0&size=12`);
        const productPage = await response.json();
        renderTrendingProducts(productPage.content);
    } catch (error) {
        console.error("Error fetching products:", error);
    }
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

    const trendingProducts = products.slice(0, 3); // Lấy 3 sản phẩm đầu tiên làm trending

    trendingProducts.forEach(productSale => {
        const product = productSale.product;
        const productSaleId = productSale.id; // Sử dụng id của productSale
        const productName = productSale.name || 'Tên sản phẩm';
        const salePrice = productSale.price || 0;
        const thumbnail = productSale.image ? productSale.image : '../../static/client_assets/img/gallery/sample_product_thumbnail.jpg';

        const formattedPrice = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(salePrice);

        const trendingHTML = `
            <div class="properties pb-30">
                <div class="properties-card">
                    <div class="properties-img">
                        <a href="product-details.php?id=${productSaleId}">
                            <img src="${thumbnail}" alt="${productName}" style="max-width: 100%; max-height: 100%; width: 350px;height: 300px;">
                        </a>
                        <div class="socal_icon">
                            <a href="javascript:void(0);" class="add-to-cart-link" onclick="addToCart(${productSaleId})"><i class="ti-shopping-cart"></i></a>
                        </div>
                    </div>
                    <div class="properties-caption properties-caption2">
                        <h3><a href="product-details.php?id=${productSaleId}">${productName}</a></h3>
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

    const youMayLikeProducts = products.slice(-4); // Lấy 4 sản phẩm cuối cùng làm "You May Like"

    youMayLikeProducts.forEach(productSale => {
        const product = productSale.product;
        const productSaleId = productSale.id; // Sử dụng id của productSale
        const productName = productSale.name || 'Tên sản phẩm';
        const salePrice = productSale.price || 0;
        const thumbnail = productSale.image ? productSale.image : '../../static/client_assets/img/gallery/sample_product_thumbnail.jpg';

        const formattedPrice = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(salePrice);

        const youMayLikeHTML = `
            <div class="properties pb-30">
                <div class="properties-card">
                    <div class="properties-img">
                        <a href="product-details.php?id=${productSaleId}">
                            <img src="${thumbnail}" alt="${productName}" style="max-width: 100%; max-height: 100%; width: 350px;height: 300px;">
                        </a>

                        <div class="socal_icon">
                            <a href="javascript:void(0);" class="add-to-cart-link" onclick="addToCart(${productSaleId})"><i class="ti-shopping-cart"></i></a>
                            <a href="#"><i class="ti-heart"></i></a>
                            <a href="#"><i class="ti-zoom-in"></i></a>
                        </div>
                    </div>
                    <div class="properties-caption properties-caption2">
                        <h3><a href="product-details.php?id=${productSaleId}">${productName}</a></h3>
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
        showNotification('Không xác định được sản phẩm để thêm vào giỏ hàng.', 'error');
        return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
        showNotification('Bạn chưa đăng nhập. Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.', 'error');
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
                    showNotification('Sản phẩm đã hết hàng.', 'error');
                } else {
                    showNotification(`Lỗi: ${errorData.message}`, 'error');
                }
            } else {
                // Nếu không phải JSON, đọc phản hồi dạng text
                const errorText = await response.text();
                if (errorText === 'Invalid quantity') {
                    showNotification('Sản phẩm đã hết hàng.', 'error');
                } else {
                    showNotification(`Lỗi xảy ra: ${errorText}`, 'error');
                }
            }
            return;
        }

        const addedCartDetail = await response.json();
        showNotification('Đã thêm sản phẩm vào giỏ hàng thành công!', 'success');
        // Cập nhật biểu tượng giỏ hàng nếu cần
        //updateCartCount();
    } catch (error) {
        console.error('Error adding to cart:', error);
        showNotification('Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng.', 'error');
    }
}

/**
 * Hàm cập nhật số lượng sản phẩm trong giỏ hàng hiển thị trên biểu tượng giỏ hàng
 */
async function updateCartCount() {
    const token = localStorage.getItem('token');
    if (!token) {
        return; // Nếu chưa đăng nhập, không cần cập nhật
    }

    try {
        const response = await fetch('http://localhost:8080/api/v1/cart-details', { // Điều chỉnh URL theo cấu hình backend của bạn
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const cart = await response.json();
        const cartDetails = cart.cartDetails || [];
        const cartCount = cartDetails.reduce((sum, item) => sum + item.quantity, 0);

        // Kiểm tra xem đã có phần tử .cart-count chưa
        let cartCountElement = document.querySelector('.cart-count');
        if (cartCountElement) {
            cartCountElement.textContent = cartCount;
        } else {
            // Nếu chưa, tạo phần tử và thêm vào trong .cart
            const cartIcon = document.querySelector('.cart a');
            const newCartCount = document.createElement('span');
            newCartCount.className = 'cart-count';
            newCartCount.textContent = cartCount;
            cartIcon.appendChild(newCartCount);
        }
    } catch (error) {
        console.error('Error updating cart count:', error);
        // Bạn có thể thêm thông báo lỗi nếu muốn
    }
}
