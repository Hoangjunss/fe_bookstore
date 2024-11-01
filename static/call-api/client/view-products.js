// custom.js

document.addEventListener("DOMContentLoaded", function () {
    const productContainer = document.getElementById('productContainer');
    const categorySelect = document.getElementById('category');
    const filterForm = document.getElementById('filterForm');
    const paginationUl = document.getElementById('pagination');
    const userGreeting = document.getElementById('user-greeting');
    const searchForm = document.getElementById('searchForm');

    let currentPage = 0;
    const pageSize = 10; 

    // Hàm để cập nhật dropdown danh mục
    function populateCategoryDropdown(categories) {
        categorySelect.innerHTML = '<option value="0">Loại sản phẩm</option>'; // Reset dropdown
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.id; // Giá trị là ID danh mục
            option.textContent = category.name; // Tên hiển thị là tên danh mục
            categorySelect.appendChild(option); // Thêm vào dropdown
        });
    }

    // Hàm để lấy và hiển thị sản phẩm
    function fetchProducts(page = 0) { 
        // Lấy giá trị từ form lọc
        const productName = document.getElementById('productName').value.trim();
        const categoryId = categorySelect.value;
        const saleStartPrice = document.getElementById('saleStartPrice').value;
        const saleEndPrice = document.getElementById('saleEndPrice').value;

        // Xây dựng URL với các tham số query
        let url = `http://localhost:8080/api/v1/productsales?page=${page}&size=${pageSize}`;

        if (productName) url += `&title=${encodeURIComponent(productName)}`;
        if (categoryId && categoryId !== '0') url += `&categoryId=${categoryId}`;
        if (saleStartPrice) url += `&saleStartPrice=${saleStartPrice}`;
        if (saleEndPrice) url += `&saleEndPrice=${saleEndPrice}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                displayProducts(data.content);
                setupPagination(data.totalPages, data.number);
            })
            .catch(error => console.error('Error fetching products:', error));
    }

    // Hàm để hiển thị sản phẩm
    function displayProducts(products) {
        productContainer.innerHTML = ''; // Xóa danh sách cũ

        const categoriesSet = new Set();

        if (products.length === 0) {
            productContainer.innerHTML = '<p class="text-center">Không tìm thấy sản phẩm nào.</p>';
            return;
        }

        products.forEach(product => {
            console.log(product);
            categoriesSet.add({
                id: product.product.category.id,
                name: product.product.category.name
            });
            const col = document.createElement('div');
            col.className = 'col-lg-4 col-md-6 col-sm-6';
            col.innerHTML = `
                <div class="single-items mb-30">
                    <div class="thumb">
                        <a href="product-details.php?id=${product.id}">
                            <img src="${product.product.image.url}" alt="${product.product.name}">
                        </a>
                        <div class="actions">
                            <button class="add-to-cart-link" data-id="${product.id}">Add to Cart</button>
                        </div>
                    </div>
                    <div class="content">
                        <h4><a href="product-details.php?id=${product.id}">${product.product.name}</a></h4>
                        <p>Tác giả: ${product.product.author}</p>
                        <p class="price">${formatPrice(product.price)} VND</p>
                        <p>Danh mục: ${product.product.category.name}</p>
                        <p>Số lượng: ${product.quantity}</p>
                    </div>
                </div>
            `;
            productContainer.appendChild(col);
        });

        // Cập nhật dropdown danh mục
        populateCategoryDropdown(Array.from(categoriesSet));


        // Thêm sự kiện cho các nút "Add to Cart"
        document.querySelectorAll('.add-to-cart-link').forEach(button => {
            button.addEventListener('click', function () {
                const productId = this.getAttribute('data-id');
                addToCart(productId);
            });
        });
    }

    

    // Hàm để thêm sản phẩm vào giỏ hàng
    function addToCart(productId) {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Bạn chưa đăng nhập. Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.');
            return;
        }
        // Gửi yêu cầu thêm vào giỏ hàng tới backend
        fetch('http://localhost:8080/api/v1/cart-details', { // Thay đổi URL và phương thức nếu cần
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ 
                id: null, // ID sẽ do hệ thống tự tạo
                quantity: 1, // Số lượng mặc định là 1
                productSaleId: productId })
        })
        .then(async response => {
            if (response.ok) {
                alert('Đã thêm vào giỏ hàng!');
            } else {
                const contentType = response.headers.get("content-type");
                if (contentType && contentType.includes("application/json")) {
                    const errorData = await response.json();
                    if (errorData.message === 'Invalid quantity') {
                        alert('Sản phẩm đã hết hàng.');
                    } else {
                        throw new Error(`Lỗi xảy ra: ${errorData.message}`);
                    }
                } else {
                    const errorText = await response.text();
                    if (errorText === 'Invalid quantity') {
                        alert('Sản phẩm đã hết hàng.');
                    } else {
                        throw new Error(`Lỗi xảy ra: ${errorText}`);
                    }
                }
            }
        })
            .catch(error => console.error('Error adding to cart:', error));
    }

    // Hàm để thiết lập phân trang
    function setupPagination(totalPages, currentPageIndex) {
        paginationUl.innerHTML = ''; // Xóa phân trang cũ

        for (let i = 0; i < totalPages; i++) {
            const li = document.createElement('li');
            li.className = 'page-item' + (i === currentPageIndex ? ' active' : '');
            li.innerHTML = `<a class="page-link" href="#">${i + 1}</a>`;
            li.addEventListener('click', function (e) {
                e.preventDefault();
                fetchProducts(i);
            });
            paginationUl.appendChild(li);
        }
    }

    // Hàm để định dạng giá
    function formatPrice(price) {
        return price.toLocaleString('vi-VN');
    }

    // Hàm để xử lý thông tin người dùng đã đăng nhập
    function fetchUserInfo() {
        fetch('http://localhost:8080/api/user/profile') // Thay đổi URL nếu cần
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('User not logged in');
                }
            })
            .then(data => {
                userGreeting.textContent = `Hello, ${data.email}`;
            })
            .catch(error => {
                userGreeting.textContent = 'Hello, Guest';
                console.log('User not logged in');
            });
    }

    // Xử lý sự kiện lọc khi form lọc được submit
    filterForm.addEventListener('submit', function (e) {
        e.preventDefault();
        fetchProducts(0);
    });

    // Xử lý sự kiện tìm kiếm khi form tìm kiếm được submit
    searchForm.addEventListener('submit', function (e) {
        e.preventDefault();
        fetchProducts(0);
    });

    // Khởi động các hàm khi trang được tải
    fetchProducts();
    fetchUserInfo();
});
