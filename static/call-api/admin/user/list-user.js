document.addEventListener('DOMContentLoaded', function () {
    fetchEmployees(1, 10); // Khởi tạo với trang 1 và kích thước trang 10
    document.getElementById('btnSearch').addEventListener('click', function() {
        var fullname = document.getElementById('fullname').value.trim();
        searchEmployees(1, 10, fullname); // Khởi tạo tìm kiếm từ trang 1 với kích thước trang 10 và tên nhân viên tìm kiếm
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

function getToken() {
    return localStorage.getItem('token');
}

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
 * Hàm lấy danh sách nhân viên từ backend
 * @param {number} page - Trang hiện tại (bắt đầu từ 1)
 * @param {number} size - Số lượng nhân viên mỗi trang
 */
async function fetchEmployees(page, size) {
    const fullname = document.getElementById('fullname').value.trim();

    const queryParams = new URLSearchParams({
        role: 'customer', // Lọc theo role 'employee'
        page: page - 1,    // Giả sử backend sử dụng chỉ số trang bắt đầu từ 0
        size: size
    });

    const accessToken = getToken();
    const options = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }
    };

    try {
        const response = await fetch(`http://localhost:8080/api/v1/users?${queryParams.toString()}`, options);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || 'Tìm kiếm nhân viên thất bại.');
        }

        const data = await response.json();
        console.log(data);

        populateEmployeeTable(data.content);
        renderPagination(data.totalPages, data.number + 1, size); // `data.number` có thể cần cộng thêm 1 nếu bắt đầu từ 0


    } catch (error) {
        console.error(error);
        showNotification('Có lỗi xảy ra khi tải danh sách nhân viên.', 'error');
    }
}

/**
 * Hàm hiển thị danh sách nhân viên vào bảng
 * @param {Array} employees - Danh sách nhân viên
 */
function populateEmployeeTable(employees) {
    const tbody = document.querySelector('#datatable-buttons tbody');
    tbody.innerHTML = ''; // Xóa nội dung cũ

    if (employees.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="text-center">Không tìm thấy dữ liệu.</td></tr>';
        return;
    }

    employees.forEach(employee => {
        if(employee.role == 'customer') {
            const tr = document.createElement('tr');

        tr.innerHTML = `
            <td>${employee.id}</td>
            <td>${employee.username}</td>
            <td>${employee.email}</td>
            <td>${employee.fullname}</td>
            <td>${employee.role}</td>
            <td>${getStatusText(employee.locked)}</td>
            <td>
                <button class="btn btn-warning btn-sm toggle-lock-button" data-id="${employee.id}" data-status="${employee.status}">
                ${employee.locked === true ? 'Mở Khóa' : 'Khóa'}
                </button>
            </td>
        `;

        tbody.appendChild(tr);
        }
    });
    document.querySelectorAll('.toggle-lock-button').forEach(button => {
        button.addEventListener('click', function () {
            const employeeId = this.getAttribute('data-id');
            lockEmployee(employeeId);
        });
    });
}

/**
 * Hàm render các nút phân trang
 * @param {number} totalPage - Tổng số trang
 * @param {number} currentPage - Trang hiện tại (bắt đầu từ 0)
 * @param {number} size - Số lượng nhân viên mỗi trang
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
 * Hàm chuyển đổi trạng thái từ số sang văn bản
 * @param {number} status - Trạng thái: 1 (ACTIVE) hoặc 0 (INACTIVE)
 * @returns {string} - Văn bản trạng thái
 */
function getStatusText(status) {
    return status === false ? 'ACTIVE' : 'INACTIVE';
}

/**
 * Hàm thay đổi trang khi người dùng nhấn nút phân trang
 * @param {number} page - Trang mới (bắt đầu từ 1)
 * @param {number} size - Số lượng nhân viên mỗi trang
 * @param {Event} event - Sự kiện click
 */
function changePage(page, size, event) {
    event.preventDefault();
    fetchEmployees(page, size);
}

/**
 * Hàm khóa nhân viên
 * @param {number} employeeId - ID nhân viên
 */
async function lockEmployee(employeeId) {
    if (confirm("Bạn có chắc chắn là muốn thay đổi trạng thái người dùng này không?")) {
        const accessToken = getToken();
        if (!accessToken) {
            showNotification('Không tìm thấy token xác thực. Vui lòng đăng nhập lại.', 'error');
            return;
        }

        // Tạo chuỗi tham số truy vấn
        const queryParams = new URLSearchParams({
            integer: employeeId // Tên tham số 'integer' theo BE của bạn
        });

        // Định nghĩa các tùy chọn cho fetch
        const options = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        };

        try {
            // Gửi yêu cầu fetch với URL chứa tham số truy vấn và options
            const response = await fetch(`http://localhost:8080/api/v1/users/lock?${queryParams.toString()}`, options);

            if (response.ok) {
                showNotification('Khóa thành công!', 'success');
                // Tải lại danh sách nhân viên sau khi khóa
                fetchEmployees(1, 10);
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Khóa thất bại.');
            }
        } catch (error) {
            console.error(error);
            showNotification('Khóa thất bại. Vui lòng thử lại.', 'error');
        }
    }
}

    /**
     * 
     * Search nhân viên
     * @param {fullname}
     */
async function searchEmployees(page, size, fullname) {
    const accessToken = getToken();
    if (!accessToken) {
        showNotification('Không tìm thấy token xác thực. Vui lòng đăng nhập lại.', 'error');
        return;
    }

    // Tạo chuỗi tham số truy vấn
    const queryParams = new URLSearchParams({
        search: fullname || '', // Nếu fullname trống, gửi rỗng
        page: page - 1, // Giả sử backend sử dụng chỉ số trang bắt đầu từ 0
        size: size
    });

    // Định nghĩa các tùy chọn cho fetch
    const options = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }
    };

    try {
        // Gửi yêu cầu fetch với URL chứa tham số truy vấn và options
        const response = await fetch(`http://localhost:8080/api/v1/users/search?${queryParams.toString()}`, options);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Tìm kiếm thất bại.');
        }

        const data = await response.json();
        console.log(data);

        populateEmployeeTable(data.content);
        renderPagination(data.totalPages, data.number + 1, size); // `data.number` có thể cần cộng thêm 1 nếu bắt đầu từ 0

    } catch (error) {
        console.error(error);
        showNotification('Tìm kiếm thất bại. Vui lòng thử lại.', 'error');
    }
}
