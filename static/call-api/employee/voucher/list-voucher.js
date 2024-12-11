// voucher-management.js

document.addEventListener('DOMContentLoaded', function () {
    initializeApp();

    // Xử lý sự kiện tìm kiếm voucher
    const btnSearch = document.getElementById('btnSearch');
    if (btnSearch) {
        btnSearch.addEventListener('click', function (e) {
            e.preventDefault();
            fetchVouchers(1, 10); // Tìm kiếm từ trang 1 với kích thước trang 10
        });
    }
});

/**
 * Hàm khởi tạo ứng dụng khi trang được tải
 */
function initializeApp() {
    fetchVouchers(1, 10); // Khởi tạo với trang 1 và kích thước trang 10
}

/**
 * Hàm hiển thị thông báo bằng Toastr
 * @param {string} message - Thông điệp
 * @param {string} type - Loại thông báo: 'success' hoặc 'error'
 */
function showNotification(message, type) {
    toastr.options = {
        "closeButton": true,
        "progressBar": true,
        "positionClass": "toast-top-right",
        "timeOut": "3000",
    };

    if (type === 'success') {
        toastr.success(message);
    } else if (type === 'error') {
        toastr.error(message);
    } else {
        toastr.info(message);
    }
}

/**
 * Hàm lấy danh sách voucher từ backend
 * @param {number} page - Trang hiện tại
 * @param {number} size - Số lượng voucher mỗi trang
 */
async function fetchVouchers(page, size) {
    const nameVoucher = document.getElementById('nameVoucher').value.trim();
    const status = document.getElementById('status').value;

    const params = {
        page: page - 1, // Giả sử backend sử dụng chỉ số trang bắt đầu từ 0
        size: size,
        // Thêm các tham số tìm kiếm nếu backend hỗ trợ
        // nameVoucher: nameVoucher || null,
        // status: status === "" ? null : status === "true"
    };

    // Nếu backend hỗ trợ tìm kiếm, thêm tham số vào params
    // Ví dụ:
    // if (nameVoucher) params.nameVoucher = nameVoucher;
    // if (status !== "") params.status = status === "true";

    try {
        const response = await axios.get('http://localhost:8080/api/v1/voucher', { params });

        const data = response.data;
        console.log('Dữ liệu nhận được:', data);

        populateVoucherTable(data.content);
        renderPagination(data.totalPages, data.number, size);

    } catch (error) {
        console.error('Lỗi khi tải danh sách voucher:', error);
        showNotification('Có lỗi xảy ra khi tải danh sách voucher.', 'error');
    }
}

/**
 * Hàm hiển thị danh sách voucher vào bảng
 * @param {Array} vouchers - Danh sách voucher
 */
function populateVoucherTable(vouchers) {
    const tbody = document.querySelector('#datatable-buttons tbody');
    tbody.innerHTML = ''; // Xóa nội dung cũ

    if (vouchers.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" class="text-center">Không tìm thấy dữ liệu.</td></tr>';
        return;
    }

    vouchers.forEach(voucher => {
        const tr = document.createElement('tr');

        tr.innerHTML = `
            <td>${voucher.id}</td>
            <td>${voucher.nameVoucher}</td>
            <td>${voucher.percent}%</td>
            <td>${formatDate(voucher.startDate)}</td>
            <td>${formatDate(voucher.endDate)}</td>
            <td>${getStatusText(voucher.status)}</td>
            <td>
                <button class="btn btn-warning btn-sm edit-button" data-id="${voucher.id}">Sửa</button>
                <button class="btn btn-danger btn-sm delete-button" data-id="${voucher.id}">Xóa</button>
            </td>
        `;

        tbody.appendChild(tr);
    });

    // Thêm sự kiện cho các nút Sửa và Xóa
    document.querySelectorAll('.edit-button').forEach(button => {
        button.addEventListener('click', function () {
            const voucherId = this.getAttribute('data-id');
            window.location.href = `edit-voucher.html?id=${voucherId}`;
        });
    });

    document.querySelectorAll('.delete-button').forEach(button => {
        button.addEventListener('click', function () {
            const voucherId = this.getAttribute('data-id');
            deleteVoucher(voucherId);
        });
    });
}

