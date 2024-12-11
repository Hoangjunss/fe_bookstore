// update-employee.js

document.addEventListener('DOMContentLoaded', function () {
    // Lấy ID nhân viên từ URL
    const urlParams = new URLSearchParams(window.location.search);
    const employeeId = urlParams.get('id');

    if (employeeId) {
        fetchEmployeeData(employeeId);
    } else {
        alert('Không tìm thấy ID nhân viên.');
       // window.location.href = 'list-employee.php';
    }

    // Xử lý submit form
    document.getElementById('updateEmployeeForm').addEventListener('submit', function (e) {
        e.preventDefault(); // Ngăn form submit mặc định
        updateEmployee(employeeId);
    });

    // Fetch và populate danh sách chức vụ vào dropdown
    //fetchRoles();
    document.getElementById('logout-btn').addEventListener('click', function() {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('username');
        window.location.href = '../../auth/login.php'; // Chuyển về trang login
    });
});

/**
 * Hàm fetch dữ liệu nhân viên từ backend và điền vào form
 * @param {number} employeeId - ID nhân viên
 */
async function fetchEmployeeData(employeeId) {
    try {
        const response = await axios.get(`http://localhost:8080/api/v1/users/${employeeId}`);

        if (response.status === 200) {
            const employee = response.data;
            populateForm(employee);
        } else {
            throw new Error('Không thể lấy dữ liệu nhân viên.');
        }
    } catch (error) {
        console.error('Error fetching employee data:', error);
        alert('Không thể lấy dữ liệu nhân viên. Vui lòng thử lại sau.');
        //window.location.href = 'list-employee.php';
    }
}

/**
 * Hàm populate dữ liệu vào form
 * @param {object} employee - Đối tượng nhân viên
 */
function populateForm(employee) {
    document.getElementById('id').value = employee.id;
    document.getElementById('username').value = employee.username;
    document.getElementById('email').value = employee.email;
    document.getElementById('fullname').value = employee.fullname;
    document.getElementById('status').value = employee.status ? 'true' : 'false';
}

/**
 * Hàm fetch danh sách chức vụ từ API và populate vào dropdown
 */
async function fetchRoles() {
    try {
        // Giả sử bạn có endpoint để lấy danh sách chức vụ
        const response = await axios.get('http://localhost:8080/api/v1/roles');

        if (response.status === 200) {
            const roles = response.data;
            populateRoleDropdown(roles);
        } else {
            throw new Error('Không thể tải danh sách chức vụ.');
        }
    } catch (error) {
        console.error('Error fetching roles:', error);
        document.getElementById('error-role').textContent = 'Không thể tải danh sách chức vụ.';
    }
}

/**
 * Hàm populate danh sách chức vụ vào dropdown
 * @param {Array} roles - Danh sách chức vụ
 */
function populateRoleDropdown(roles) {
    const roleSelect = document.getElementById('role');
    roles.forEach(role => {
        const option = document.createElement('option');
        option.value = role.name;
        option.textContent = role.displayName;
        roleSelect.appendChild(option);
    });
}

/**
 * Hàm cập nhật nhân viên
 * @param {number} employeeId - ID nhân viên
 */
async function updateEmployee(employeeId) {

        // Lấy từng trường từ form
        const id = parseInt(document.getElementById('id').value);
        const username = document.getElementById('username').value.trim();
        const email = document.getElementById('email').value.trim();
        const fullname = document.getElementById('fullname').value.trim();
        const locked = document.getElementById('status').value === 'true';
    
        // Tạo đối tượng userDTO
        const userDTO = {
            id: id,
            username: username,
            email: email,
            fullname: fullname,
            role: 'employee',
            locked: locked
        };

    const form = document.getElementById('updateEmployeeForm');
    const formData = new FormData(form);

    // Nếu mật khẩu không được nhập, loại bỏ nó khỏi FormData
    const password = formData.get('password');
    if (!password) {
        formData.delete('password');
    }

    try {
        const response = await axios.patch(`http://localhost:8080/api/v1/users`, userDTO, {
            headers: {
                'Content-Type': 'application/json',


            }
        });

        if (response.status === 200) {
            showNotification('Cập nhật nhân viên thành công!', 'success');
            setTimeout(() => {
                window.location.href = 'list-employee.php';
            }, 2000);
        } else {
            throw new Error('Cập nhật nhân viên thất bại.');
        }
    } catch (error) {
        console.error('Error updating employee:', error);
        if (error.response && error.response.data && error.response.data.message) {
            showNotification(error.response.data.message, 'error');
        } else {
            showNotification('Có lỗi xảy ra khi cập nhật nhân viên.', 'error');
        }
    }
}

/**
 * Hàm hiển thị thông báo
 * @param {string} message - Thông điệp thông báo
 * @param {string} type - Loại thông báo ('success' hoặc 'error')
 */
function showNotification(message, type) {
    const notificationContainer = document.getElementById('notification-container');
    const notification = document.createElement('div');
    notification.classList.add('notification', type, 'show');
    notification.innerHTML = `
        <span>${message}</span>
        <span class="close">&times;</span>
    `;
    notificationContainer.appendChild(notification);

    // Tự động ẩn thông báo sau 3 giây
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 3000);

    notification.querySelector('.close').addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 500);
    });
}
