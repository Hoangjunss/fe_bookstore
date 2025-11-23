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

function getToken() {
    return localStorage.getItem('token');
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
    const password = document.getElementById('password').value.trim();
    const reenter_password = document.getElementById('reenter-password').value.trim();
    const role = 'employee'; // Đặt cố định
    // const status = document.getElementById('status').value; // Loại bỏ nếu không cần

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

    if (!password) {
        document.getElementById('error-password').textContent = 'Mật khẩu không được để trống.';
        hasError = true;
    } else if (password.length < 6) { // Kiểm tra độ dài mật khẩu
        document.getElementById('error-password').textContent = 'Mật khẩu phải ít nhất 6 ký tự.';
        hasError = true;
    }

    if (!reenter_password) {
        document.getElementById('error-reenter-password').textContent = 'Vui lòng nhập lại mật khẩu.';
        hasError = true;
    }

    if (password!== reenter_password) {
        document.getElementById('error-reenter-password').textContent = 'Mật khẩu nhập lại không đúng.';
        hasError = true;
    }

    // Nếu có lỗi, dừng việc gửi form
    if (hasError) {
        return;
    }

    // Tạo đối tượng UserRegistrationDTO
    const userDTO = {
        username: username,
        email: email,
        password: password,
        fullname: fullname,
        role: role
        // status: status === "true" // Loại bỏ nếu không cần
    };
    const accessToken = getToken();
            const options = {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userDTO)
            };
    try {
        
        const response = await fetch('http://localhost:8080/api/v1/users/register', options);

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