/**
 * Hàm định dạng ngày tháng theo định dạng Việt Nam
 * @param {string} dateString - Chuỗi ngày tháng
 * @returns {string} - Chuỗi ngày tháng đã định dạng
 */
function formatDate(dateString) {
    if (!dateString) return 'N/A';
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
 * @param {number} size - Số lượng voucher mỗi trang
 */
function renderPagination(totalPage, currentPage, size) {
    const pagination = document.getElementById('pageId');
    if (!pagination) return;
    pagination.innerHTML = ''; // Xóa các nút phân trang cũ

    // Nút Previous
    const prevClass = currentPage === 0 ? 'disabled' : '';
    const prevLi = createPaginationItem('Previous', !prevClass, () => changePage(currentPage, size));
    pagination.appendChild(prevLi);

    // Các nút trang
    for (let i = 0; i < totalPage; i++) {
        const isActive = currentPage === i;
        const pageLi = createPaginationItem((i + 1).toString(), true, () => changePage(i + 1, size), isActive);
        pagination.appendChild(pageLi);
    }

    // Nút Next
    const nextClass = currentPage === totalPage - 1 ? 'disabled' : '';
    const nextLi = createPaginationItem('Next', !nextClass, () => changePage(currentPage + 2, size));
    pagination.appendChild(nextLi);
}

/**
 * Hàm tạo một mục phân trang
 * @param {string} text - Văn bản hiển thị trên nút.
 * @param {boolean} enabled - Trạng thái kích hoạt của nút.
 * @param {Function} onClick - Hàm được gọi khi nút được nhấn.
 * @param {boolean} isActive - Trạng thái hoạt động của nút.
 * @returns {HTMLLIElement} - Mục phân trang.
 */
function createPaginationItem(text, enabled, onClick, isActive = false) {
    const li = document.createElement('li');
    li.className = `page-item ${!enabled ? 'disabled' : ''} ${isActive ? 'active' : ''}`;

    const a = document.createElement('a');
    a.className = 'page-link';
    a.href = '#';
    a.textContent = text;
    a.addEventListener('click', (event) => {
        event.preventDefault();
        if (enabled && typeof onClick === 'function') {
            onClick();
        }
    });

    li.appendChild(a);
    return li;
}

/**
 * Hàm thay đổi trang khi người dùng nhấn nút phân trang
 * @param {number} page - Trang mới (bắt đầu từ 1)
 * @param {number} size - Số lượng voucher mỗi trang
 */
function changePage(page, size) {
    fetchVouchers(page, size);
}

/**
 * Hàm tìm kiếm voucher theo các điều kiện
 * @param {number} page - Trang mới
 * @param {number} size - Số lượng voucher mỗi trang
 */
function searchVouchers(page, size) {
    fetchVouchers(page, size);
}

/**
 * Hàm xóa voucher
 * @param {number} voucherId - ID voucher
 */
async function deleteVoucher(voucherId) {
    if (confirm("Bạn có chắc chắn là muốn xoá voucher này không?")) {
        try {
            const response = await axios.delete(`http://localhost:8080/api/v1/voucher/${voucherId}`);

            if (response.status === 200) {
                showNotification('Xóa voucher thành công!', 'success');
                // Tải lại danh sách voucher sau khi xóa
                fetchVouchers(1, 10);
            } else {
                throw new Error('Xóa voucher thất bại.');
            }
        } catch (error) {
            console.error('Lỗi khi xóa voucher:', error);
            showNotification('Xóa voucher thất bại. Vui lòng thử lại.', 'error');
        }
    }
}
