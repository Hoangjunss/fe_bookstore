// Hàm xem trước hình ảnh
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

// Khi tài liệu đã sẵn sàng
document.addEventListener('DOMContentLoaded', function () {
    // Fetch danh sách thể loại và nhà cung cấp từ server
    fetchCategories();
    fetchSuppliers();

    // Xử lý submit form
    document.getElementById('createBookForm').addEventListener('submit', function (e) {
        e.preventDefault(); // Ngăn form submit mặc định
        createProduct();
    });
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
});

/**
 * Hàm hiển thị thông báo
 * @param {string} message - Thông điệp
 * @param {string} type - Loại thông báo: 'success' hoặc 'error'
 */
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

/**
 * Hàm fetch danh sách thể loại từ backend
 */
async function fetchCategories() {
    try {
        const response = await axios.get('http://localhost:8080/api/v1/category');
        const categories = response.data;

        const categorySelect = document.getElementById('category');
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.id; // Giả sử 'id' là trường định danh
            option.textContent = category.name;
            categorySelect.appendChild(option);
        });
    } catch (error) {
        console.error(error);
        showNotification('Có lỗi xảy ra khi tải danh sách thể loại.', 'error');
    }
}

/**
 * Hàm fetch danh sách nhà cung cấp từ backend
 */
async function fetchSuppliers() {
    try {
        const response = await axios.get('http://localhost:8080/api/v1/supplies');
        const suppliers = response.data.content;

        const supplySelect = document.getElementById('supply');
        suppliers.forEach(supply => {
            const option = document.createElement('option');
            option.value = supply.id; // Giả sử 'id' là trường định danh
            option.textContent = supply.name;
            supplySelect.appendChild(option);
        });
    } catch (error) {
        console.error(error);
        showNotification('Có lỗi xảy ra khi tải danh sách nhà cung cấp.', 'error');
    }
}

/**
 * Hàm kiểm tra và hiển thị lỗi cho từng trường
 * @returns {boolean} - Trả về true nếu có lỗi, ngược lại false
 */
function validateForm() {
    let hasError = false;

    // Xóa các thông báo lỗi trước đó
    document.querySelectorAll('.error-message').forEach(el => el.textContent = '');

    // Lấy giá trị từ form
    const name = document.getElementById('bookName').value.trim();
    const description = document.getElementById('description').value.trim();
    const author = document.getElementById('author').value.trim();
    const page = document.getElementById('page').value;
    const categoryId = document.getElementById('category').value;
    const supplyId = document.getElementById('supply').value;
    const image = document.getElementById('image').files[0];
    const status = document.getElementById('status').value;
    const quantity = document.getElementById('quantity') ? document.getElementById('quantity').value : null;
    const price = document.getElementById('price') ? document.getElementById('price').value : null;

    // Kiểm tra tên sách
    if (!name) {
        document.getElementById('error-name').textContent = 'Tên sách không được để trống.';
        hasError = true;
    }

    // Kiểm tra mô tả
    if (!description) {
        document.getElementById('error-description').textContent = 'Mô tả không được để trống.';
        hasError = true;
    }

    // Kiểm tra tác giả
    if (!author) {
        document.getElementById('error-author').textContent = 'Tác giả không được để trống.';
        hasError = true;
    }

    // Kiểm tra số trang
    if (!page) {
        document.getElementById('error-page').textContent = 'Số trang không được để trống.';
        hasError = true;
    } else if (parseInt(page) <= 0) {
        document.getElementById('error-page').textContent = 'Số trang phải lớn hơn 0.';
        hasError = true;
    }
    // Kiểm tra thể loại
    if (!categoryId) {
        document.getElementById('error-categoryId').textContent = 'Vui lòng chọn thể loại sách.';
        hasError = true;
    }

    // Kiểm tra nhà cung cấp
    if (!supplyId) {
        document.getElementById('error-supplyId').textContent = 'Vui lòng chọn nhà cung cấp.';
        hasError = true;
    }

    // Kiểm tra ảnh
    if (!image) {
        document.getElementById('error-image').textContent = 'Vui lòng chọn ảnh thumbnail.';
        hasError = true;
    } else {
        const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!validImageTypes.includes(image.type)) {
            document.getElementById('error-image').textContent = 'Chỉ hỗ trợ các định dạng JPG, PNG, GIF.';
            hasError = true;
        }
    }

    // Kiểm tra trạng thái
    if (status === "") {
        document.getElementById('error-status').textContent = 'Vui lòng chọn trạng thái.';
        hasError = true;
    }

    // Kiểm tra số lượng
    if (quantity !== null) {
        if (quantity === "") {
            document.getElementById('error-quantity').textContent = 'Số lượng không được để trống.';
            hasError = true;
        } else if (parseInt(quantity) < 0) {
            document.getElementById('error-quantity').textContent = 'Số lượng không được âm.';
            hasError = true;
        }
    }

    // Kiểm tra giá
    if (price !== null) {
        if (price === "") {
            document.getElementById('error-price').textContent = 'Giá sản phẩm không được để trống.';
            hasError = true;
        } else if (parseFloat(price) <= 0) {
            document.getElementById('error-price').textContent = 'Giá sản phẩm phải lớn hơn 0.';
            hasError = true;
        }
    }

    return hasError;
}


/**
 * Hàm tạo mới sản phẩm
 */
async function createProduct() {
    if (validateForm()) {
        showNotification('Vui lòng sửa các lỗi trong form trước khi gửi.', 'error');
        return;
    }

    const form = document.getElementById('createBookForm');
    const formData = new FormData(form);

    try {
        const response = await axios.post('http://localhost:8080/api/v1/product', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        if (response.status === 201) { // HTTP 201 Created
            showNotification('Tạo mới sách thành công!', 'success');
            form.reset();
            document.getElementById('imagePreview').src = '../../../static/assets_admin/images/default-thumbnail.png';
        } else {
            throw new Error('Tạo mới sách thất bại.');
        }
    } catch (error) {
        console.error('Error creating product:', error);
        if (error.response && error.response.data && error.response.data.message) {
            showNotification(error.response.data.message, 'error');
        } else {
            showNotification('Tạo mới sách thất bại. Vui lòng thử lại.', 'error');
        }
    }
}

