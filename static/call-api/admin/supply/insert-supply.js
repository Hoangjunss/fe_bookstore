    document.addEventListener('DOMContentLoaded', function () {
        fetchAddresses(); // Lấy danh sách địa chỉ khi tải trang
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
     * Hàm lấy danh sách địa chỉ từ backend để điền vào dropdown
     */
    async function fetchAddresses() {
        try {
            const response = await axios.get('http://localhost:8080/api/addresses');
            const addresses = response.data;

            const addressSelect = document.getElementById('address');
            addresses.forEach(address => {
                const option = document.createElement('option');
                option.value = address.id;
                option.textContent = `${address.address} (${address.phone})`;
                addressSelect.appendChild(option);
            });
        } catch (error) {
            console.error(error);
            showNotification('Có lỗi xảy ra khi tải danh sách địa chỉ.', 'error');
        }
    }

    /**
     * Hàm xử lý gửi form thêm nhà cung cấp
     */
    document.getElementById('myForm').addEventListener('submit', async function (e) {
        e.preventDefault(); // Ngăn chặn hành vi mặc định của form

        // Xóa các thông báo lỗi trước đó
        document.querySelectorAll('.error-message').forEach(el => el.textContent = '');

        // Lấy giá trị từ form
        const name = document.getElementById('name').value.trim();
        const addressId = document.getElementById('address').value;
        const phone = document.getElementById('phone').value.trim();
        const status = document.getElementById('status').value;

        let hasError = false;

        // Kiểm tra validation
        if (!name) {
            document.getElementById('error-name').textContent = 'Tên nhà cung cấp không được để trống.';
            hasError = true;
        }

        if (!addressId) {
            document.getElementById('error-address').textContent = 'Vui lòng chọn địa chỉ.';
            hasError = true;
        }

        if (!phone) {
            document.getElementById('error-phone').textContent = 'Số điện thoại không được để trống.';
            hasError = true;
        } else if (!/^\d{10,15}$/.test(phone)) { // Kiểm tra định dạng số điện thoại
            document.getElementById('error-phone').textContent = 'Số điện thoại không hợp lệ.';
            hasError = true;
        }

        if (!status) {
            document.getElementById('error-status').textContent = 'Vui lòng chọn trạng thái.';
            hasError = true;
        }

        if (hasError) {
            return; // Dừng việc gửi form nếu có lỗi
        }

        // Tạo đối tượng SupplyDTO
        const supplyDTO = {
            name: name,
            address: {
                id: parseInt(addressId)
            },
            status: status === "true"
        };

        try {
            const response = await axios.post('http://localhost:8080/api/supplies', supplyDTO);

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