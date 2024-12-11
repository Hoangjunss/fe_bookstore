document.addEventListener('DOMContentLoaded', function () {
    fetchWarehouses(1, 10); // Khởi tạo với trang 1 và kích thước trang 10
    fetchSupplies(); // Lấy danh sách nhà cung cấp để điền vào dropdown tìm kiếm
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
 * Hàm lấy danh sách nhà cung cấp từ backend để điền vào dropdown tìm kiếm
 */
async function fetchSupplies() {
    try {
        const response = await axios.get('http://localhost:8081/api/v1/warehouse-receipts/warehouse?page=0&size=100');
        const supplies = response.data.content;

        const supplySelect = document.getElementById('supplyName');
        supplies.forEach(supply => {
            const option = document.createElement('option');
            option.value = supply.id;
            option.textContent = supply.name;
            supplySelect.appendChild(option);
        });
    } catch (error) {
        console.error(error);
        showNotification('Có lỗi xảy ra khi tải danh sách nhà cung cấp.', 'error');
    }
}

/**
 * Hàm lấy danh sách Warehouse Receipt từ backend
 * @param {number} page - Trang hiện tại
 * @param {number} size - Số lượng Warehouse Receipt mỗi trang
 */
async function fetchWarehouses(page, size) {
    const supplyNameElement = document.getElementById('supplyName');
    const quantityElement = document.getElementById('quantity');
    const statusElement = document.getElementById('status');
    const dateElement = document.getElementById('date');

    const supplyName = supplyNameElement ? supplyNameElement.value.trim() : null;
    const quantity = quantityElement ? quantityElement.value.trim() : null;
    const status = statusElement ? statusElement.value : null;
    const date = dateElement ? dateElement.value : null;
    const params = {
        page: page - 1, // Giả sử backend sử dụng chỉ số trang bắt đầu từ 0
        size: size,
        name: supplyName || null,
        quantity: quantity ? parseInt(quantity) : null,
        status: status === "" ? null : (status === "true"),
        date: date || null
    };

    try {
        const response = await axios.get('http://localhost:8081/api/v1/warehouse-receipts/warehouse', { params });

        const data = response.data;
        console.log(data);

        populateWarehouseTable(data.content);
        renderPagination(data.totalPages, data.number, size);

    } catch (error) {
        console.error(error);
        showNotification('Có lỗi xảy ra khi tải danh sách phiếu nhập kho.', 'error');
    }
}

/**
 * Hàm hiển thị danh sách Warehouse Receipt vào bảng
 * @param {Array} warehouses - Danh sách Warehouse Receipt
 */
function populateWarehouseTable(warehouses) {
    const tbody = document.querySelector('#datatable-buttons tbody');
    tbody.innerHTML = ''; // Xóa nội dung cũ

    if (warehouses.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" class="text-center">Không tìm thấy dữ liệu.</td></tr>';
        return;
    }

    warehouses.forEach(wh => {
        const tr = document.createElement('tr');

        tr.innerHTML = `
                <td>${wh.id}</td>
                <td>${wh.supplyName}</td>
                <td>${wh.quantity}</td>
                <td>${formatPrice(wh.totalPrice)}</td>
                <td>${getStatusText(wh.status)}</td>
                <td>${formatDate(wh.date)}</td>
                <td>
                    <button class="btn btn-info btn-sm view-button" data-id="${wh.id}">Xem</button>
                </td>
            `;

        tbody.appendChild(tr);
    });

    // Thêm sự kiện cho các nút Xem, Sửa và Xóa
    document.querySelectorAll('.view-button').forEach(button => {
        button.addEventListener('click', function () {
            const warehouseReceiptId = this.getAttribute('data-id');
            window.location.href = `warehousereceipt-detail.php?id=${warehouseReceiptId}`;
        });
    });

    document.querySelectorAll('.edit-button').forEach(button => {
        button.addEventListener('click', function () {
            const warehouseReceiptId = this.getAttribute('data-id');
            window.location.href = `edit-warehousereceipt.html?id=${warehouseReceiptId}`;
        });
    });

    document.querySelectorAll('.delete-button').forEach(button => {
        button.addEventListener('click', function () {
            const warehouseReceiptId = this.getAttribute('data-id');
            deleteWarehouseReceipt(warehouseReceiptId);
        });
    });
}

/**
 * Hàm định dạng số tiền
 * @param {number} price - Giá tiền
 * @returns {string} - Chuỗi định dạng tiền tệ
 */
function formatPrice(price) {
    return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}

/**
 * Hàm định dạng ngày tháng theo định dạng Việt Nam
 * @param {string} dateString - Chuỗi ngày tháng
 * @returns {string} - Chuỗi ngày tháng đã định dạng
 */
function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

/**
 * Hàm chuyển đổi trạng thái từ boolean sang văn bản
 * @param {boolean} status - Trạng thái: true (ACTIVE) hoặc false (INACTIVE)
 * @returns {string} - Văn bản trạng thái
 */
function getStatusText(status) {
    return status ? 'ACTIVE' : 'INACTIVE';
}

/**
 * Hàm render các nút phân trang
 * @param {number} totalPage - Tổng số trang
 * @param {number} currentPage - Trang hiện tại (bắt đầu từ 0)
 * @param {number} size - Số lượng Warehouse Receipt mỗi trang
 */
function renderPagination(totalPage, currentPage, size) {
    let pagination = document.getElementById('pageId');
    pagination.innerHTML = ''; // Xóa các nút phân trang cũ

    // Nút Previous
    let prevClass = currentPage === 0 ? 'disabled' : '';
    let prevLi = document.createElement('li');
    prevLi.className = `page-item ${prevClass}`;
    prevLi.innerHTML = `<a class="page-link" href="#" onclick="changePage(${currentPage}, ${size}, event)">Previous</a>`;
    pagination.appendChild(prevLi);

    // Các nút trang
    for (let i = 0; i < totalPage; i++) {
        let activeClass = currentPage === i ? 'active' : '';
        let li = document.createElement('li');
        li.className = `page-item ${activeClass}`;
        li.innerHTML = `<a class="page-link" href="#" onclick="changePage(${i + 1}, ${size}, event)">${i + 1}</a>`;
        pagination.appendChild(li);
    }

    // Nút Next
    let nextClass = currentPage === totalPage - 1 ? 'disabled' : '';
    let nextLi = document.createElement('li');
    nextLi.className = `page-item ${nextClass}`;
    nextLi.innerHTML = `<a class="page-link" href="#" onclick="changePage(${currentPage + 2}, ${size}, event)">Next</a>`;
    pagination.appendChild(nextLi);
}

/**
 * Hàm thay đổi trang khi người dùng nhấn nút phân trang
 * @param {number} page - Trang mới (bắt đầu từ 1)
 * @param {number} size - Số lượng Warehouse Receipt mỗi trang
 * @param {Event} event - Sự kiện click
 */
function changePage(page, size, event) {
    event.preventDefault();
    fetchWarehouses(page, size);
}

/**
 * Hàm tìm kiếm Warehouse Receipt theo các điều kiện
 * @param {number} page - Trang mới
 * @param {number} size - Số lượng Warehouse Receipt mỗi trang
 */
function searchWarehouses(page, size) {
    fetchWarehouses(page, size);
}

/**
 * Thêm sự kiện tìm kiếm khi nhấn nút "Tìm kiếm"
 */
document.getElementById('btnSearch').addEventListener('click', function (e) {
    e.preventDefault();
    searchWarehouses(1, 10); // Khởi tạo tìm kiếm từ trang 1 với kích thước trang 10
});

/**
 * Hàm xóa Warehouse Receipt
 * @param {number} warehouseReceiptId - ID Warehouse Receipt
 */
async function deleteWarehouseReceipt(warehouseReceiptId) {
    if (confirm("Bạn có chắc chắn là muốn xoá phiếu nhập kho này không?")) {
        try {
            const response = await axios.delete(`http://localhost:8081/api/warehousereceipts/${warehouseReceiptId}`);

            if (response.status === 200) {
                showNotification('Xóa phiếu nhập kho thành công!', 'success');
                // Tải lại danh sách Warehouse Receipt sau khi xóa
                fetchWarehouses(1, 10);
            } else {
                throw new Error('Xóa phiếu nhập kho thất bại.');
            }
        } catch (error) {
            console.error(error);
            showNotification('Xóa phiếu nhập kho thất bại. Vui lòng thử lại.', 'error');
        }
    }
}