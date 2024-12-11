document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get('id'); // Lấy ID đơn hàng từ URL

    if (orderId) {
        fetchOrderDetails(orderId);
    } else {
        displayError("Không tìm thấy ID đơn hàng trong URL.");
    }

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

function fetchOrderDetails(orderId) {
    const token = localStorage.getItem('token');
        const options = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        };
    fetch(`http://localhost:8080/api/v1/orders/id?idOrder=${orderId}`, options)
    .then(response => {
        if (!response.ok) {
            throw new Error("Không thể lấy dữ liệu đơn hàng.");
        }
        return response.json();
    })
    .then(data => {
        renderOrderDetails(data);
    })
    .catch(error => {
        console.error("Lỗi khi lấy dữ liệu đơn hàng:", error);
        displayError("Có lỗi xảy ra khi tải dữ liệu đơn hàng.");
    });
}

function renderOrderDetails(order) {
    console.log(order);
    // Cập nhật thông tin đơn hàng
    document.getElementById("orderId").textContent = `${order.id}`;
    
    // Nếu OrdersDTO không có trường ngày, bạn cần thêm nó vào DTO và backend
    // Giả sử có trường createdDate trong OrdersDTO
    if (order.date) {
        const orderDate = new Date(order.date);
        document.getElementById("orderDate").textContent = orderDate.toLocaleDateString('vi-VN');
    } else {
        document.getElementById("orderDate").textContent = "N/A";
    }

    document.getElementById("customerName").textContent = order.address.fullName
    ;
    document.getElementById("customerPhone").textContent = order.address !=null ? order.address.phone : "Thông tin liên hệ.";
    document.getElementById("customerAddress").textContent = order.address !=null ? order.address.detailAddress+", "+order.address.ward+", "+ order.address.district+", "+ order.address.province: "Thông tin liên hệ.";

    // Cập nhật bảng chi tiết đơn hàng
    const orderDetailsBody = document.getElementById("orderDetailsBody");
    orderDetailsBody.innerHTML = ""; // Xóa nội dung hiện tại

    if (order.orderDetailDTOS && order.orderDetailDTOS.length > 0) {
        order.orderDetailDTOS.forEach((detail, index) => {
            const formattedUnitPrice = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(detail.unitPrice);
            const formattedTotalPrice = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(detail.totalPrice);

            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${detail.product.name}</td>
                <td>${formattedUnitPrice}</td>
                <td>${detail.quantity}</td>
                <td>${formattedTotalPrice}</td>
            `;
            orderDetailsBody.appendChild(row);
        });
    } else {
        orderDetailsBody.innerHTML = "<tr><td colspan='5' class='text-center'>Không có sản phẩm nào trong đơn hàng.</td></tr>";
    }

    // Cập nhật phí ship và tổng tiền
    // Giả sử OrdersDTO có trường shippingFee, nếu không cần chỉnh sửa
    // Nếu không có, bạn có thể loại bỏ hoặc thêm tính toán theo yêu cầu
    if (order.shippingFee !== undefined && order.shippingFee !== null) {
        const formattedShippingFee = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.shippingFee);
        document.querySelector(".shipping-fee").textContent = formattedShippingFee;
    } else {
        order.shippingFee = 32000;
        const formattedShippingFee = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.shippingFee);
        document.querySelector(".shipping-fee").textContent = formattedShippingFee;
    }

    const formattedTotalCost = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.totalPrice + order.shippingFee);
    document.querySelector(".total-cost").textContent = formattedTotalCost;

    // Cập nhật trạng thái đơn hàng
    document.querySelector(".order-status").textContent = order.orderStatus;
}

function displayError(message) {
    const orderDetailsContainer = document.querySelector(".order-details");
    orderDetailsContainer.innerHTML = `<p class="text-danger">${message}</p>`;
}