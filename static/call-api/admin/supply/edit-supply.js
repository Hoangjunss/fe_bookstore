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
    document.getElementById('logout-btn').addEventListener('click', function() {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('username');
        window.location.href = '../../auth/login.php'; // Chuyển về trang login
    });
    // Lấy tham số 'id' từ URL
    const urlParams = new URLSearchParams(window.location.search);
    const supplyId = urlParams.get('id');

    if (!supplyId) {
        showNotification('Không tìm thấy ID của nhà cung cấp.', 'error');
        return;
    }

    // Khởi tạo Parsley cho form
    $('#myForm').parsley();

    // Hàm để lấy dữ liệu nhà cung cấp và populate vào form
    async function fetchSupplyData(id) {
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/supplies/id?id=${id}`);
            const supply = response.data;

            document.getElementById('addressId').value = supply.addressDTO.id;
            document.getElementById('name').value = supply.name;
            document.getElementById('address').value = supply.addressDTO.address;
            document.getElementById('phone').value = supply.addressDTO.phone;
            document.getElementById('status').value = supply.status.toString();
        } catch (error) {
            console.error(error);
            showNotification('Có lỗi xảy ra khi lấy thông tin nhà cung cấp.', 'error');
        }
    }

    // Gọi hàm lấy dữ liệu khi trang được tải
    fetchSupplyData(supplyId);

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
        const addressId = document.getElementById('addressId').value;
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

        // Tạo đối tượng SupplyDTO
        const supplyDTO = {
            id: parseInt(supplyId),
            name: name,
            addressDTO: {
                id: addressId, // Do mỗi supply có địa chỉ riêng, bạn có thể để null hoặc bỏ qua
                address: address,
                phone: phone
            },
            status: status === "true"
        };

        try {
            const response = await axios.put(`http://localhost:8080/api/v1/supplies/${supplyId}`, supplyDTO, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200 || response.status === 201) {
                showNotification('Chỉnh sửa nhà cung cấp thành công!', 'success');
            } else {
                throw new Error('Chỉnh sửa nhà cung cấp thất bại.');
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
                showNotification('Chỉnh sửa nhà cung cấp thất bại. Vui lòng thử lại.', 'error');
            }
        }
    });
});
