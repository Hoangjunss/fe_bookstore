document.addEventListener("DOMContentLoaded", function () {
    const productContainer = document.getElementById('productContainer');
    const categorySelect = document.getElementById('category');
    const filterForm = document.getElementById('filterForm');
    const paginationUl = document.getElementById('pagination');
    const userGreeting = document.getElementById('user-greeting');
    const searchForm = document.getElementById('searchForm');
    const cartLink = document.querySelector('a[href="cart.php"]');
    
    let currentPage = 0;
    const pageSize = 12; 

    // Cập nhật nút Auth
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
                fetchUserInfo(); // Cập nhật thông tin người dùng
                updateCartCount(); // Cập nhật số lượng giỏ hàng
            });
        } else {
            // Nếu không có token, hiển thị nút Login
            authButtonContainer.innerHTML = `
                <a href="../auth/login.php" id="login-button">
                        <i class="btn btn-light">Login</i>
                    </a>
            `;
    
            // Xử lý sự kiện đăng nhập (chuyển hướng tới trang đăng nhập)
            document.getElementById("login-button").addEventListener("click", function(event) {
                event.preventDefault();  // Ngăn chặn chuyển hướng mặc định
                window.location.href = "../auth/login.php";
            });
        }
    }

    // Hàm để cập nhật dropdown danh mục
    function populateCategoryDropdown(categories) {
        categorySelect.innerHTML = '<option value="0">Loại sản phẩm</option>'; // Reset dropdown
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.id; // Giá trị là ID danh mục
            option.textContent = category.name; // Tên hiển thị là tên danh mục
            categorySelect.appendChild(option);
        });
    }

    // Hàm để lấy và hiển thị danh sách danh mục từ API sử dụng async/await
    async function fetchCategories() {
        try {
            const response = await fetch("http://localhost:8080/api/v1/category");
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            
            const categories = await response.json();
            populateCategoryDropdown(categories);
        } catch (error) {
            console.error("Error fetching categories:", error);
            showNotification("Có lỗi xảy ra khi tải danh sách danh mục.", "error");
        }
    }

    // Hàm để lấy và hiển thị sản phẩm sử dụng async/await
    async function fetchProducts(page = 0, categoryId = null) { 
        currentPage = page; // Cập nhật trang hiện tại

        // Lấy giá trị từ form lọc
        const productName = document.getElementById('productName').value.trim();
        const saleStartPrice = document.getElementById('saleStartPrice').value;
        const saleEndPrice = document.getElementById('saleEndPrice').value;

        if (saleStartPrice < 0) {
            alert("Giá bán thấp nhất không được bé hơn 0.");
            document.getElementById('saleStartPrice').value = '';
            return;
        }
        if (saleEndPrice && saleEndPrice < saleStartPrice) {
            alert("Giá bán đến thấp nhất phải lớn hơn hoặc bằng giá bán từ.");
            document.getElementById('saleEndPrice').value = '';
            return;
        }

        console.log('Fetching products:', page, pageSize);

        // Xây dựng URL với các tham số query
        let url = `http://localhost:8080/api/v1/productsales?page=${page}&size=${pageSize}`;

        if (productName) url += `&title=${encodeURIComponent(productName)}`; // Sửa từ 'name' thành 'title'
        if (categoryId && categoryId !== '0') url += `&categoryId=${categoryId}`;
        if (saleStartPrice) url += `&saleStartPrice=${saleStartPrice}`;
        if (saleEndPrice) url += `&saleEndPrice=${saleEndPrice}`;

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            const data = await response.json();
            console.log(data);
            displayProducts(data.content);
            setupPagination(data.totalPages, data.number);
        } catch (error) {
            console.error('Error fetching products:', error);
            showNotification('Có lỗi xảy ra khi tải danh sách sản phẩm.', 'error');
        }
    }

    // Hàm để hiển thị sản phẩm
    function displayProducts(products) {
        productContainer.innerHTML = ''; // Xóa danh sách cũ

        if (products.length === 0) {
            productContainer.innerHTML = '<p class="text-center">Không tìm thấy sản phẩm nào.</p>';
            return;
        }

        products.forEach(productSale => {
            console.log("ProductSale:", productSale);
            console.log("Product:", productSale.product);

            const product = productSale.product;

            // Kiểm tra xem product có tồn tại không
            if (!product) {
                console.warn(`ProductSale với ID ${productSale.id} không có thuộc tính 'product'.`);
                // Bạn có thể hiển thị một thông báo hoặc bỏ qua sản phẩm này
                productContainer.innerHTML += `<p class='text-center'>Dữ liệu sản phẩm không hợp lệ.</p>`;
                return; // Bỏ qua phần tiếp theo của vòng lặp
            }

            const col = document.createElement('div');
            col.className = 'col-lg-4 col-md-6 col-sm-6';
            col.innerHTML = `
                <div class="single-items mb-30">
                    <div class="thumb">
                        <a href="product-details.php?id=${productSale.id}">
                            <img style="width: 100%; height: 250px; object-fit: cover;" src="${product.image ? product.image.url : 'https://via.placeholder.com/350x300?text=No+Image'}" alt="${product.name}">
                        </a>
                        <div class="actions">
                            <button class="add-to-cart-link" data-id="${productSale.id}">Add to Cart</button>
                        </div>
                    </div>
                    <div class="content text-center">
                        <h4 class="product-title"><a href="product-details.php?id=${productSale.id}">${product.name}</a></h4>
                        <p class="author">Tác giả: ${product.author}</p>
                        <p class="price">${formatPrice(productSale.price)} VND</p>
                    </div>
                </div>
            `;
            productContainer.appendChild(col);
        });

        // Thêm sự kiện cho các nút "Add to Cart"
        document.querySelectorAll('.add-to-cart-link').forEach(button => {
            button.addEventListener('click', function () {
                const productId = this.getAttribute('data-id');
                addToCart(productId);
            });
        });
    }

    // Hàm để thiết lập phân trang với các nút "Previous" và "Next"
    function setupPagination(totalPages, currentPageIndex) {
        paginationUl.innerHTML = ''; // Xóa phân trang cũ

        // Nếu không có trang nào, ẩn phân trang
        if (totalPages === 0) {
            paginationUl.style.display = 'none';
            return;
        } else {
            paginationUl.style.display = 'flex';
        }

        // Nút "Previous"
        const prevLi = document.createElement('li');
        prevLi.className = `page-item ${currentPageIndex === 0 ? 'disabled' : ''}`;
        prevLi.innerHTML = `<a class="page-link" href="#">Previous</a>`;
        prevLi.addEventListener('click', function (e) {
            e.preventDefault();
            if (currentPageIndex > 0) {
                fetchProducts(currentPageIndex - 1);
            }
        });
        paginationUl.appendChild(prevLi);

        // Các nút trang
        for (let i = 0; i < totalPages; i++) {
            const li = document.createElement('li');
            li.className = `page-item ${i === currentPageIndex ? 'active' : ''}`;
            li.innerHTML = `<a class="page-link" href="#">${i + 1}</a>`;
            li.addEventListener('click', function (e) {
                e.preventDefault();
                fetchProducts(i);
            });
            paginationUl.appendChild(li);
        }

        // Nút "Next"
        const nextLi = document.createElement('li');
        nextLi.className = `page-item ${currentPageIndex === totalPages - 1 ? 'disabled' : ''}`;
        nextLi.innerHTML = `<a class="page-link" href="#">Next</a>`;
        nextLi.addEventListener('click', function (e) {
            e.preventDefault();
            if (currentPageIndex < totalPages - 1) {
                fetchProducts(currentPageIndex + 1);
            }
        });
        paginationUl.appendChild(nextLi);
    }

    /**
     * Hàm để định dạng giá
     * @param {number} price - Giá cần định dạng
     * @returns {string} - Giá đã định dạng
     */
    function formatPrice(price) {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    }

    // Hàm để thêm sản phẩm vào giỏ hàng sử dụng async/await
    async function addToCart(productId) {
        if (!productId) {
            showNotification('Không xác định được sản phẩm để thêm vào giỏ hàng.', 'error');
            return;
        }

        const token = localStorage.getItem('token');
        if (!token) {
            showNotification('Bạn chưa đăng nhập. Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.', 'error');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/api/v1/cart-details', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ 
                    id: null, // ID sẽ do hệ thống tự tạo
                    quantity: 1, // Số lượng mặc định là 1
                    productSaleId: productId 
                })
            });

            if (!response.ok) {
                const contentType = response.headers.get("content-type");
                if (contentType && contentType.includes("application/json")) {
                    const errorData = await response.json();
                    if (errorData.message === 'Invalid quantity') {
                        showNotification('Sản phẩm đã hết hàng.', 'error');
                    } else {
                        showNotification(`Lỗi: ${errorData.message}`, 'error');
                    }
                } else {
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
            updateCartCount(); // Cập nhật số lượng giỏ hàng
        } catch (error) {
            console.error('Error adding to cart:', error);
            showNotification('Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng.', 'error');
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
     * Hàm để cập nhật số lượng sản phẩm trong giỏ hàng hiển thị trên biểu tượng giỏ hàng
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

            // Cập nhật số lượng trong biểu tượng giỏ hàng
            const cartCountElement = document.querySelector('.cart-count');
            if (cartCountElement) {
                cartCountElement.textContent = cartCount;
            } else {
                // Nếu chưa có, tạo phần tử và thêm vào trong .cart
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

    /**
     * Hàm để xử lý thông tin người dùng đã đăng nhập
     */
    function fetchUserInfo() {
        fetch('http://localhost:8080/api/v1/user/profile') // Thay đổi URL nếu cần
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('User not logged in');
                }
            })
            .then(data => {
                const userEmailElement = document.getElementById('userEmail');
                if (userEmailElement) {
                    userEmailElement.textContent = `Hello, ${data.email}`;
                }
            })
            .catch(error => {
                const userEmailElement = document.getElementById('userEmail');
                if (userEmailElement) {
                    userEmailElement.textContent = 'Hello, Guest';
                }
                console.log('User not logged in');
            });
    }

    // Hàm để thêm sự kiện khi chọn danh mục
    if (categorySelect) {
        categorySelect.addEventListener('change', function () {
            currentPage = 0; // Reset trang về đầu
            fetchProducts(0, categorySelect.value);
        });
    }

    // Xử lý sự kiện lọc khi form lọc được submit
    if (filterForm) {
        filterForm.addEventListener('submit', function (e) {
            e.preventDefault();
            currentPage = 0; // Reset trang về đầu
            fetchProducts(0);
        });
    }

    // Xử lý sự kiện tìm kiếm khi form tìm kiếm được submit
    if (searchForm) {
        searchForm.addEventListener('submit', function (e) {
            e.preventDefault();
            currentPage = 0; // Reset trang về đầu
            fetchProducts(0);
        });
    }

    // Xử lý sự kiện khi trang được tải
    if (productContainer) {
        fetchProducts();
    }
    if (userGreeting) {
        fetchUserInfo();
    }
    updateAuthButton();
    updateCartCount(); // Cập nhật số lượng giỏ hàng khi trang được tải
    fetchCategories();
});
