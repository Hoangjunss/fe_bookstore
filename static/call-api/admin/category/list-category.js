    document.addEventListener('DOMContentLoaded', function () {
        initData();
        document.getElementById('addCategoryForm').addEventListener('submit', function (e) {
            e.preventDefault(); // Ngăn chặn hành vi mặc định của form
            addCategory();
        });
        document.getElementById('logout-btn').addEventListener('click', function() {
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('username');
            window.location.href = '../../auth/login.php'; // Chuyển về trang login
        });
    });


    function addCategory() {
        // Lấy dữ liệu từ form trong modal
        var nameInput = document.getElementById('categoryName');
        var name = nameInput.value.trim();
    
        // Reset các thông báo lỗi
        document.getElementById('error-categoryName').textContent = '';
        document.getElementById('modal-error-message').textContent = '';
    
        // Kiểm tra các trường hợp bắt buộc
        var hasError = false;
        if (name === "") {
            document.getElementById('error-categoryName').textContent = 'Vui lòng nhập tên loại sản phẩm.';
            hasError = true;
        }
        if (hasError) {
            return;
        }
    
        var data = {
            name: name,
        };

        axios.post(`http://localhost:8080/api/v1/category`, data)
            .then(response => {
                if(response){
                    alert('Thêm loại sản phẩm thành công!');
                    window.location.reload();
                }
                
            })
            .catch(error => {
                console.error('Error creating category:', error);
                alert('Thêm loại sản phẩm thất bại. Vui lòng thử lại sau.');
            });
    }


    function initData() {
        let page = 0;
        let size = 5;
        let objFilter = {
            name: null,
            status: null
        };
        getCategories(page, size, objFilter);
    }

    async function getCategories() {
        let bodyTable = $('#datatable-buttons > tbody');
        bodyTable.empty(); // Xóa dữ liệu cũ
    
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/category/statistics`);
            console.log(response.data);
    
            let categories = response.data;
    
            if (categories.length === 0) {
                bodyTable.append(`<tr><td colspan="4" class="text-center">Không có dữ liệu</td></tr>`);
                return;
            }
            
            categories.forEach(data => {
                let row = `<tr>
                    <td>${data.id}</td>
                    <td>${data.name}</td>
                    <td>${data.totalBooks || 0}</td>
                    <td>
                        <a href="detail-category.php?id=${data.id}" class="btn btn-info btn-sm">Chi tiết</a>
                        <button class="btn btn-danger delete-button btn-sm" data-id="${data.id}">Xóa</button>
                    </td>
                </tr>`;
                bodyTable.append(row);
            });
    
            // Thêm sự kiện xóa sau khi thêm hàng mới
            $('.delete-button').off('click').on('click', function () {
                let id = $(this).data('id');
                if (confirm("Bạn có chắc chắn muốn xoá loại sản phẩm này không?")) {
                    deleteCategory(id);
                }
            });
    
        } catch (error) {
            console.error(error);
            bodyTable.append(`<tr><td colspan="4" class="text-center text-danger">Có lỗi xảy ra khi tải dữ liệu.</td></tr>`);
        }
    }
    

    function formatDate(dateString) {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN');
    }

    async function deleteCategory(id) {
        try {
            const response = await axios.delete(`http://localhost:8080/api/v1/category/${id}`);
    
            if (response.status === 204) {
                alert('Xóa loại sản phẩm thành công!', 'success');
                getCategories(); // Tải lại danh sách loại sản phẩm sau khi xóa
            } else {
                // Xử lý các mã trạng thái khác nếu có
                alert('Xóa loại sản phẩm thành công!', 'success');
                getCategories();
            }
        } catch (error) {
            if (error.response) {
                const status = error.response.status;
                switch (status) {
                    case 400:
                        alert('Không thể xóa loại sản phẩm này vì còn sản phẩm liên kết.', 'error');
                        break;
                    case 404:
                        alert('Không tìm thấy loại sản phẩm này.', 'error');
                        break;
                    default:
                        alert('Có lỗi xảy ra khi xóa loại sản phẩm. Vui lòng thử lại sau.', 'error');
                }
            } else if (error.request) {
                // Yêu cầu đã được gửi nhưng không nhận được phản hồi
                alert('Không nhận được phản hồi từ server. Vui lòng kiểm tra kết nối mạng.', 'error');
            } else {
                // Có lỗi xảy ra khi thiết lập yêu cầu
                alert('Có lỗi xảy ra khi thiết lập yêu cầu.', 'error');
            }
    
            console.error('Error deleting category:', error);
        }
    }
    

    function searchCondition(page, size) {
        let filter = {};
        filter.name = $("#name").val().trim() === '' ? null : $("#name").val().trim();
        let statusVal = $("#status").val();
        filter.status = statusVal === '' ? null : parseInt(statusVal);
        getCategories(page, size, filter);
    }

    function changePage(page, size, event) {
        event.preventDefault();
        searchCondition(page, size);
    }

    // Xử lý sự kiện tìm kiếm khi nhấn nút "Tìm kiếm"
    document.getElementById('btnSearch').addEventListener('click', function (e) {
        e.preventDefault();
        searchCondition(0, 5);
    });