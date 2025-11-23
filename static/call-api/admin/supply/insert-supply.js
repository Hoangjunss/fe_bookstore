// Hàm hiển thị thông báo
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

document.addEventListener('DOMContentLoaded', function () {

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

    // Khởi tạo Parsley cho form
    $('#myForm').parsley();

    // Xử lý submit form
    document.getElementById('myForm').addEventListener('submit', async function (e) {
        e.preventDefault(); // Ngăn chặn hành vi mặc định của form

        // Kiểm tra form hợp lệ với Parsley
        if (!$('#myForm').parsley().isValid()) {
            showNotification('Vui lòng sửa các lỗi trong form trước khi gửi.', 'error');
            return;
        }

        // Xóa các thông báo lỗi trước đó
        document.querySelectorAll('.error-message').forEach(el => el.textContent = '');

        // Lấy giá trị từ form
        const name = document.getElementById('name').value.trim();
        const address = document.getElementById('address').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const status = document.getElementById('status').value;

        let hasError = false;

        // Kiểm tra validation thêm (nếu có)
        if (!name) {
            document.getElementById('error-name').textContent = 'Tên nhà cung cấp không được để trống.';
            hasError = true;
        }

        if (!address) {
            document.getElementById('error-address').textContent = 'Vui lòng nhập địa chỉ.';
            hasError = true;
        }

        if (!phone) {
            document.getElementById('error-phone').textContent = 'Số điện thoại không được để trống.';
            hasError = true;
        } else if (!/^\d{10,15}$/.test(phone)) { // Kiểm tra định dạng số điện thoại (10-15 chữ số)
            document.getElementById('error-phone').textContent = 'Số điện thoại không hợp lệ.';
            hasError = true;
        }

        if (!status) {
            document.getElementById('error-status').textContent = 'Vui lòng chọn trạng thái.';
            hasError = true;
        }

        if (hasError) {
            showNotification('Vui lòng sửa các lỗi trong form trước khi gửi.', 'error');
            return; // Dừng việc gửi form nếu có lỗi
        }

        // Tạo đối tượng SupplyCreateDTO
        const supplyCreateDTO = {
            name: name,
            addressCreateDTO: {
                address: address,
                phone: phone
            },
        };

        console.log(supplyCreateDTO);

        try {
            const response = await axios.post('http://localhost:8080/api/v1/supplies', supplyCreateDTO, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200 || response.status === 201) {
                showNotification('Thêm nhà cung cấp thành công!', 'success');
                // Reset form sau khi thêm thành công
                document.getElementById('myForm').reset();
            } else {
                throw new Error('Thêm nhà cung cấp thất bại.');
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
                showNotification('Thêm nhà cung cấp thất bại. Vui lòng thử lại.', 'error');
            }
        }
    });
});
