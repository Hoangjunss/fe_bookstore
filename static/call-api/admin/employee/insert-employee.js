    document.addEventListener('DOMContentLoaded', function () {
        fetchRoles(); // Lấy danh sách vai trò khi tải trang
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
     * Hàm lấy danh sách vai trò từ backend để điền vào dropdown
     */
    async function fetchRoles() {
        try {
            const response = await axios.get('http://localhost:8080/api/roles');
            const roles = response.data;

            const roleSelect = document.getElementById('role');
            roles.forEach(role => {
                const option = document.createElement('option');
                option.value = role.role; // Giả sử 'role' là tên vai trò
                option.textContent = role.role;
                roleSelect.appendChild(option);
            });
        } catch (error) {
            console.error(error);
            showNotification('Có lỗi xảy ra khi tải danh sách chức vụ.', 'error');
        }
    }

    /**
     * Hàm xử lý gửi form thêm nhân viên
     */
    document.getElementById('myForm').addEventListener('submit', async function (e) {
        e.preventDefault(); // Ngăn chặn hành vi mặc định của form

        // Xóa các thông báo lỗi trước đó
        document.querySelectorAll('.error-message').forEach(el => el.textContent = '');

        // Lấy giá trị từ form
        const username = document.getElementById('username').value.trim();
        const email = document.getElementById('email').value.trim();
        const fullname = document.getElementById('fullname').value.trim();
        const role = document.getElementById('role').value;
        const status = document.getElementById('status').value;

        let hasError = false;

        // Kiểm tra validation
        if (!username) {
            document.getElementById('error-username').textContent = 'Tên đăng nhập không được để trống.';
            hasError = true;
        }

        if (!email) {
            document.getElementById('error-email').textContent = 'Email không được để trống.';
            hasError = true;
        } else if (!/^\S+@\S+\.\S+$/.test(email)) { // Kiểm tra định dạng email
            document.getElementById('error-email').textContent = 'Email không hợp lệ.';
            hasError = true;
        }

        if (!fullname) {
            document.getElementById('error-fullname').textContent = 'Họ và tên không được để trống.';
            hasError = true;
        }

        if (!role) {
            document.getElementById('error-role').textContent = 'Vui lòng chọn chức vụ.';
            hasError = true;
        }

        if (!status) {
            document.getElementById('error-status').textContent = 'Vui lòng chọn trạng thái.';
            hasError = true;
        }

        if (hasError) {
            return; // Dừng việc gửi form nếu có lỗi
        }

        // Tạo đối tượng UserDTO
        const userDTO = {
            username: username,
            email: email,
            fullname: fullname,
            role: role,
            status: status === "true"
        };

        try {
            const response = await axios.post('http://localhost:8080/api/employees', userDTO);

            if (response.status === 200 || response.status === 201) {
                showNotification('Thêm nhân viên thành công!', 'success');
                // Reset form sau khi thêm thành công
                document.getElementById('myForm').reset();
            } else {
                throw new Error('Thêm nhân viên thất bại.');
            }
        } catch (error) {
            console.error(error);
            // Kiểm tra nếu lỗi là validation từ backend
            if (error.response && error.response.data && error.response.data.errors) {
                const errors = error.response.data.errors;
                for (const key in errors) {
                    if (errors.hasOwnProperty(key)) {
                        const errorMessage = errors[key];
                        const errorElement = document.getElementById(`error-${key}`);
                        if (errorElement) {
                            errorElement.textContent = errorMessage;
                        }
                    }
                }
            } else {
                showNotification('Thêm nhân viên thất bại. Vui lòng thử lại.', 'error');
            }
        }
    });