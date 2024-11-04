    document.addEventListener('DOMContentLoaded', function () {
        initData();
    });

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
                            <td>${data.countProducts || 0}</td>
                            <td>${new Date()}</td>
                            <td>
                                <a href="detail-category.php?id=${data.id}" class="btn btn-info btn-sm">Chi tiết</a>
                                <button class="btn btn-danger delete-button btn-sm" data-id="${data.id}">Xóa</button>
                            </td>
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

    function deleteCategory(id) {
        axios.delete(`http://localhost:8080/api/categories/${id}`)
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