    document.addEventListener('DOMContentLoaded', function () {
        initData();

    });

    // Hàm khởi tạo dữ liệu
    function initData() {
        let page = 0;
        let size = 5;
        let objFilter = {
            name: null,
            saleStartPrice: null,
            saleEndPrice: null,
            status: null,
            categoryId: null
        };
        getBooks(page, size, objFilter);
        fetchCategories();
    }

    // Hàm lấy danh sách sách sử dụng Fetch API
    async function getBooks(page, size, objectFilter) {
        try {
            // Tạo URL với tham số trang và kích thước
            let url = new URL(`http://localhost:8080/api/v1/product?page=${page}&size=${size}`);
            url.searchParams.append('page', page);
            url.searchParams.append('size', size);

            // Thêm các bộ lọc vào URL nếu có
            if (objectFilter.name) {
                url.searchParams.append('name', objectFilter.name);
            }
            if (objectFilter.saleStartPrice) {
                url.searchParams.append('saleStartPrice', objectFilter.saleStartPrice);
            }
            if (objectFilter.saleEndPrice) {
                url.searchParams.append('saleEndPrice', objectFilter.saleEndPrice);
            }
            if (objectFilter.status !== null) {
                url.searchParams.append('status', objectFilter.status);
            }
            if (objectFilter.categoryId) {
                url.searchParams.append('categoryId', objectFilter.categoryId);
            }

            // Gửi yêu cầu GET tới API
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data);

            // Xóa nội dung bảng hiện tại
            const bodyTable = document.querySelector('#datatable-buttons tbody');
            bodyTable.innerHTML = '';

            // Duyệt qua danh sách sách và thêm vào bảng
            data.content.forEach(book => {
                const row = document.createElement('tr');

                // ID
                const idCell = document.createElement('td');
                idCell.textContent = book.id;
                row.appendChild(idCell);

                // Hình ảnh
                const imageCell = document.createElement('td');
                const img = document.createElement('img');
                img.src = book.imageUrl ? book.imageUrl : '../../../static/assets_admin/images/no-image.png';
                img.alt = 'Thumbnail';
                img.classList.add('img-thumbnail');
                imageCell.appendChild(img);
                row.appendChild(imageCell);

                // Tên sách
                const nameCell = document.createElement('td');
                nameCell.textContent = book.name;
                row.appendChild(nameCell);

                // Tác giả
                const authorCell = document.createElement('td');
                authorCell.textContent = book.author;
                row.appendChild(authorCell);

                // Số trang
                const pageCell = document.createElement('td');
                pageCell.textContent = book.page;
                row.appendChild(pageCell);

                // Ngày xuất bản
                const dateCell = document.createElement('td');
                dateCell.textContent = new Date(book.datePublic).toLocaleDateString('vi-VN');
                row.appendChild(dateCell);

                // Thể loại
                const categoryCell = document.createElement('td');
                categoryCell.textContent = book.category;
                row.appendChild(categoryCell);

                // Trạng thái
                const statusCell = document.createElement('td');
                statusCell.textContent = book.status ? 'ACTIVE' : 'INACTIVE';
                row.appendChild(statusCell);

                // Hành động
                const actionCell = document.createElement('td');

                // Nút Chi tiết (Cập nhật)
                const detailLink = document.createElement('a');
                detailLink.href = `update-product.php?id=${book.id}`;
                detailLink.classList.add('btn', 'btn-info', 'mr-2');
                detailLink.textContent = 'Chi tiết';
                actionCell.appendChild(detailLink);

                // Nút Xóa
                // const deleteButton = document.createElement('button');
                // deleteButton.classList.add('btn', 'btn-danger', 'mr-2');
                // deleteButton.textContent = 'Xóa';
                // deleteButton.dataset.id = book.id;
                // deleteButton.addEventListener('click', deleteBook);
                // actionCell.appendChild(deleteButton);

                row.appendChild(actionCell);

                bodyTable.appendChild(row);
            });

            // Phân trang
            renderPagination(data.totalPages, data.number, size);
        } catch (error) {
            console.error('Error fetching books:', error);
            alert('Không thể lấy dữ liệu sách. Vui lòng thử lại sau.');
        }
    }

    // Hàm xóa sách
    async function deleteBook(event) {
        const bookId = event.target.dataset.id;
        const confirmation = confirm("Bạn có chắc chắn muốn xoá sách này không?");
        if (confirmation) {
            try {
                const response = await fetch(`http://localhost:8080/product?id=${bookId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                alert('Xóa sách thành công!');
                // Tải lại danh sách sách
                initData();
            } catch (error) {
                console.error('Error deleting book:', error);
                alert('Xóa sách thất bại. Vui lòng thử lại sau.');
            }
        }
    }

    // Hàm định dạng số thập phân
    function formatDecimal(value) {
        return Number(value).toLocaleString('vi-VN', {minimumFractionDigits: 0});
    }

    // Hàm tìm kiếm theo điều kiện
    function searchCondition(page, size) {
        let filter = {};
        filter.name = document.getElementById('bookName').value.trim() === '' ? null : document.getElementById('bookName').value.trim();
        filter.saleStartPrice = document.getElementById('saleStartPrice').value === '' ? null : parseInt(document.getElementById('saleStartPrice').value);
        filter.saleEndPrice = document.getElementById('saleEndPrice').value === '' ? null : parseInt(document.getElementById('saleEndPrice').value);
        filter.status = document.getElementById('status').value === '' ? null : parseInt(document.getElementById('status').value);
        filter.categoryId = document.getElementById('category').value === '0' ? null : parseInt(document.getElementById('category').value);
        console.log(filter);
        getBooks(page, size, filter);
    }

    // Hàm thay đổi trang
    function changePage(page, size, event) {
        event.preventDefault();
        searchCondition(page, size);
    }

    // Hàm render phân trang
    function renderPagination(totalPages, currentPage, size) {
        const pagination = document.getElementById('pageId');
        pagination.innerHTML = '';

        // Nút Previous
        const prevLi = document.createElement('li');
        prevLi.classList.add('page-item');
        if (currentPage === 0) {
            prevLi.classList.add('disabled');
        }
        const prevLink = document.createElement('a');
        prevLink.classList.add('page-link');
        prevLink.href = "#";
        prevLink.textContent = "Previous";
        prevLink.addEventListener('click', (event) => changePage(currentPage - 1, size, event));
        prevLi.appendChild(prevLink);
        pagination.appendChild(prevLi);

        // Các nút số trang
        for (let i = 0; i < totalPages; i++) {
            const pageLi = document.createElement('li');
            pageLi.classList.add('page-item');
            if (i === currentPage) {
                pageLi.classList.add('active');
            }
            const pageLink = document.createElement('a');
            pageLink.classList.add('page-link');
            pageLink.href = "#";
            pageLink.textContent = i + 1;
            pageLink.addEventListener('click', (event) => changePage(i, size, event));
            pageLi.appendChild(pageLink);
            pagination.appendChild(pageLi);
        }

        // Nút Next
        const nextLi = document.createElement('li');
        nextLi.classList.add('page-item');
        if (currentPage === totalPages - 1) {
            nextLi.classList.add('disabled');
        }
        const nextLink = document.createElement('a');
        nextLink.classList.add('page-link');
        nextLink.href = "#";
        nextLink.textContent = "Next";
        nextLink.addEventListener('click', (event) => changePage(currentPage + 1, size, event));
        nextLi.appendChild(nextLink);
        pagination.appendChild(nextLi);
    }




// Hàm xóa sách
async function deleteBook(event) {
    const bookId = event.target.dataset.id;
    const confirmation = confirm("Bạn có chắc chắn muốn xoá sách này không?");
    if (confirmation) {
        try {
            const response = await fetch(`http://localhost:8080/product?id=${bookId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            alert('Xóa sách thành công!');
            // Tải lại danh sách sách
            initData();
        } catch (error) {
            console.error('Error deleting book:', error);
            alert('Xóa sách thất bại. Vui lòng thử lại sau.');
        }
    }
}

async function fetchCategories() {
    try {
        const response = await fetch(`http://localhost:8080/api/v1/category`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const categories = response.data;

        const categorySelect = document.getElementById('category');
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.id; // Giả sử 'id' là trường định danh
            option.textContent = category.name;
            categorySelect.appendChild(option);
        });
    } catch (error) {
        console.error(error);
        alert('Có lỗi xảy ra khi tải danh sách thể loại.', 'error');
    }
}


