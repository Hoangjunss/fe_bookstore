    document.addEventListener('DOMContentLoaded', function () {
        fetchProducts(); // Lấy danh sách sản phẩm khi tải trang
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
     * Hàm lấy danh sách sản phẩm từ backend để điền vào dropdown
     */
    async function fetchProducts() {
        try {
            const response = await axios.get('http://localhost:8080/api/vouchers/products?page=0&size=100');
            const products = response.data.content;

            const productSelect = document.getElementById('products');
            products.forEach(product => {
                const option = document.createElement('option');
                option.value = product.id;
                option.textContent = product.name;
                productSelect.appendChild(option);
            });
        } catch (error) {
            console.error(error);
            showNotification('Có lỗi xảy ra khi tải danh sách sản phẩm.', 'error');
        }
    }

    /**
     * Hàm xử lý gửi form thêm voucher
     */
    document.getElementById('myForm').addEventListener('submit', async function (e) {
        e.preventDefault(); // Ngăn chặn hành vi mặc định của form

        // Xóa các thông báo lỗi trước đó
        document.querySelectorAll('.error-message').forEach(el => el.textContent = '');

        // Lấy giá trị từ form
        const nameVoucher = document.getElementById('nameVoucher').value.trim();
        const percent = document.getElementById('percent').value.trim();
        const startDate = document.getElementById('startDate').value;
        const endDate = document.getElementById('endDate').value;
        const status = document.getElementById('status').value;
        const productSelect = document.getElementById('products');
        const selectedProducts = Array.from(productSelect.selectedOptions).map(option => option.value);

        let hasError = false;

        // Kiểm tra validation
        if (!nameVoucher) {
            document.getElementById('error-nameVoucher').textContent = 'Tên voucher không được để trống.';
            hasError = true;
        }

        if (!percent) {
            document.getElementById('error-percent').textContent = 'Phần trăm giảm không được để trống.';
            hasError = true;
        } else if (isNaN(percent) || percent < 0 || percent > 100) {
            document.getElementById('error-percent').textContent = 'Phần trăm giảm phải là số từ 0 đến 100.';
            hasError = true;
        }

        if (!startDate) {
            document.getElementById('error-startDate').textContent = 'Vui lòng chọn ngày bắt đầu.';
            hasError = true;
        }

        if (!endDate) {
            document.getElementById('error-endDate').textContent = 'Vui lòng chọn ngày kết thúc.';
            hasError = true;
        }

        if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
            document.getElementById('error-endDate').textContent = 'Ngày kết thúc phải sau ngày bắt đầu.';
            hasError = true;
        }

        if (selectedProducts.length === 0) {
            document.getElementById('error-products').textContent = 'Vui lòng chọn ít nhất một sản phẩm áp dụng.';
            hasError = true;
        }

        if (!status) {
            document.getElementById('error-status').textContent = 'Vui lòng chọn trạng thái.';
            hasError = true;
        }

        if (hasError) {
            return; // Dừng việc gửi form nếu có lỗi
        }

        // Tạo đối tượng VoucherDTO
        const voucherDTO = {
            nameVoucher: nameVoucher,
            percent: parseFloat(percent),
            startDate: startDate,
            endDate: endDate,
            products: selectedProducts.map(id => ({ id: parseInt(id) })),
            status: status === "true"
        };

        try {
            const response = await axios.post('http://localhost:8080/api/vouchers', voucherDTO);

            if (response.status === 200 || response.status === 201) {
                showNotification('Thêm voucher thành công!', 'success');
                // Reset form sau khi thêm thành công
                document.getElementById('myForm').reset();
            } else {
                throw new Error('Thêm voucher thất bại.');
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
                showNotification('Thêm voucher thất bại. Vui lòng thử lại.', 'error');
            }
        }
    });