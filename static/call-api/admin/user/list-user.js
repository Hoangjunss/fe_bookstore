    document.addEventListener('DOMContentLoaded', function () {
        initData();
    });

    /**
     * Hàm khởi tạo dữ liệu khi trang được tải
     */
    function initData() {
        let page = 0;
        let size = 5;
        let objFilter = {
            email: null
        };
        getUsers(page, size, objFilter);
    }

    /**
     * Hàm lấy danh sách user từ backend
     * @param {number} page - Số trang
     * @param {number} size - Số lượng user mỗi trang
     * @param {object} objectFilter - Các điều kiện lọc
     */
    async function getUsers(page, size, objectFilter) {
        let bodyTable = document.querySelector('#datatable-buttons tbody');
        bodyTable.innerHTML = ''; // Xóa dữ liệu cũ

        try {
            let response = await fetch(`http://localhost:8080/api/v1/users?role=CUSTOMER&page=${page}&size=${size}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            let data = await response.json();
            console.log(data);

            let users = data.content; // Giả sử backend trả về { content: [...], totalPages: X, number: Y }
            users.forEach(user => {
                let avatarUrl = user.avatar ? user.avatar : '../../../static/assets_admin/images/users/default-avatar.png';
                let formattedDate = formatDate(user.createdDate);
                let statusText = getStatusText(user.status);
                let feedbackCount = user.feedbackCount !== null ? user.feedbackCount : 0;

                // Tạo một hàng mới trong bảng
                let row = document.createElement('tr');

                row.innerHTML = `
                    <td>${user.id}</td>
                    <td><img src="${avatarUrl}" alt="Avatar" class="avatar-img"></td>
                    <td>${user.email}</td>
                    <td>${feedbackCount}</td>
                    <td>${formattedDate}</td>
                    <td>
                        <select class="form-control status-select" data-user-id="${user.id}">
                            <option value="ACTIVE" ${user.status === 'ACTIVE' ? 'selected' : ''}>ACTIVE</option>
                            <option value="INACTIVE" ${user.status === 'INACTIVE' ? 'selected' : ''}>INACTIVE</option>
                        </select>
                    </td>
                    <td>
                        <button class="btn btn-warning btn-sm edit-button" data-user-id="${user.id}">Sửa</button>
                        <button class="btn btn-danger btn-sm delete-button" data-user-id="${user.id}">Xóa</button>
                    </td>
                `;

                bodyTable.appendChild(row);
            });

            // Phân trang
            let totalPage = data.totalPages;
            let currentPage = data.number;
            if (totalPage > 0) {
                renderPagination(totalPage, currentPage, size);
            }

        } catch (error) {
            console.error(error);
            alert('Có lỗi xảy ra khi tải dữ liệu.');
        }
    }

    /**
     * Hàm định dạng ngày tháng theo định dạng Việt Nam
     * @param {string} dateString - Chuỗi ngày tháng
     * @returns {string} - Chuỗi ngày tháng đã định dạng
     */
    function formatDate(dateString) {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN');
    }

    /**
     * Hàm lấy văn bản trạng thái từ mã trạng thái
     * @param {string} status - Mã trạng thái
     * @returns {string} - Văn bản trạng thái
     */
    function getStatusText(status) {
        switch (status) {
            case 'ACTIVE':
                return 'ACTIVE';
            case 'INACTIVE':
                return 'INACTIVE';
            default:
                return 'UNKNOWN';
        }
    }

    /**
     * Hàm render các nút phân trang
     * @param {number} totalPage - Tổng số trang
     * @param {number} currentPage - Trang hiện tại
     * @param {number} size - Số lượng user mỗi trang
     */
    function renderPagination(totalPage, currentPage, size) {
        let pagination = document.getElementById('pageId');
        pagination.innerHTML = ''; // Xóa các nút phân trang cũ

        // Nút Previous
        let prevClass = currentPage === 0 ? 'disabled' : '';
        let prevLi = document.createElement('li');
        prevLi.className = `page-item ${prevClass}`;
        prevLi.innerHTML = `<a class="page-link" href="#" onclick="changePage(${currentPage - 1}, ${size}, event)">Previous</a>`;
        pagination.appendChild(prevLi);

        // Các nút trang
        for (let i = 0; i < totalPage; i++) {
            let activeClass = currentPage === i ? 'active' : '';
            let li = document.createElement('li');
            li.className = `page-item ${activeClass}`;
            li.innerHTML = `<a class="page-link" href="#" onclick="changePage(${i}, ${size}, event)">${i + 1}</a>`;
            pagination.appendChild(li);
        }

        // Nút Next
        let nextClass = currentPage === totalPage - 1 ? 'disabled' : '';
        let nextLi = document.createElement('li');
        nextLi.className = `page-item ${nextClass}`;
        nextLi.innerHTML = `<a class="page-link" href="#" onclick="changePage(${currentPage + 1}, ${size}, event)">Next</a>`;
        pagination.appendChild(nextLi);
    }

    /**
     * Hàm thay đổi trang khi người dùng nhấn nút phân trang
     * @param {number} page - Trang mới
     * @param {number} size - Số lượng user mỗi trang
     * @param {Event} event - Sự kiện click
     */
    function changePage(page, size, event) {
        event.preventDefault();
        searchCondition(page, size);
    }

    /**
     * Hàm tìm kiếm user theo email
     * @param {number} page - Trang mới
     * @param {number} size - Số lượng user mỗi trang
     */
    function searchCondition(page, size) {
        let filter = {};
        let emailInput = document.getElementById('email').value.trim();
        filter.email = emailInput === '' ? null : emailInput;
        getUsers(page, size, filter);
    }

    /**
     * Hàm cập nhật trạng thái user khi người dùng thay đổi select
     */
    document.addEventListener('change', function (e) {
        if (e.target && e.target.matches('.status-select')) {
            let userId = e.target.getAttribute('data-user-id');
            let newStatus = e.target.value;

            updateUserStatus(userId, newStatus, e.target);
        }
    });

    /**
     * Hàm gửi yêu cầu cập nhật trạng thái user tới backend
     * @param {number} userId - ID user
     * @param {string} newStatus - Trạng thái mới
     * @param {HTMLElement} selectElement - Thẻ select đã được thay đổi
     */
    async function updateUserStatus(userId, newStatus, selectElement) {
        try {
            let response = await fetch(`http://localhost:8080/api/users/${userId}/status`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status: newStatus })
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            let data = await response.json();
            console.log('Update successful', data);
            alert('Cập nhật trạng thái user thành công!');
        } catch (error) {
            console.error('Error updating status:', error);
            alert('Cập nhật trạng thái user thất bại. Vui lòng thử lại.');
            // Đặt lại giá trị select về trạng thái cũ nếu có lỗi
            // Bạn cần lưu trạng thái cũ trước khi thay đổi để có thể đặt lại
            // Ví dụ:
            // selectElement.value = selectElement.getAttribute('data-old-status');
        }
    }

    /**
     * Hàm xóa user
     * @param {number} userId - ID user
     */
    async function deleteUser(userId) {
        if (confirm("Bạn có chắc chắn là muốn xoá user này không?")) {
            try {
                let response = await fetch(`http://localhost:8080/api/users/${userId}`, {
                    method: 'DELETE'
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }

                alert('Xóa user thành công!');
                // Tải lại danh sách user sau khi xóa
                initData();
            } catch (error) {
                console.error('Error deleting user:', error);
                alert('Xóa user thất bại. Vui lòng thử lại sau.');
            }
        }
    }

    // Sử dụng jQuery để thêm sự kiện cho các nút xoá
    document.addEventListener('click', function (e) {
        if (e.target && e.target.matches('.delete-button')) {
            let userId = e.target.getAttribute('data-user-id');
            deleteUser(userId);
        }
    });

    /**
     * Hàm thêm sự kiện tìm kiếm khi nhấn nút "Tìm kiếm"
     */
    document.getElementById('btnSearch').addEventListener('click', function (e) {
        e.preventDefault();
        searchCondition(0, 5);
    });