    document.addEventListener("DOMContentLoaded", () => {
        fetchOrders(0, 10, 'ALL'); // Khởi tạo với trang 0, kích thước 10, trạng thái ALL
    });

    let currentPage = 0;
    let pageSize = 10;
    let currentStatus = 'ALL';

    function fetchOrders(page, size, status) {
        currentPage = page;
        currentStatus = status;
        const url = `http://localhost:8080/orders?page=${page}&size=${size}&status=${status}`;

        fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
                // Thêm các header cần thiết nếu có, ví dụ: Authorization
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            renderOrders(data.content);
            renderPagination(data);
        })
        .catch(error => {
            console.error("There was a problem with the fetch operation:", error);
        });
    }

    function renderOrders(orders) {
        const orderContainer = document.getElementById("orderContainer");
        orderContainer.innerHTML = ""; // Xóa nội dung hiện tại

        if (orders.length === 0) {
            orderContainer.innerHTML = "<p>Không có đơn hàng nào để hiển thị.</p>";
            return;
        }

        orders.forEach(order => {
            const formattedTotalPrice = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.totalPrice);
            const formattedQuantity = order.quantity;
            const username = order.username;
            const address = order.address.address;
            const phone = order.address.phone;
            const orderStatus = order.orderStatus;
            const orderId = order.id;

            const orderItem = document.createElement("article");
            orderItem.className = "blog_item";
            orderItem.innerHTML = `
                <div class="blog_item_img">
                    <a href="#" class="blog_item_date">
                        <h3>${new Date(order.createdDate).getDate()}</h3>
                        <p>${new Date(order.createdDate).toLocaleString('default', { month: 'short' })}</p>
                    </a>
                </div>
                <div class="blog_details">
                    <a class="d-inline-block" href="/client/order_detail.html?id=${orderId}">
                        <h2 class="order-head" style="color: #2d2d2d">Số tiền phải trả: ${formattedTotalPrice}</h2>
                    </a>
                    <p>Người dùng: ${username}</p>
                    <p>Địa chỉ: ${address} - SĐT: ${phone}</p>
                    <p>Số lượng sản phẩm: ${formattedQuantity}</p>
                    <ul class="order-info-link">
                        <li><a href="#">Trạng thái: ${orderStatus}</a></li>
                        <!-- Bạn có thể thêm các thông tin khác nếu cần -->
                    </ul>
                </div>
            `;
            orderContainer.appendChild(orderItem);
        });
    }

    function renderPagination(data) {
        const pagination = document.getElementById("pagination");
        pagination.innerHTML = ""; // Xóa nội dung hiện tại

        const totalPages = data.totalPages;
        const currentPage = data.number;
        const hasNext = data.hasNext;
        const hasPrevious = data.hasPrevious;

        // Nút "Previous"
        const prevLi = document.createElement("li");
        prevLi.className = `page-item ${!hasPrevious ? 'disabled' : ''}`;
        prevLi.innerHTML = `
            <a class="page-link" href="#" aria-label="Previous" onclick="handlePageChange(${currentPage - 1})">
                <span aria-hidden="true">&laquo;</span>
            </a>
        `;
        pagination.appendChild(prevLi);

        // Các trang số
        for (let i = 0; i < totalPages; i++) {
            const pageLi = document.createElement("li");
            pageLi.className = `page-item ${i === currentPage ? 'active' : ''}`;
            pageLi.innerHTML = `
                <a class="page-link" href="#" onclick="handlePageChange(${i})">${i + 1}</a>
            `;
            pagination.appendChild(pageLi);
        }

        // Nút "Next"
        const nextLi = document.createElement("li");
        nextLi.className = `page-item ${!hasNext ? 'disabled' : ''}`;
        nextLi.innerHTML = `
            <a class="page-link" href="#" aria-label="Next" onclick="handlePageChange(${currentPage + 1})">
                <span aria-hidden="true">&raquo;</span>
            </a>
        `;
        pagination.appendChild(nextLi);
    }

    function handlePageChange(page) {
        if (page < 0 || page >= currentPage.totalPages) {
            return;
        }
        fetchOrders(page, pageSize, currentStatus);
    }

    // Nếu bạn muốn thêm bộ lọc trạng thái, bạn có thể thêm các sự kiện ở đây