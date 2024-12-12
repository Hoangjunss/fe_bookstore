    document.addEventListener('DOMContentLoaded', function () {
        // Lấy ID đơn hàng từ URL (ví dụ: order-detail.html?orderId=1)
        const urlParams = new URLSearchParams(window.location.search);
        const orderId = urlParams.get('orderId');

        if (orderId) {
            getOrderDetails(orderId);
        } else {
            alert('Không tìm thấy ID đơn hàng.');
            // Điều hướng quay lại danh sách đơn hàng
            // window.location.href = 'list-order.php';
        }
    });

    /**
     * Hàm lấy chi tiết đơn hàng từ backend
     * @param {number} orderId - ID đơn hàng
     */
    async function getOrderDetails(orderId) {
        try {
            let response = await fetch(`http://localhost:8080/api/v1/orders/id?idOrder=${orderId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            let data = await response.json();
            console.log(data);

            displayOrderInfo(data);
            displayOrderDetails(data.orderDetailDTOS);

        } catch (error) {
            console.error(error);
            alert('Có lỗi xảy ra khi tải dữ liệu đơn hàng.');
            // Điều hướng quay lại danh sách đơn hàng
            // window.location.href = 'list-order.php';
        }
    }

    /**
     * Hàm hiển thị thông tin chung của đơn hàng
     * @param {object} order - Đối tượng đơn hàng
     */
    function displayOrderInfo(order) {
        console.log(order);
        document.getElementById('order-id').textContent = order.id;
        document.getElementById('user-email').textContent = order.username;
        document.getElementById('order-quantity').textContent = order.quantity;
        document.getElementById('order-total-price').textContent = formatCurrency(order.totalPrice);
        document.getElementById('order-created-date').textContent = formatDate(order.date);
        document.getElementById('order-address').textContent = order.address.detailAddress+", "+order.address.ward+", "+ order.address.district+", "+ order.address.province;

        // Cập nhật trạng thái đơn hàng
        // const statusSelect = document.getElementById('order-status');
        // statusSelect.value = order.orderStatus;
        // statusSelect.setAttribute('data-order-id', order.id);
    }

    /**
     * Hàm hiển thị danh sách sản phẩm trong đơn hàng
     * @param {Array} orderDetails - Danh sách chi tiết đơn hàng
     */
    function displayOrderDetails(orderDetails) {
        let bodyTable = document.querySelector('#order-details-table tbody');
        bodyTable.innerHTML = ''; // Xóa dữ liệu cũ

        orderDetails.forEach(detail => {
            let formattedUnitPrice = formatCurrency(detail.unitPrice);
            let formattedTotalPrice = formatCurrency(detail.totalPrice);

            // Tạo một hàng mới trong bảng
            let row = document.createElement('tr');

            row.innerHTML = `
                <td>${detail.product.id}</td>
                <td>${detail.product.name}</td>
                <td><img src="${detail.product.image}" alt="Product Image" class="avatar-img"></td>
                <td>${detail.quantity}</td>
                <td>${formattedUnitPrice}</td>
                <td>${formattedTotalPrice}</td>
            `;

            bodyTable.appendChild(row);
        });
    }

    /**
     * Hàm định dạng số thành tiền tệ VND
     * @param {number} value - Giá trị cần định dạng
     * @returns {string} - Chuỗi định dạng tiền tệ
     */
    function formatCurrency(value) {
        if (value === null || value === undefined) return '0 VND';
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(value);
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
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    }

    /**
     * Hàm định dạng địa chỉ
     * @param {object} address - Đối tượng địa chỉ
     * @returns {string} - Chuỗi địa chỉ đã định dạng
     */
    function formatAddress(address) {
        if (!address) return 'Chưa cập nhật';
        return `${address.street}, ${address.ward}, ${address.district}, ${address.city}`;
    }

    /**
     * Hàm cập nhật trạng thái đơn hàng khi người dùng thay đổi select
     */
    // document.getElementById('order-status').addEventListener('change', function () {
    //     let orderId = this.getAttribute('data-order-id');
    //     let newStatus = this.value;

    //     updateOrderStatus(orderId, newStatus, this);
    // });

    /**
     * Hàm gửi yêu cầu cập nhật trạng thái đơn hàng tới backend
     * @param {number} orderId - ID đơn hàng
     * @param {string} newStatus - Trạng thái mới
     * @param {HTMLElement} selectElement - Thẻ select đã được thay đổi
     */
    async function updateOrderStatus(orderId, newStatus, selectElement) {
        try {
            let response = await fetch(`http://localhost:8080/api/orders/${orderId}/status`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ orderStatus: newStatus })
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            let data = await response.json();
            console.log('Update successful', data);
            alert('Cập nhật trạng thái đơn hàng thành công!');

            // Cập nhật trạng thái trên giao diện nếu cần
            // Ví dụ: cập nhật lại giá trị select hoặc thông tin khác

        } catch (error) {
            console.error('Error updating status:', error);
            alert('Cập nhật trạng thái đơn hàng thất bại. Vui lòng thử lại.');

            // Đặt lại giá trị select về trạng thái cũ nếu có lỗi
            // Bạn cần lưu trạng thái cũ trước khi thay đổi để có thể đặt lại
        }
    }