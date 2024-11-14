
    document.addEventListener('DOMContentLoaded', function () {
        fetchVouchers(1, 10); // Khởi tạo với trang 1 và kích thước trang 10

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
    });

    
function getToken() {
    return localStorage.getItem('token');
}

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

        const params = {
            page: page - 1, // Giả sử backend sử dụng chỉ số trang bắt đầu từ 0
            size: size,
            nameVoucher: nameVoucher || null,
            percent: percent ? parseFloat(percent) : null,
            startDate: startDate || null,
            endDate: endDate || null,
            status: status === "" ? null : status === "true"
        };

        try {
            const token = getToken(); // Lấy token từ localStorage
            const options = {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            };
            const response = await fetch('http://localhost:8080/api/v1/voucher', options);

            if(response.status == 200){
                const data = await response.json();
                populateVoucherTable(data.content);
                renderPagination(data.totalPages, data.number, size);
            }

        } catch (error) {
            console.error(error);
            showNotification('Có lỗi xảy ra khi tải danh sách voucher.', 'error');
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
            tbody.innerHTML = '<tr><td colspan="7" class="text-center">Không tìm thấy dữ liệu.</td></tr>';
            return;
        }

        vouchers.forEach(voucher => {
            const tr = document.createElement('tr');

            tr.innerHTML = `
                <td>${voucher.id}</td>
                <td>${voucher.nameVoucher}</td>
                <td>${voucher.percent}</td>
                <td>${formatDate(voucher.startDate)}</td>
                <td>${formatDate(voucher.endDate)}</td>
                <td>${getStatusText(voucher.status)}</td>
                <td>
                    
                    <button class="btn btn-danger btn-sm delete-button" data-id="${voucher.id}">Xóa</button>
                </td>
            `;
            /* <button class="btn btn-warning btn-sm edit-button" data-id="${voucher.id}">Sửa</button> */

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
                const token = getToken(); // Lấy token từ localStorage
                const options = {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                };
                const response = await fetch(`http://localhost:8080/api/v1/voucher`, options);

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