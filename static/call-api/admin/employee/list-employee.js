document.addEventListener('DOMContentLoaded', function () {
    fetchEmployees(1, 10); // Khởi tạo với trang 1 và kích thước trang 10
    document.getElementById('btnSearch').addEventListener('click', function() {
        var fullname = document.getElementById('fullname').value.trim();
        searchEmployees(0, 10, fullname); // Khởi tạo tìm kiếm từ trang 1 với kích thước trang 10 và tên nhân viên tìm kiếm
    });
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
 * Hàm lấy danh sách nhân viên từ backend
 * @param {number} page - Trang hiện tại (bắt đầu từ 1)
 * @param {number} size - Số lượng nhân viên mỗi trang
 */
async function fetchEmployees(page, size) {

    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhYmMxNSIsInJvbGVzIjpbImVtcGxveWVlIl0sImlhdCI6MTczMDg1Mzk0MywiZXhwIjoxNzMzNDQ1OTQzfQ.JS3tBJV0DynzmlOMFVLtcE_z_-69RfAdj9cvoMdMA5g';


    const params = {
        role: 'employee', // Nếu không chọn, gửi rỗng hoặc loại bỏ tham số
        page: page - 1, // Giả sử backend sử dụng chỉ số trang bắt đầu từ 0
        size: size,
    };

    try {
        const response = await axios.get('http://localhost:8080/api/v1/users',
            {
                params,
                
             }
        );

        const data = response.data;
        console.log(data);

        populateEmployeeTable(data.content);
        renderPagination(data.totalPages, data.number, size);

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
    console.log(employees);
    employees.forEach(employee => {
        if(employee.role == 'employee'){
            const tr = document.createElement('tr');

        tr.innerHTML = `
            <td>${employee.id}</td>
            <td>${employee.username}</td>
            <td>${employee.email}</td>
            <td>${employee.fullname}</td>
            <td>${employee.role}</td>
            <td>${getStatusText(employee.locked)}</td>
            <td>
            <button class="btn btn-primary btn-sm edit-button" data-id="${employee.id}">Sửa</button>
                <button class="btn btn-warning btn-sm toggle-lock-button" data-id="${employee.id}" data-status="${employee.status}">
                    ${employee.locked == false ? 'Khóa' : 'Mở khóa'}
                </button>
            </td>
        `;

        tbody.appendChild(tr);
        }
        
    });

    // Thêm sự kiện cho các nút Sửa và Khóa
    document.querySelectorAll('.edit-button').forEach(button => {
        button.addEventListener('click', function () {
            const employeeId = this.getAttribute('data-id');
            window.location.href = `update-employee.php?id=${employeeId}`;
        });
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
    return status == false ? 'ACTIVE' : 'INACTIVE';
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
    if (confirm("Bạn có chắc chắn là muốn khóa nhân viên này không?")) {
        try {
            const response = await axios.post(`http://localhost:8080/api/v1/users/lock`, null, {
                params: { integer: employeeId } // Tên tham số 'integer' theo BE của bạn
            });

            if (response.status === 200) {
                showNotification('Thay đổi trạng thái nhân viên thành công!', 'success');
                // Tải lại danh sách nhân viên sau khi khóa
                fetchEmployees(1, 10);
            } else {
                throw new Error('Khóa nhân viên thất bại.');
            }
        } catch (error) {
            console.error(error);
            showNotification('Khóa nhân viên thất bại. Vui lòng thử lại.', 'error');
        }
    }
}


    /**
     * 
     * Search nhân viên
     * @param {fullname}
     */
    async function searchEmployees(page, size, fullname){
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/users/search`, {
                params: {
                    search: fullname,
                    page: page,
                    size: size
                }
            });
            const data = response.data;
            console.log(data);

            populateEmployeeTable(data.content);
            renderPagination(data.totalPages, data.number, size);
        } catch (error) {
            console.error(error);
            showNotification('Khóa nhân viên thất bại. Vui lòng thử lại.', 'error');
        }
    }
