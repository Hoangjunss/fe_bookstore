// Hàm xem trước hình ảnh mới
function previewImage(input) {
    let preview = document.getElementById('imagePreview');
    let file = input.files[0];

    if (file) {
        let reader = new FileReader();

        reader.onload = function (e) {
            preview.src = e.target.result;
        }
        reader.readAsDataURL(file);
    }
}

// Hàm hiển thị thông báo
function showNotification(message, type) {
    const notificationContainer = document.getElementById('notification-container');

    const notification = document.createElement('div');
    notification.className = `notification ${type} show`;
    notification.innerHTML = `
        <span>${message}</span>
        <span class="close">&times;</span>
    `;

    notificationContainer.appendChild(notification);

    // Tự động ẩn sau 3 giây
    setTimeout(() => {
        notification.classList.remove('show');
        notification.classList.add('disappear');
        notification.addEventListener('transitionend', () => {
            notification.remove();
        });
    }, 3000);

    // Thêm sự kiện đóng khi nhấp vào nút close
    notification.querySelector('.close').addEventListener('click', () => {
        notification.classList.remove('show');
        notification.classList.add('disappear');
        notification.addEventListener('transitionend', () => {
            notification.remove();
        });
    });
}

document.addEventListener('DOMContentLoaded', function () {
    const logoutButton = document.getElementById("logout-btn");

    if (logoutButton) {
        logoutButton.addEventListener("click", function(event) {
            event.preventDefault(); // Ngăn chặn hành động mặc định của liên kết

            // Xóa token và refreshToken khỏi localStorage
            localStorage.removeItem("token");
            localStorage.removeItem("refreshToken");

            // Thông báo đăng xuất thành công (tùy chọn)
            alert("Bạn đã đăng xuất thành công!");

            // Chuyển hướng đến trang đăng nhập
            window.location.href = "../../auth/login.php";
        });
    } else {
        console.error("Phần tử logoutButton không tồn tại trong DOM.");
    }
    // Lấy ID sản phẩm từ URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (productId) {
        fetchProductData(productId);
    } else {
        alert('Không tìm thấy ID sản phẩm.');
        window.location.href = 'list-product.php';
    }

    // Fetch danh sách thể loại và nhà cung cấp từ server
    fetchCategories();
    fetchSuppliers();

    // Khởi tạo Parsley cho form
    $('#updateProductForm').parsley();

    // Xử lý submit form
    document.getElementById('updateProductForm').addEventListener('submit', function (e) {
        e.preventDefault(); // Ngăn form submit mặc định
        if ($('#updateProductForm').parsley().isValid()) {
            updateProduct(productId);
        } else {
            showNotification('Vui lòng sửa các lỗi trong form trước khi gửi.', 'error');
        }
    });
});

/**
 * Hàm lấy dữ liệu sản phẩm từ BE và điền vào form
 * @param {number} productId - ID sản phẩm
 */
async function fetchProductData(productId) {
    try {
        const response = await axios.get(`http://localhost:8080/api/v1/product/id?id=${productId}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 200) {
            const product = response.data;
            populateForm(product);
        } else {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    } catch (error) {
        console.error('Error fetching product data:', error);
        alert('Không thể lấy dữ liệu sản phẩm. Vui lòng thử lại sau.');
        window.location.href = 'list-product.php';
    }
}

/**
 * Hàm điền dữ liệu vào form
 * @param {object} product - Đối tượng sản phẩm
 */
function populateForm(product) {
    document.getElementById('id').value = product.id;
    document.getElementById('productName').value = product.name;
    document.getElementById('description').value = product.description;
    document.getElementById('author').value = product.author;
    document.getElementById('page').value = product.page;
    document.getElementById('size').value = product.size || '';
    document.getElementById('category').value = product.categoryId || '';
    document.getElementById('supply').value = product.supplyId || '';
    document.getElementById('status').value = product.status ? '1' : '0';
    document.getElementById('imagePreview').src = product.image || '../../../static/assets_admin/images/default-thumbnail.png';
    document.getElementById('quantity').value = product.quantity || 0;
    document.getElementById('price').value = product.price || 0.00;
}


function getToken() {
    return localStorage.getItem('token');
}

/**
 * Hàm fetch danh sách thể loại từ API và populate vào dropdown
 */
async function fetchCategories() {
    try {
        const accessToken = getToken();
        const options = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        };
        const response = await axios.get(`http://localhost:8080/api/v1/category`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 200) {
            const categories = response.data;
            populateCategoryDropdown(categories);
        } else {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    } catch (error) {
        console.error('Error fetching categories:', error);
        document.getElementById('error-categoryId').textContent = 'Không thể tải danh sách thể loại sản phẩm.';
    }
}

/**
 * Hàm populate danh sách thể loại vào dropdown
 * @param {Array} categories - Danh sách thể loại
 */
function populateCategoryDropdown(categories) {
    const categorySelect = document.getElementById('category');
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.id;
        option.textContent = category.name;
        categorySelect.appendChild(option);
    });
}

/**
 * Hàm fetch danh sách nhà cung cấp từ API và populate vào dropdown
 */
async function fetchSuppliers() {
    try {
        const response = await axios.get(`http://localhost:8080/api/v1/supplies?page=0&size=100`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 200) {
            const suppliers = response.data.content;
            populateSupplierDropdown(suppliers);
        } else {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    } catch (error) {
        console.error('Error fetching suppliers:', error);
        document.getElementById('error-supplyId').textContent = 'Không thể tải danh sách nhà cung cấp.';
    }
}

/**
 * Hàm populate danh sách nhà cung cấp vào dropdown
 * @param {Array} suppliers - Danh sách nhà cung cấp
 */
function populateSupplierDropdown(suppliers) {
    const supplySelect = document.getElementById('supply');
    suppliers.forEach(supply => {
        const option = document.createElement('option');
        option.value = supply.id;
        option.textContent = supply.name;
        supplySelect.appendChild(option);
    });
}

/**
 * Hàm cập nhật sản phẩm
 * @param {number} productId - ID sản phẩm
 */
async function updateProduct(productId) {
    const form = document.getElementById('updateProductForm');
    const formData = new FormData(form);

    try {
        const response = await axios.patch(`http://localhost:8080/api/v1/product`, formData, {
            headers: {
                // Khi sử dụng FormData, Axios tự động thiết lập 'Content-Type' với boundary nên không cần đặt thủ công
                'Content-Type': 'multipart/form-data'
            }
        });

        if (response.status === 200) {
            showNotification('Cập nhật sản phẩm thành công!', 'success');
            // Chuyển hướng đến trang danh sách sau khi cập nhật thành công
            setTimeout(() => {
                window.location.href = 'list-product.php';
            }, 2000);
        } else {
            throw new Error('Cập nhật sản phẩm thất bại.');
        }
    } catch (error) {
        console.error('Error updating product:', error);
        // Hiển thị thông báo lỗi nếu có
        if (error.response && error.response.data && error.response.data.message) {
            showNotification(error.response.data.message, 'error');
        } else {
            showNotification('Có lỗi xảy ra khi cập nhật sản phẩm.', 'error');
        }
    }
}

