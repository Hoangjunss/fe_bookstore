    document.addEventListener('DOMContentLoaded', function () {
        initData();
    });

    /**
     * Hàm khởi tạo dữ liệu khi trang được tải
     */
    function initData() {
        let page = 0;
        let size = 5;
        let objFilter = {
            email: null
        };
        getOrders(page, size, objFilter);
    }

    /**
     * Hàm lấy danh sách đơn hàng từ backend
     * @param {number} page - Số trang
     * @param {number} size - Số lượng đơn hàng mỗi trang
     * @param {object} objectFilter - Các điều kiện lọc
     */
    async function getOrders(page, size, objectFilter) {
        let bodyTable = document.querySelector('#datatable-buttons tbody');
        bodyTable.innerHTML = ''; // Xóa dữ liệu cũ

        try {
            // Gửi yêu cầu POST tới backend để lấy danh sách đơn hàng
            let response = await fetch(`http://localhost:8080/api/orders/search?page=${page}&size=${size}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(objectFilter)
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            let data = await response.json();
            console.log(data);

            let orders = data.content; // Giả sử backend trả về { content: [...], totalPages: X, number: Y }
            orders.forEach(order => {
                let formattedTotalPrice = formatCurrency(order.totalPrice);
                let formattedShippingFee = order.shippingFee ? formatCurrency(order.shippingFee) : '0 VND';
                let formattedFullCost = order.fullCost ? formatCurrency(order.fullCost) : '0 VND';
                let formattedDate = formatDate(order.createdDate);
                let statusText = getStatusText(order.orderStatus);

                // Tạo một hàng mới trong bảng
                let row = document.createElement('tr');

                row.innerHTML = `
                    <td>${order.id}</td>
                    <td>${order.user.email}</td>
                    <td>${order.quantity}</td>
                    <td>${formattedTotalPrice}</td>
                    <td>${formattedShippingFee}</td>
                    <td>${formattedFullCost}</td>
                    <td>${formattedDate}</td>
                    <td>
                        <select class="form-control status-select" data-order-id="${order.id}">
                            <option value="PENDING" ${order.orderStatus === 'PENDING' ? 'selected' : ''}>PENDING</option>
                            <option value="CANCELED" ${order.orderStatus === 'CANCELED' ? 'selected' : ''}>CANCELED</option>
                            <option value="SUCCEEDED" ${order.orderStatus === 'SUCCEEDED' ? 'selected' : ''}>SUCCEEDED</option>
                        </select>
                    </td>
                `;

                bodyTable.appendChild(row);
            });

            // Phân trang
            let totalPage = data.totalPages;
            let currentPage = data.number;
            if (totalPage > 0) {
                renderPagination(totalPage, currentPage, size);
            }

        } catch (error) {
            console.error(error);
            showNotification('Có lỗi xảy ra khi tải dữ liệu.', 'error');
        }
    }

    /**
     * Hàm định dạng số thành tiền tệ VND
     * @param {number} value - Giá trị cần định dạng
     * @returns {string} - Chuỗi định dạng tiền tệ
     */
    function formatCurrency(value) {
        if (value === null || value === undefined) return '0 VND';
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(value);
    }

    /**
     * Hàm định dạng ngày tháng theo định dạng Việt Nam
     * @param {string} dateString - Chuỗi ngày tháng
     * @returns {string} - Chuỗi ngày tháng đã định dạng
     */
    function formatDate(dateString) {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN');
    }

    /**
     * Hàm lấy văn bản trạng thái từ mã trạng thái
     * @param {string} status - Mã trạng thái
     * @returns {string} - Văn bản trạng thái
     */
    function getStatusText(status) {
        switch (status) {
            case 'PENDING':
                return 'PENDING';
            case 'CANCELED':
                return 'CANCELED';
            case 'SUCCEEDED':
                return 'SUCCEEDED';
            default:
                return 'UNKNOWN';
        }
    }

    /**
     * Hàm render các nút phân trang
     * @param {number} totalPage - Tổng số trang
     * @param {number} currentPage - Trang hiện tại
     * @param {number} size - Số lượng đơn hàng mỗi trang
     */
    function renderPagination(totalPage, currentPage, size) {
        let pagination = document.getElementById('pageId');
        pagination.innerHTML = ''; // Xóa các nút phân trang cũ

        // Nút Previous
        let prevClass = currentPage === 0 ? 'disabled' : '';
        let prevLi = document.createElement('li');
        prevLi.className = `page-item ${prevClass}`;
        prevLi.innerHTML = `<a class="page-link" href="#" onclick="changePage(${currentPage - 1}, ${size}, event)">Previous</a>`;
        pagination.appendChild(prevLi);

        // Các nút trang
        for (let i = 0; i < totalPage; i++) {
            let activeClass = currentPage === i ? 'active' : '';
            let li = document.createElement('li');
            li.className = `page-item ${activeClass}`;
            li.innerHTML = `<a class="page-link" href="#" onclick="changePage(${i}, ${size}, event)">${i + 1}</a>`;
            pagination.appendChild(li);
        }

        // Nút Next
        let nextClass = currentPage === totalPage - 1 ? 'disabled' : '';
        let nextLi = document.createElement('li');
        nextLi.className = `page-item ${nextClass}`;
        nextLi.innerHTML = `<a class="page-link" href="#" onclick="changePage(${currentPage + 1}, ${size}, event)">Next</a>`;
        pagination.appendChild(nextLi);
    }

    /**
     * Hàm thay đổi trang khi người dùng nhấn nút phân trang
     * @param {number} page - Trang mới
     * @param {number} size - Số lượng đơn hàng mỗi trang
     * @param {Event} event - Sự kiện click
     */
    function changePage(page, size, event) {
        event.preventDefault();
        searchCondition(page, size);
    }

    /**
     * Hàm hiển thị thông báo
     * @param {string} message - Thông điệp
     * @param {string} type - Loại thông báo: 'success', 'error', hoặc 'info'
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
     * Hàm tìm kiếm đơn hàng theo email
     * @param {number} page - Trang mới
     * @param {number} size - Số lượng đơn hàng mỗi trang
     */
    function searchCondition(page, size) {
        let filter = {};
        let emailInput = document.getElementById('email').value.trim();
        filter.email = emailInput === '' ? null : emailInput;
        getOrders(page, size, filter);
    }

    /**
     * Hàm cập nhật trạng thái đơn hàng khi người dùng thay đổi select
     */
    document.addEventListener('change', function (e) {
        if (e.target && e.target.matches('.status-select')) {
            let orderId = e.target.getAttribute('data-order-id');
            let newStatus = e.target.value;

            updateOrderStatus(orderId, newStatus, e.target);
        }
    });

    /**
     * Hàm gửi yêu cầu cập nhật trạng thái đơn hàng tới backend
     * @param {number} orderId - ID đơn hàng
     * @param {string} newStatus - Trạng thái mới
     * @param {HTMLElement} selectElement - Thẻ select đã được thay đổi
     */
    async function updateOrderStatus(orderId, newStatus, selectElement) {
        try {
            let response = await fetch(`http://localhost:8080/api/orders/${orderId}/status`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ orderStatus: newStatus })
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            let data = await response.json();
            console.log('Update successful', data);
            showNotification('Cập nhật trạng thái đơn hàng thành công!', 'success');
        } catch (error) {
            console.error('Error updating status:', error);
            showNotification('Cập nhật trạng thái đơn hàng thất bại. Vui lòng thử lại.', 'error');
            // Đặt lại giá trị select về trạng thái cũ nếu có lỗi
            // Bạn cần lưu trạng thái cũ trước khi thay đổi để có thể đặt lại
        }
    }