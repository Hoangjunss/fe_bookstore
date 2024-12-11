document.addEventListener('DOMContentLoaded', () => {
    initializeApp();

    // Thêm sự kiện cho nút "Tìm kiếm"
    const btnSearch = document.getElementById('btnSearch');
    if (btnSearch) {
        btnSearch.addEventListener('click', (e) => {
            e.preventDefault();
            handleSearch();
        });
    }
});

/**
 * Hàm khởi tạo ứng dụng khi trang được tải
 */
function initializeApp() {
    const initialPage = 1;
    const initialSize = 10;
    fetchSupplies(initialPage, initialSize);
}

/**
 * Hàm hiển thị thông báo
 * @param {string} message - Thông điệp
 * @param {string} type - Loại thông báo: 'success' hoặc 'error'
 */
function showNotification(message, type) {
    const notificationContainer = document.getElementById('notification-container');
    if (!notificationContainer) return;

    const notification = document.createElement('div');
    notification.className = `notification ${type} show`;
    notification.innerHTML = `
        <span>${message}</span>
        <span class="close">&times;</span>
    `;

    notificationContainer.appendChild(notification);

    // Tự động ẩn sau 3 giây
    setTimeout(() => {
        hideNotification(notification);
    }, 3000);

    // Thêm sự kiện đóng khi nhấp vào nút close
    notification.querySelector('.close').addEventListener('click', () => {
        hideNotification(notification);
    });
}

/**
 * Hàm ẩn thông báo
 * @param {HTMLElement} notification - Thẻ thông báo
 */
function hideNotification(notification) {
    notification.classList.remove('show');
    notification.classList.add('disappear');
    notification.addEventListener('transitionend', () => {
        notification.remove();
    });
}

/**
 * Hàm lấy danh sách nhà cung cấp từ backend
 * @param {number} page - Trang hiện tại (bắt đầu từ 1)
 * @param {number} size - Số lượng nhà cung cấp mỗi trang
 */
async function fetchSupplies(page, size) {
    const name = document.getElementById('title') ? document.getElementById('title').value.trim() : '';

    let endpoint = 'http://localhost:8080/api/v1/supplies';
    let params = {
        page: page - 1, // Backend bắt đầu từ 0
        size: size
    };

    // Nếu có tìm kiếm theo tên, sử dụng endpoint tìm kiếm
    if (name) {
        endpoint = 'http://localhost:8080/api/v1/supplies/search-by-name-containing';
        params = { name };
    }

    try {
        const response = await axios.get(endpoint, { params });

        if (response.data) {
            let supplies;
            let totalPages = 1;
            let currentPage = 0;

            if (Array.isArray(response.data)) {
                // Khi sử dụng endpoint không phân trang
                supplies = response.data;
            } else if (response.data.content) {
                // Khi sử dụng endpoint phân trang
                supplies = response.data.content;
                totalPages = response.data.totalPages;
                currentPage = response.data.number;
            } else {
                throw new Error('Dữ liệu không hợp lệ từ backend.');
            }

            console.log('Dữ liệu nhận được:', supplies);

            populateSupplyTable(supplies);
            if (name) {
                // Khi tìm kiếm không phân trang, ẩn phân trang
                document.getElementById('pageId').style.display = 'none';
            } else {
                // Hiển thị phân trang khi không tìm kiếm
                document.getElementById('pageId').style.display = 'block';
                renderPagination(totalPages, currentPage, size);
            }
        } else {
            throw new Error('Dữ liệu không hợp lệ từ backend.');
        }

    } catch (error) {
        console.error('Lỗi khi tải danh sách nhà cung cấp:', error);
        showNotification('Có lỗi xảy ra khi tải danh sách nhà cung cấp.', 'error');
    }
}

/**
 * Hàm hiển thị danh sách nhà cung cấp vào bảng
 * @param {Array} supplies - Danh sách nhà cung cấp
 */
function populateSupplyTable(supplies) {
    const tbody = document.querySelector('#datatable-buttons tbody');
    if (!tbody) return;
    tbody.innerHTML = ''; // Xóa nội dung cũ

    if (supplies.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="text-center">Không tìm thấy dữ liệu.</td></tr>';
        return;
    }

    supplies.forEach(supply => {
        const tr = document.createElement('tr');

        tr.innerHTML = `
            <td>${supply.id}</td>
            <td>${supply.name}</td>
            <td>${supply.addressDTO ? `${supply.addressDTO.address} (${supply.addressDTO.phone})` : 'N/A'}</td>
            <td>${supply.addressDTO ? supply.addressDTO.phone : 'N/A'}</td>
            <td>${getStatusText(supply.status)}</td>
            <td>
                <button class="btn btn-warning btn-sm edit-button" data-id="${supply.id}">Sửa</button>
                <button class="btn btn-secondary btn-sm toggle-status-button" data-id="${supply.id}">${supply.status ? 'Ngưng hoạt động' : 'Kích hoạt'}</button>
            </td>
        `;

        tbody.appendChild(tr);
    });

    // Sử dụng Event Delegation để thêm sự kiện cho các nút Sửa và Nghịch Đảo Trạng Thái
    tbody.querySelectorAll('.edit-button').forEach(button => {
        button.addEventListener('click', () => {
            const supplyId = button.getAttribute('data-id');
            window.location.href = `edit-supply.php?id=${supplyId}`;
        });
    });

    tbody.querySelectorAll('.toggle-status-button').forEach(button => {
        button.addEventListener('click', () => {
            const supplyId = button.getAttribute('data-id');
            toggleSupplyStatus(supplyId);
        });
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
 * @param {number} size - Số lượng nhà cung cấp mỗi trang
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
 * @param {number} size - Số lượng nhà cung cấp mỗi trang
 */
function changePage(page, size) {
    fetchSupplies(page, size);
}

/**
 * Hàm tìm kiếm nhà cung cấp theo tên
 */
function handleSearch() {
    const page = 1;
    const size = 10;
    fetchSupplies(page, size);
}

/**
 * Hàm nghịch đảo trạng thái của nhà cung cấp
 * @param {number} supplyId - ID nhà cung cấp
 */
async function toggleSupplyStatus(supplyId) {
    if (confirm("Bạn có chắc chắn muốn thay đổi trạng thái của nhà cung cấp này không?")) {
        try {
            const response = await axios.put(`http://localhost:8080/api/v1/supplies/toggle-status/${supplyId}`);

            if (response.status === 200) {
                showNotification('Thay đổi trạng thái nhà cung cấp thành công!', 'success');
                // Tải lại danh sách nhà cung cấp sau khi thay đổi trạng thái
                fetchSupplies(1, 10);
            } else {
                throw new Error('Thay đổi trạng thái nhà cung cấp thất bại.');
            }
        } catch (error) {
            console.error('Lỗi khi thay đổi trạng thái nhà cung cấp:', error);
            showNotification('Thay đổi trạng thái nhà cung cấp thất bại. Vui lòng thử lại.', 'error');
        }
    }
}
