    document.addEventListener('DOMContentLoaded', function () {
        fetchVouchers(1, 10); // Khởi tạo với trang 1 và kích thước trang 10
        fetchProducts(); // Lấy danh sách sản phẩm để điền vào dropdown tìm kiếm
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
     * Hàm lấy danh sách voucher từ backend
     * @param {number} page - Trang hiện tại
     * @param {number} size - Số lượng voucher mỗi trang
     */
    async function fetchVouchers(page, size) {
        const nameVoucher = document.getElementById('nameVoucher').value.trim();
        const percent = document.getElementById('percent').value.trim();
        const startDate = document.getElementById('startDate').value;
        const endDate = document.getElementById('endDate').value;
        const status = document.getElementById('status').value;
        const productSelect = document.getElementById('product');
        const selectedProducts = Array.from(productSelect.selectedOptions).map(option => option.value);

        const params = {
            page: page - 1, // Giả sử backend sử dụng chỉ số trang bắt đầu từ 0
            size: size,
            name: nameVoucher || null,
            percent: percent ? parseFloat(percent) : null,
            startDate: startDate || null,
            endDate: endDate || null,
            status: status === "" ? null : status === "true",
            productIds: selectedProducts.length > 0 ? selectedProducts : null
        };

        try {
            const response = await axios.get('http://localhost:8080/api/vouchers', { params });

            const data = response.data;
            console.log(data);

            populateVoucherTable(data.content);
            renderPagination(data.totalPages, data.number, size);

        } catch (error) {
            console.error(error);
            showNotification('Có lỗi xảy ra khi tải danh sách voucher.', 'error');
        }
    }

    /**
     * Hàm lấy danh sách sản phẩm từ backend để điền vào dropdown
     */
    async function fetchProducts() {
        try {
            const response = await axios.get('http://localhost:8080/api/products?page=0&size=100');
            const products = response.data.content;

            const productSelect = document.getElementById('product');
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
     * Hàm hiển thị danh sách voucher vào bảng
     * @param {Array} vouchers - Danh sách voucher
     */
    function populateVoucherTable(vouchers) {
        const tbody = document.querySelector('#datatable-buttons tbody');
        tbody.innerHTML = ''; // Xóa nội dung cũ

        if (vouchers.length === 0) {
            tbody.innerHTML = '<tr><td colspan="8" class="text-center">Không tìm thấy dữ liệu.</td></tr>';
            return;
        }

        vouchers.forEach(voucher => {
            const tr = document.createElement('tr');

            // Lấy tên sản phẩm áp dụng
            const productNames = voucher.products.map(product => product.name).join(', ');

            tr.innerHTML = `
                <td>${voucher.id}</td>
                <td>${voucher.nameVoucher}</td>
                <td>${voucher.percent}</td>
                <td>${formatDate(voucher.startDate)}</td>
                <td>${formatDate(voucher.endDate)}</td>
                <td>${productNames}</td>
                <td>${getStatusText(voucher.status)}</td>
                <td>
                    <button class="btn btn-warning btn-sm edit-button" data-id="${voucher.id}">Sửa</button>
                    <button class="btn btn-danger btn-sm delete-button" data-id="${voucher.id}">Xóa</button>
                </td>
            `;

            tbody.appendChild(tr);
        });

        // Thêm sự kiện cho các nút Sửa và Xóa
        document.querySelectorAll('.edit-button').forEach(button => {
            button.addEventListener('click', function () {
                const voucherId = this.getAttribute('data-id');
                window.location.href = `edit-voucher.html?id=${voucherId}`;
            });
        });

        document.querySelectorAll('.delete-button').forEach(button => {
            button.addEventListener('click', function () {
                const voucherId = this.getAttribute('data-id');
                deleteVoucher(voucherId);
            });
        });
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

    /**
     * Hàm render các nút phân trang
     * @param {number} totalPage - Tổng số trang
     * @param {number} currentPage - Trang hiện tại (bắt đầu từ 0)
     * @param {number} size - Số lượng voucher mỗi trang
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
     * Hàm thay đổi trang khi người dùng nhấn nút phân trang
     * @param {number} page - Trang mới (bắt đầu từ 1)
     * @param {number} size - Số lượng voucher mỗi trang
     * @param {Event} event - Sự kiện click
     */
    function changePage(page, size, event) {
        event.preventDefault();
        fetchVouchers(page, size);
    }

    /**
     * Hàm tìm kiếm voucher theo các điều kiện
     * @param {number} page - Trang mới
     * @param {number} size - Số lượng voucher mỗi trang
     */
    function searchVouchers(page, size) {
        fetchVouchers(page, size);
    }

    /**
     * Thêm sự kiện tìm kiếm khi nhấn nút "Tìm kiếm"
     */
    document.getElementById('btnSearch').addEventListener('click', function (e) {
        e.preventDefault();
        searchVouchers(1, 10); // Khởi tạo tìm kiếm từ trang 1 với kích thước trang 10
    });

    /**
     * Hàm xóa voucher
     * @param {number} voucherId - ID voucher
     */
    async function deleteVoucher(voucherId) {
        if (confirm("Bạn có chắc chắn là muốn xoá voucher này không?")) {
            try {
                const response = await axios.delete(`http://localhost:8080/api/vouchers/${voucherId}`);

                if (response.status === 200) {
                    showNotification('Xóa voucher thành công!', 'success');
                    // Tải lại danh sách voucher sau khi xóa
                    fetchVouchers(1, 10);
                } else {
                    throw new Error('Xóa voucher thất bại.');
                }
            } catch (error) {
                console.error(error);
                showNotification('Xóa voucher thất bại. Vui lòng thử lại.', 'error');
            }
        }
    }