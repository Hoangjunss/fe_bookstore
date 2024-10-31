    document.addEventListener('DOMContentLoaded', function () {
        const urlParams = new URLSearchParams(window.location.search);
        const receiptId = urlParams.get('id');

        if (receiptId) {
            fetchWarehouseReceipt(receiptId);
            document.getElementById('btnEdit').addEventListener('click', function () {
                window.location.href = `edit-warehousereceipt.html?id=${receiptId}`;
            });
        } else {
            showNotification('Không tìm thấy ID phiếu nhập kho.', 'error');
        }
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
     * Hàm lấy thông tin Warehouse Receipt theo ID
     * @param {number} receiptId - ID Phiếu Nhập Kho
     */
    async function fetchWarehouseReceipt(receiptId) {
        try {
            const response = await axios.get(`http://localhost:8080/api/warehousereceipts/${receiptId}`);
            const warehouseReceipt = response.data;

            populateWarehouseInfo(warehouseReceipt);
            populateWarehouseDetails(warehouseReceipt.wareHouseReceiptDetailDTOS);
        } catch (error) {
            console.error(error);
            showNotification('Có lỗi xảy ra khi tải thông tin phiếu nhập kho.', 'error');
        }
    }

    /**
     * Hàm hiển thị thông tin chính của Warehouse Receipt
     * @param {Object} receipt - WarehouseReceiptDTO
     */
    function populateWarehouseInfo(receipt) {
        document.getElementById('receiptId').value = receipt.id || '';
        document.getElementById('supplyName').value = receipt.supplyName || '';
        document.getElementById('quantity').value = receipt.quantity || '';
        document.getElementById('totalPrice').value = formatPrice(receipt.totalPrice);
        document.getElementById('status').value = getStatusText(receipt.status);
        document.getElementById('date').value = formatDate(receipt.date);
    }

    /**
     * Hàm hiển thị danh sách sản phẩm trong phiếu nhập kho
     * @param {Array} details - Danh sách WarehouseReceiptDetailDTO
     */
    function populateWarehouseDetails(details) {
        const tbody = document.querySelector('#datatable-buttons tbody');
        tbody.innerHTML = ''; // Xóa nội dung cũ

        if (details.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5" class="text-center">Không tìm thấy dữ liệu.</td></tr>';
            return;
        }

        details.forEach((detail, index) => {
            const tr = document.createElement('tr');

            tr.innerHTML = `
                <td>${index + 1}</td>
                <td>${detail.productName}</td>
                <td>${detail.quantity}</td>
                <td>${formatPrice(detail.unitPrice)}</td>
                <td>${formatPrice(detail.totalPrice)}</td>
            `;

            tbody.appendChild(tr);
        });
    }

    /**
     * Hàm định dạng số tiền
     * @param {number} price - Giá tiền
     * @returns {string} - Chuỗi định dạng tiền tệ
     */
    function formatPrice(price) {
        return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
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
            day: 'numeric'
        });
    }

    /**
     * Hàm chuyển đổi trạng thái từ boolean sang văn bản
     * @param {boolean} status - Trạng thái: true (ACTIVE) hoặc false (INACTIVE)
     * @returns {string} - Văn bản trạng thái
     */
    function getStatusText(status) {
        return status ? 'ACTIVE' : 'INACTIVE';
    }
