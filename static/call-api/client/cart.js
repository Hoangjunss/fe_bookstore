document.addEventListener("DOMContentLoaded", () => {
    fetchCartData();
    const cartLink = document.querySelector('a[href="cart.php"]');
    
    function checkAuthAndRedirect(link, targetUrl) {
        const token = localStorage.getItem('token');
        if (token) {
            window.location.href = targetUrl;
        } else {
            showNotification('Vui lòng đăng nhập để truy cập trang này.', 'error');
        }
    }

    const profileLink = document.getElementById("profileLink");
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
            window.location.href = 'index.php';
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

    // Thêm lớp show để kích hoạt animation
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

// Hàm cập nhật số lượng sản phẩm trong giỏ hàng hiển thị trên biểu tượng giỏ hàng
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

// Hàm lấy dữ liệu giỏ hàng và render
async function fetchCartData() {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            showNotification('Bạn chưa đăng nhập. Vui lòng đăng nhập để xem giỏ hàng.', 'error');
            document.getElementById("cartTableBody").innerHTML = "<tr><td colspan='6' class='text-center'>Bạn chưa đăng nhập.</td></tr>";
            document.querySelector(".total").innerText = '0 VND';
            return;
        }

        const response = await fetch('http://localhost:8080/api/v1/cart-details', { // Điều chỉnh URL theo cấu hình backend của bạn
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const cartData = await response.json();
        renderCart(cartData);
        updateCartCount(); // Cập nhật số lượng giỏ hàng
    } catch (error) {
        console.error('Error fetching cart data:', error);
        showNotification('Có lỗi xảy ra khi tải dữ liệu giỏ hàng.', 'error');
        alert('Có lỗi xảy ra khi tải dữ liệu giỏ hàng.');
    }
}

// Hàm hiển thị giỏ hàng
function renderCart(cart) {
    const tableBody = document.getElementById("cartTableBody");
    tableBody.innerHTML = ""; // Xóa nội dung hiện tại
    let total = 0;

    if (!cart || !cart.cartDetailDTOList || cart.cartDetailDTOList.length === 0) {
        tableBody.innerHTML = "<tr><td colspan='6' class='text-center'>Giỏ hàng của bạn đang trống.</td></tr>";
        document.querySelector(".total").innerText = '0 VND';
        return;
    }

    cart.cartDetailDTOList.forEach((detail, index) => {
        const product = detail.product.product; // ProductSaleDTO.product là Product
        const imageUrl = product.image ? product.image.url : '../../static/client_assets/img/gallery/sample_product_thumbnail.jpg';
        const productName = product.name || 'Tên sản phẩm';
        const price = detail.product.price || 0;
        const quantity = detail.quantity || 0;
        const totalPrice = price * quantity;
        total += totalPrice;

        const formattedPrice = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
        const formattedTotalPrice = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice);

        console.log(detail);
        const row = `
              <tr data-cart-detail-id="${detail.id}">
                  <td><img src="${imageUrl}" alt="${productName}" width="60"></td>
                  <td>${productName}</td>
                  <td>${formattedPrice}</td>
                  <td>
                      <div class="quantity-container">
                          <button onclick="changeQuantity(${detail.id}, -1, ${detail.product.id})">-</button>
                          <input type="text" value="${quantity}" onchange="updateQuantityFromInput(${detail.id}, this.value, ${detail.product.id})">
                          <button onclick="changeQuantity(${detail.id}, 1, ${detail.product.id})">+</button>
                      </div>
                  </td>
                  <td>${formattedTotalPrice}</td>
                  <td>
                      <button class="btn btn-danger btn-sm" onclick="removeFromCart(${detail.id})">Xóa</button>
                  </td>
              </tr>
          `;
        tableBody.insertAdjacentHTML('beforeend', row);
    });

    // Cập nhật tổng tiền
    const formattedTotal = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(total);
    document.querySelector(".total").innerText = formattedTotal;
}

// Hàm thay đổi số lượng sản phẩm
async function changeQuantity(cartDetailId, delta, productSaleId) {
    try {
        // Lấy hàng tương ứng trong bảng
        const row = document.querySelector(`tr[data-cart-detail-id="${cartDetailId}"]`);
        const quantityInput = row.querySelector('input[type="text"]');
        let currentQuantity = parseInt(quantityInput.value);

        // Tính toán số lượng mới
        const newQuantity = currentQuantity + delta;
        if (newQuantity < 1) {
            showNotification('Số lượng tối thiểu là 1.', 'error');
            return;
        }

        // Gọi API để cập nhật số lượng
        await updateQuantity(cartDetailId, newQuantity, productSaleId);

    } catch (error) {
        console.error('Error changing quantity:', error);
    }
}

// Hàm cập nhật số lượng sản phẩm
async function updateQuantity(cartDetailId, newQuantity, productSaleId) {
    try {
        const token = localStorage.getItem('token');
        // Gọi API PUT để cập nhật số lượng
        const response = await fetch('http://localhost:8080/api/v1/cart-details', { // Điều chỉnh URL theo cấu hình backend của bạn
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                id: cartDetailId,
                quantity: parseInt(newQuantity),
                productSaleId: productSaleId
            })
        });

        if (!response.ok) {
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                const errorData = await response.json();
                showNotification(`Lỗi: ${errorData.message}`, 'error');
            } else {
                const errorText = await response.text();
                showNotification(`Lỗi xảy ra: ${errorText}`, 'error');
            }
            return;
        }

        const updatedDetail = await response.json();
        showNotification('Cập nhật số lượng thành công!', 'success');
        // Cập nhật lại giỏ hàng
        fetchCartData();
    } catch (error) {
        console.error('Error updating quantity:', error);
        showNotification('Có lỗi xảy ra khi cập nhật số lượng.', 'error');
    }
}

// Hàm xóa sản phẩm khỏi giỏ hàng
async function removeFromCart(cartDetailId) {
    if (!confirm('Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?')) return;

    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:8080/api/v1/cart-details?id=${cartDetailId}`, { // Điều chỉnh URL theo cấu hình backend của bạn
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                const errorData = await response.json();
                showNotification(`Lỗi: ${errorData.message}`, 'error');
            } else {
                const errorText = await response.text();
                showNotification(`Lỗi xảy ra: ${errorText}`, 'error');
            }
            return;
        }

        showNotification('Đã xóa sản phẩm khỏi giỏ hàng!', 'success');
        // Cập nhật lại giỏ hàng
        fetchCartData();
        // Cập nhật biểu tượng giỏ hàng
        updateCartCount();
    } catch (error) {
        console.error('Error removing item from cart:', error);
        showNotification('Có lỗi xảy ra khi xóa sản phẩm khỏi giỏ hàng.', 'error');
    }
}

// Hàm cập nhật số lượng thông qua sự kiện onchange của input
async function updateQuantityFromInput(cartDetailId, newQuantity, productSaleId) {
    newQuantity = parseInt(newQuantity);
    if (isNaN(newQuantity) || newQuantity < 1) {
        showNotification('Số lượng không hợp lệ.', 'error');
        fetchCartData(); // Lấy lại dữ liệu giỏ hàng để reset giá trị
        return;
    }
    await updateQuantity(cartDetailId, newQuantity, productSaleId);
}
