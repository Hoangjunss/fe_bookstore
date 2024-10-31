    document.addEventListener('DOMContentLoaded', function () {
        fetchEmployees(1, 10); // Khởi tạo với trang 1 và kích thước trang 10
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
     * Hàm lấy danh sách nhân viên từ backend
     * @param {number} page - Trang hiện tại
     * @param {number} size - Số lượng nhân viên mỗi trang
     */
    async function fetchEmployees(page, size) {
        const fullname = document.getElementById('fullname').value.trim();
        const email = document.getElementById('email').value.trim();
        const role = document.getElementById('role').value;

        const params = {
            page: page - 1, // Giả sử backend sử dụng chỉ số trang bắt đầu từ 0
            size: size,
            fullname: fullname || null,
            email: email || null,
            role: role || null
        };

        try {
            const response = await axios.get('http://localhost:8080/api/employees', { params });

            const data = response.data;
            console.log(data);

            populateEmployeeTable(data.content);
            renderPagination(data.totalPages, data.number, size);

        } catch (error) {
            console.error(error);
            showNotification('Có lỗi xảy ra khi tải danh sách nhân viên.', 'error');
        }
    }

    /**
     * Hàm hiển thị danh sách nhân viên vào bảng
     * @param {Array} employees - Danh sách nhân viên
     */
    function populateEmployeeTable(employees) {
        const tbody = document.querySelector('#datatable-buttons tbody');
        tbody.innerHTML = ''; // Xóa nội dung cũ

        if (employees.length === 0) {
            tbody.innerHTML = '<tr><td colspan="7" class="text-center">Không tìm thấy dữ liệu.</td></tr>';
            return;
        }

        employees.forEach(employee => {
            const tr = document.createElement('tr');

            tr.innerHTML = `
                <td>${employee.id}</td>
                <td>${employee.fullname}</td>
                <td>${employee.email}</td>
                <td>${employee.role}</td>
                <td>${formatDate(employee.createdDate)}</td>
                <td>${getStatusText(employee.status)}</td>
                <td>
                    <button class="btn btn-warning btn-sm edit-button" data-id="${employee.id}">Sửa</button>
                    <button class="btn btn-danger btn-sm delete-button" data-id="${employee.id}">Xóa</button>
                </td>
            `;

            tbody.appendChild(tr);
        });

        // Thêm sự kiện cho các nút Sửa và Xóa
        document.querySelectorAll('.edit-button').forEach(button => {
            button.addEventListener('click', function () {
                const employeeId = this.getAttribute('data-id');
                window.location.href = `edit-employee.html?id=${employeeId}`;
            });
        });

        document.querySelectorAll('.delete-button').forEach(button => {
            button.addEventListener('click', function () {
                const employeeId = this.getAttribute('data-id');
                deleteEmployee(employeeId);
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
     * Hàm chuyển đổi trạng thái từ số sang văn bản
     * @param {number} status - Trạng thái: 1 (ACTIVE) hoặc 0 (INACTIVE)
     * @returns {string} - Văn bản trạng thái
     */
    function getStatusText(status) {
        return status === 1 ? 'ACTIVE' : 'INACTIVE';
    }

    /**
     * Hàm render các nút phân trang
     * @param {number} totalPage - Tổng số trang
     * @param {number} currentPage - Trang hiện tại (bắt đầu từ 0)
     * @param {number} size - Số lượng nhân viên mỗi trang
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
     * @param {number} size - Số lượng nhân viên mỗi trang
     * @param {Event} event - Sự kiện click
     */
    function changePage(page, size, event) {
        event.preventDefault();
        fetchEmployees(page, size);
    }

    /**
     * Hàm tìm kiếm nhân viên theo các điều kiện
     * @param {number} page - Trang mới
     * @param {number} size - Số lượng nhân viên mỗi trang
     */
    function searchEmployees(page, size) {
        fetchEmployees(page, size);
    }

    /**
     * Thêm sự kiện tìm kiếm khi nhấn nút "Tìm kiếm"
     */
    document.getElementById('btnSearch').addEventListener('click', function (e) {
        e.preventDefault();
        searchEmployees(1, 10); // Khởi tạo tìm kiếm từ trang 1 với kích thước trang 10
    });

    /**
     * Hàm xóa nhân viên
     * @param {number} employeeId - ID nhân viên
     */
    async function deleteEmployee(employeeId) {
        if (confirm("Bạn có chắc chắn là muốn xoá nhân viên này không?")) {
            try {
                const response = await axios.delete(`http://localhost:8080/api/employees/${employeeId}`);

                if (response.status === 200) {
                    showNotification('Xóa nhân viên thành công!', 'success');
                    // Tải lại danh sách nhân viên sau khi xóa
                    fetchEmployees(1, 10);
                } else {
                    throw new Error('Xóa nhân viên thất bại.');
                }
            } catch (error) {
                console.error(error);
                showNotification('Xóa nhân viên thất bại. Vui lòng thử lại.', 'error');
            }
        }
    }