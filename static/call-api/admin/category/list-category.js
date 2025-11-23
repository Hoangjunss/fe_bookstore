    document.addEventListener('DOMContentLoaded', function () {
        initData();
        document.getElementById('addCategoryForm').addEventListener('submit', function (e) {
            e.preventDefault(); // Ngăn chặn hành vi mặc định của form
            addCategory();
        });
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

        function getCategories(page, size, objectFilter) {
            let bodyTable = $('#datatable-buttons > tbody');
            bodyTable.empty();

            axios.get(`http://localhost:8080/api/v1/category`)
                .then(response => {
                    console.log(response.data);
                    let noData = document.querySelector('.dataTables_empty');
                    noData.style.display = 'none';
                    let categories = response.data;
                    for (let i = 0; i < categories.length; i++) {
                        let data = categories[i];
                        let formattedDate = formatDate(data.createdDate);
                        let statusText = data.status === 1 ? 'ACTIVE' : 'INACTIVE';
                        let row = `<tr>
                            <td>${data.id}</td>
                            <td>${data.name}</td>
                        </tr>`;
                        $('#datatable-buttons tbody').append(row);
                    }

                    // Thêm sự kiện xóa sau khi thêm hàng mới
                    $('.delete-button').off('click').on('click', function () {
                        let id = $(this).data('id');
                        if (confirm("Bạn có chắc chắn muốn xoá loại sản phẩm này không?")) {
                            deleteCategory(id);
                        }
                    });

                    // Phân trang
                    let totalPage = response.data.totalPages;
                    let currentPage = response.data.number;
                    let totalElements = response.data.totalElements;
                    if (totalPage > 0) {
                        $("#pageId").empty();
                        let pages = '';

                        // Nút Previous
                        pages += `<li class="page-item ${currentPage === 0 ? 'disabled' : ''}">
                            <a class="page-link" href="#" onclick="changePage(${currentPage - 1}, ${size}, event)">Previous</a>
                        </li>`;

                        // Nút các trang
                        for (let i = 0; i < totalPage; i++) {
                            if (currentPage === i) {
                                pages += `<li class="page-item active">
                                    <a class="page-link" href="#" onclick="changePage(${i}, ${size}, event)">${i + 1}</a>
                                </li>`;
                            } else {
                                pages += `<li class="page-item">
                                    <a class="page-link" href="#" onclick="changePage(${i}, ${size}, event)">${i + 1}</a>
                                </li>`;
                            }
                        }

                        // Nút Next
                        pages += `<li class="page-item ${currentPage === totalPage - 1 ? 'disabled' : ''}">
                            <a class="page-link" href="#" onclick="changePage(${currentPage + 1}, ${size}, event)">Next</a>
                        </li>`;

                        $("#pageId").append(pages);
                    }
                })
                .catch(error => {
                    console.error(error);
                    alert('Có lỗi xảy ra khi tải dữ liệu.');
                });
        }

    function formatDate(dateString) {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN');
    }


    function getToken() {
        return localStorage.getItem('token');
    }

    function deleteCategory(id) {
        const accessToken = getToken();
        axios.delete(`http://localhost:8080/api/v1/category/${id}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                alert('Xóa loại sản phẩm thành công!');
                // Tải lại danh sách sau khi xóa
                initData();
            })
            .catch(error => {
                console.error('Error deleting category:', error);
                alert('Xóa loại sản phẩm thất bại. Vui lòng thử lại sau.');
            });
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