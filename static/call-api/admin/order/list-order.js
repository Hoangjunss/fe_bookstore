document.addEventListener('DOMContentLoaded', function () {
    initData();
    document.getElementById('btnSearch').addEventListener('click', function (e) {
        e.preventDefault();
        searchCondition(0, 5); // Khi nhấn tìm kiếm, bắt đầu từ trang 0 với kích thước 5
    });
});

function getToken() {
    return localStorage.getItem('token');
}

/**
 * Hàm khởi tạo dữ liệu khi trang được tải
 */
function initData() {
    let page = 0;
    let size = 5;
    let objFilter = {
        status: 'PENDING' // Trạng thái mặc định
    };
    document.getElementById('status').value = 'PENDING'; // Đặt giá trị mặc định trong dropdown
    getOrders(page, size, objFilter);
}

function showLoading() {
    let loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) {
        loadingOverlay.style.display = 'block';
    }
}

function hideLoading() {
    let loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) {
        loadingOverlay.style.display = 'none';
    }
}

/**
 * Hàm lấy danh sách đơn hàng từ backend
 * @param {number} page - Số trang
 * @param {number} size - Số lượng đơn hàng mỗi trang
 * @param {object} objectFilter - Các điều kiện lọc
 */
async function getOrders(page, size, objectFilter) {
    const accessToken = getToken();
    let bodyTable = document.querySelector('#datatable-buttons tbody');
    if (!bodyTable) {
        console.error("Không tìm thấy tbody trong bảng với id 'datatable-buttons'");
        return;
    }
    bodyTable.innerHTML = ''; // Xóa dữ liệu cũ
    showLoading(); 
    try {
        const queryParams = new URLSearchParams({
            page: page,
            size: size,
            status: objectFilter.status // Lọc theo trạng thái
        });
        // Tạo chuỗi tham số truy vấn từ objectFilter
        const options = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        };
        

        let response = await fetch(`http://localhost:8080/api/v1/orders?${queryParams.toString()}`, options);

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const noData = document.querySelector('.dataTables_empty');
        if (noData) {
            noData.style.display = 'none';
        }

        let data = await response.json();
        console.log(data);

        let orders = data.content; // Giả sử backend trả về { content: [...], totalPages: X, number: Y }
        if (!Array.isArray(orders)) {
            throw new TypeError("Expected 'content' to be an array");
        }

        if (orders.length === 0) {
            if (noData) {
                noData.style.display = 'table-row'; // Hiển thị hàng "Không có dữ liệu"
            }
        } else {
            orders.forEach(order => {
                let formattedTotalPrice = formatCurrency(order.totalPrice);
                let statusText = getStatusText(order.orderStatus);

                // Tạo một hàng mới trong bảng
                let row = document.createElement('tr');

                // Kiểm tra trạng thái để quyết định hiển thị các nút hành động
                let actionButtons = '';
                if (order.orderStatus === 'PENDING') {
                    actionButtons = `
                        <button class="btn btn-success btn-sm accept-button" data-id="${order.id}">Duyệt</button>
                        <button class="btn btn-danger btn-sm reject-button" data-id="${order.id}">Từ chối</button>
                    `;
                } else {
                    actionButtons = `<span class="badge badge-info">${statusText}</span>`;
                }

                row.innerHTML = `
                    <td>${order.id}</td>
                    <td>${order.username}</td>
                    <td>${order.quantity}</td>
                    <td>${formattedTotalPrice}</td>
                    <td>
                        ${actionButtons}
                        <button class="btn btn-info btn-sm detail-button" data-id="${order.id}">Xem chi tiết</button>
                    </td>
                `;

                bodyTable.appendChild(row);
            });
        }

        // Thêm sự kiện cho các nút "Xem chi tiết"
        const detailButtons = document.querySelectorAll('.detail-button');
        detailButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const orderId = event.target.getAttribute('data-id');
                // Chuyển hướng tới trang order-detail.php với tham số orderId
                window.location.href = `order-detail.php?orderId=${orderId}`;
            });
        });

        // Thêm sự kiện cho các nút "Từ chối"
        const rejectButtons = document.querySelectorAll('.reject-button');
        rejectButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const orderId = event.target.getAttribute('data-id');
                updateOrderStatus(orderId, 'REJECT');
            });
        });

        // Thêm sự kiện cho các nút "Duyệt"
        const acceptButtons = document.querySelectorAll('.accept-button');
        acceptButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const orderId = event.target.getAttribute('data-id');
                updateOrderStatus(orderId, 'ACCESS');
            });
        });

        // Phân trang
        let totalPage = data.totalPages;
        let currentPage = data.number;
        if (totalPage > 0) {
            renderPagination(totalPage, currentPage, size);
        }
        hideLoading();
    } catch (error) {
        console.error(error);
        showNotification('Có lỗi xảy ra khi tải dữ liệu.', 'error');
        hideLoading();
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
 * Hàm lấy văn bản trạng thái từ mã trạng thái
 * @param {string} status - Mã trạng thái
 * @returns {string} - Văn bản trạng thái
 */
function getStatusText(status) {
    switch (status) {
        case 'PENDING':
            return 'PENDING';
        case 'REJECT':
            return 'REJECT';
        case 'ACCESS':
            return 'ACCESS';
        case 'SUCCESS':
            return 'SUCCESS';
        default:
            return '';
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
    if (!pagination) {
        console.error("Không tìm thấy phần tử với id 'pageId' để hiển thị phân trang.");
        return;
    }
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
 * Hàm tìm kiếm đơn hàng theo email và trạng thái
 * @param {number} page - Trang mới
 * @param {number} size - Số lượng đơn hàng mỗi trang
 */
function searchCondition(page, size) {
    let filter = {};
    let emailInput = document.getElementById('email').value.trim();
    let statusInput = document.getElementById('status').value.trim();
    filter.email = emailInput === '' ? null : emailInput;
    filter.status = statusInput === '' ? 'PENDING' : statusInput; // Trạng thái mặc định nếu không chọn
    getOrders(page, size, filter);
}

/**
 * Hàm gửi yêu cầu cập nhật trạng thái đơn hàng tới backend
 * @param {number} orderId - ID đơn hàng
 * @param {string} newStatus - Trạng thái mới
 */
async function updateOrderStatus(orderId, newStatus) {
    if (!orderId || !newStatus) {
        showNotification('Thông tin đơn hàng không hợp lệ.', 'error');
        return;
    }
    const accessToken = getToken();
    const options = {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        };

    try {
        let response = await fetch(`http://localhost:8080/api/v1/orders?id=${orderId}&status=${newStatus}`, options);

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        let data = await response.json();
        console.log('Update successful', data);
        showNotification('Cập nhật trạng thái đơn hàng thành công!', 'success');
        // Cập nhật lại danh sách đơn hàng
        initData(); // Hoặc gọi getOrders với tham số phù hợp
    } catch (error) {
        console.error('Error updating status:', error);
        showNotification('Cập nhật trạng thái đơn hàng thất bại. Vui lòng thử lại.', 'error');
    }
}
