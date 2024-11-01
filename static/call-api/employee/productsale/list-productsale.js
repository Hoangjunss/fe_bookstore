    document.addEventListener('DOMContentLoaded', function () {
        fetchProductSales(1, 10); // Khởi tạo với trang 1 và kích thước trang 10
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
     * Hàm lấy danh sách sản phẩm từ backend để điền vào dropdown tìm kiếm
     */
    async function fetchProducts() {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/product?page=0&size=10');
            const products = response.data.content;

            const productSelect = document.getElementById('productName');
            products.forEach(product => {
                const option = document.createElement('option');
                option.value = product.id;
                option.textContent = product.name;
                productSelect.appendChild(option);
            });
        } catch (error) {
            console.error(error);
            //showNotification('Có lỗi xảy ra khi tải danh sách sản phẩm.', 'error');
        }
    }

    /**
     * Hàm lấy danh sách Product Sale từ backend
     * @param {number} page - Trang hiện tại
     * @param {number} size - Số lượng Product Sale mỗi trang
     */
    async function fetchProductSales(page, size) {
        const productName = document.getElementById('productName').value.trim();
        const quantity = document.getElementById('quantity').value.trim();
        const status = document.getElementById('status').value;

        const params = {
            page: page - 1, // Giả sử backend sử dụng chỉ số trang bắt đầu từ 0
            size: size,
            name: productName || null,
            quantity: quantity ? parseInt(quantity) : null,
            status: status === "" ? null : status === "true"
        };

        try {
            const response = await axios.get('http://localhost:8080/api/v1/productsales', { params });

            const data = response.data;
            console.log(data);

            populateProductSaleTable(data.content);
            renderPagination(data.totalPages, data.number, size);

        } catch (error) {
            console.error(error);
            showNotification('Có lỗi xảy ra khi tải danh sách sản phẩm giảm giá.', 'error');
        }
    }

    /**
     * Hàm hiển thị danh sách Product Sale vào bảng
     * @param {Array} productSales - Danh sách Product Sale
     */
    function populateProductSaleTable(productSales) {
        const tbody = document.querySelector('#datatable-buttons tbody');
        tbody.innerHTML = ''; // Xóa nội dung cũ

        if (productSales.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" class="text-center">Không tìm thấy dữ liệu.</td></tr>';
            return;
        }

        productSales.forEach(ps => {
            const tr = document.createElement('tr');

            tr.innerHTML = `
                <td>${ps.id}</td>
                <td>${ps.product.name}</td>
                <td>${ps.quantity}</td>
                <td>${getStatusText(ps.status)}</td>
                <td>${formatPrice(ps.price)}</td>
                <td>
                    <button class="btn btn-warning btn-sm edit-button" data-id="${ps.id}">Sửa</button>
                    <button class="btn btn-info btn-sm detail-button" data-id="${ps.id}">Chi tiết</button>
                </td>
            `;

            tbody.appendChild(tr);
        });

        // Thêm sự kiện cho các nút Sửa và Xóa
        document.querySelectorAll('.edit-button').forEach(button => {
            button.addEventListener('click', function () {
                const productSaleId = this.getAttribute('data-id');
                window.location.href = `edit-productsale.html?id=${productSaleId}`;
            });
        });

        document.querySelectorAll('.detail-button').forEach(button => {
            button.addEventListener('click', function () {
                const productSaleId = this.getAttribute('data-id');
                deleteProductSale(productSaleId);
            });
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
     * @param {number} size - Số lượng Product Sale mỗi trang
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
     * @param {number} size - Số lượng Product Sale mỗi trang
     * @param {Event} event - Sự kiện click
     */
    function changePage(page, size, event) {
        event.preventDefault();
        fetchProductSales(page, size);
    }

    /**
     * Hàm tìm kiếm Product Sale theo các điều kiện
     * @param {number} page - Trang mới
     * @param {number} size - Số lượng Product Sale mỗi trang
     */
    function searchProductSales(page, size) {
        fetchProductSales(page, size);
    }

    /**
     * Thêm sự kiện tìm kiếm khi nhấn nút "Tìm kiếm"
     */
    document.getElementById('btnSearch').addEventListener('click', function (e) {
        e.preventDefault();
        searchProductSales(1, 10); // Khởi tạo tìm kiếm từ trang 1 với kích thước trang 10
    });

    /**
     * Hàm xóa Product Sale
     * @param {number} productSaleId - ID Product Sale
     */
    async function deleteProductSale(productSaleId) {
        if (confirm("Bạn có chắc chắn là muốn xoá sản phẩm giảm giá này không?")) {
            try {
                const response = await axios.delete(`http://localhost:8080/api/v1//productsales/${productSaleId}`);

                if (response.status === 200) {
                    showNotification('Xóa sản phẩm giảm giá thành công!', 'success');
                    // Tải lại danh sách Product Sale sau khi xóa
                    fetchProductSales(1, 10);
                } else {
                    throw new Error('Xóa sản phẩm giảm giá thất bại.');
                }
            } catch (error) {
                console.error(error);
                showNotification('Xóa sản phẩm giảm giá thất bại. Vui lòng thử lại.', 'error');
            }
        }
    }