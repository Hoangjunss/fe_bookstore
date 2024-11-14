// list-supply.js

document.addEventListener('DOMContentLoaded', function () {
    fetchSupplies(1, 10); // Khởi tạo với trang 1 và kích thước trang 10
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
 * Hàm lấy danh sách nhà cung cấp từ backend
 * @param {number} page - Trang hiện tại (bắt đầu từ 1)
 * @param {number} size - Số lượng nhà cung cấp mỗi trang
 */
async function fetchSupplies(page, size) {
    const title = document.getElementById('title').value.trim();
    const categoryId = document.getElementById('categoryId').value.trim(); // Nếu có
    const saleStartPrice = document.getElementById('saleStartPrice').value.trim();
    const saleEndPrice = document.getElementById('saleEndPrice').value.trim();

    const params = {
        page: page - 1, // Backend bắt đầu từ 0
        size: size,
        title: title || null,
        categoryId: categoryId || null,
        saleStartPrice: saleStartPrice ? parseFloat(saleStartPrice) : null,
        saleEndPrice: saleEndPrice ? parseFloat(saleEndPrice) : null
    };

    try {
        const response = await axios.get('http://localhost:8080/api/v1/supplies', { params });

        if (response.data && response.data.content) {
            const data = response.data;
            console.log(data);

            populateSupplyTable(data.content);
            renderPagination(data.totalPages, data.number, size);
        } else {
            throw new Error('Dữ liệu không hợp lệ từ backend.');
        }

    } catch (error) {
        console.error(error);
        showNotification('Có lỗi xảy ra khi tải danh sách nhà cung cấp.', 'error');
    }
}

/**
 * Hàm hiển thị danh sách nhà cung cấp vào bảng
 * @param {Array} supplies - Danh sách nhà cung cấp
 */
function populateSupplyTable(supplies) {
    const tbody = document.querySelector('#datatable-buttons tbody');
    tbody.innerHTML = ''; // Xóa nội dung cũ

    if (supplies.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" class="text-center">Không tìm thấy dữ liệu.</td></tr>';
        return;
    }

    supplies.forEach(supply => {
        const tr = document.createElement('tr');

        tr.innerHTML = `
            <td>${supply.id}</td>
            <td>${supply.name}</td>
            <td>${supply.addressDTO ? supply.addressDTO.address : 'N/A'} (${supply.addressDTO ? supply.addressDTO.phone : 'N/A'})</td>
            <td>${supply.addressDTO ? supply.addressDTO.phone : 'N/A'}</td>
            <td>${getStatusText(supply.status)}</td>
            <td>
                <button class="btn btn-warning btn-sm edit-button" data-id="${supply.id}">Sửa</button>
                <button class="btn btn-danger btn-sm delete-button" data-id="${supply.id}">Xóa</button>
            </td>
        `;

        tbody.appendChild(tr);
    });

    // Sử dụng Event Delegation để thêm sự kiện cho các nút Sửa và Xóa
    tbody.querySelectorAll('.edit-button').forEach(button => {
        button.addEventListener('click', function () {
            const supplyId = this.getAttribute('data-id');
            window.location.href = `edit-supply.html?id=${supplyId}`;
        });
    });

    tbody.querySelectorAll('.delete-button').forEach(button => {
        button.addEventListener('click', function () {
            const supplyId = this.getAttribute('data-id');
            deleteSupply(supplyId);
        });
    });
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
 * @param {number} size - Số lượng nhà cung cấp mỗi trang
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
 * @param {number} size - Số lượng nhà cung cấp mỗi trang
 * @param {Event} event - Sự kiện click
 */
function changePage(page, size, event) {
    event.preventDefault();
    fetchSupplies(page, size);
}

/**
 * Hàm tìm kiếm nhà cung cấp theo các điều kiện
 * @param {number} page - Trang mới
 * @param {number} size - Số lượng nhà cung cấp mỗi trang
 */
function searchSupplies(page, size) {
    fetchSupplies(page, size);
}

/**
 * Thêm sự kiện tìm kiếm khi nhấn nút "Tìm kiếm"
 */
document.getElementById('btnSearch').addEventListener('click', function (e) {
    e.preventDefault();
    searchSupplies(1, 10); // Khởi tạo tìm kiếm từ trang 1 với kích thước trang 10
});

/**
 * Hàm xóa nhà cung cấp
 * @param {number} supplyId - ID nhà cung cấp
 */
async function deleteSupply(supplyId) {
    if (confirm("Bạn có chắc chắn là muốn xoá nhà cung cấp này không?")) {
        try {
            const response = await axios.delete(`http://localhost:8080/api/v1/supplies/${supplyId}`);

            if (response.status === 200) {
                showNotification('Xóa nhà cung cấp thành công!', 'success');
                // Tải lại danh sách nhà cung cấp sau khi xóa
                fetchSupplies(1, 10);
            } else {
                throw new Error('Xóa nhà cung cấp thất bại.');
            }
        } catch (error) {
            console.error(error);
            showNotification('Xóa nhà cung cấp thất bại. Vui lòng thử lại.', 'error');
        }
    }
}
