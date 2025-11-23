    document.addEventListener('DOMContentLoaded', function () {
        initData();
        document.getElementById('btnSearch').addEventListener('click', function() {
            searchCondition(0, 10);
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

    function getToken() {
        return localStorage.getItem('token');
    }

    // Hàm lấy danh sách sách sử dụng Fetch API
    async function getBooks(page, size, objectFilter) {
        try {
            const accessToken = getToken();
    
            if (!accessToken) {
                showNotification('Không tìm thấy token xác thực. Vui lòng đăng nhập lại.', 'error');
                return;
            }
    
            // Tạo URL với các tham số truy vấn
            let url = new URL('http://localhost:8080/api/v1/product');
            let queryParams = new URLSearchParams({
                page: page,
                size: size
            });
    
            // Thêm các bộ lọc vào queryParams nếu có
            if (objectFilter.name) {
                queryParams.append('name', objectFilter.name);
            }
            if (objectFilter.author) { // Thay 'status' bằng 'author' theo backend
                queryParams.append('author', objectFilter.author);
            }
            if (objectFilter.minPrice) { // Thay 'saleStartPrice' bằng 'minPrice' theo backend
                queryParams.append('minPrice', objectFilter.minPrice);
            }
            if (objectFilter.maxPrice) { // Thay 'saleEndPrice' bằng 'maxPrice' theo backend
                queryParams.append('maxPrice', objectFilter.maxPrice);
            }
            if (objectFilter.categoryId) {
                queryParams.append('categoryId', objectFilter.categoryId);
            }
    
            // Gắn các tham số truy vấn vào URL
            url.search = queryParams.toString();
    
            // Định nghĩa các tùy chọn cho fetch, bao gồm cả header Authorization
            const options = {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            };
    
            // Gửi yêu cầu GET tới API
            const response = await fetch(url.toString(), options);
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || `HTTP error! Status: ${response.status}`);
            }
    
            const data = await response.json();
            console.log(data);
    
            // Kiểm tra nếu không có sách nào được tìm thấy
            if (!data.content || data.content.length === 0) {
                showNotification('Không tìm thấy sách nào với tiêu chí lọc đã chọn.', 'info');
                return;
            }
    
            // Nếu có sách, tiếp tục xử lý
            renderData(data, size);
        } catch (error) {
            console.error('Error fetching books:', error);
            showNotification('Không thể lấy dữ liệu sách. Vui lòng thử lại sau.', 'error');
        }
    }

    // Hàm xóa sách
    async function deleteBook(event) {
        const bookId = event.target.dataset.id;
        const confirmation = confirm("Bạn có chắc chắn muốn xoá sách này không?");
        if (confirmation) {
            try {
                const accessToken = getToken();
                const options = {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    }
                };
                const response = await fetch(`http://localhost:8080/api/v1/product?id=${bookId}`, options);

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
        //filter.saleStartPrice = document.getElementById('saleStartPrice').value === '' ? null : parseInt(document.getElementById('saleStartPrice').value);
        //filter.saleEndPrice = document.getElementById('saleEndPrice').value === '' ? null : parseInt(document.getElementById('saleEndPrice').value);
        //filter.status = document.getElementById('status').value === '' ? null : parseInt(document.getElementById('status').value);
        filter.categoryId = document.getElementById('category').value === '0' ? null : parseInt(document.getElementById('category').value);
        console.log(filter);
        getBooks(page, size, filter);
    }

    // Hàm thay đổi trang
    function changePage(page, size, event) {
        event.preventDefault();
        searchCondition(page, size);
    }

    function renderData(data, size){
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
    img.src = book.image ? book.image : '../../../static/assets_admin/images/no-image.png';
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
    dateCell.textContent = book.quantity;
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
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('btn', 'btn-danger', 'mr-2');
    deleteButton.textContent = 'Xóa';
    deleteButton.dataset.id = book.id;
    deleteButton.addEventListener('click', deleteBook);
    actionCell.appendChild(deleteButton);

    row.appendChild(actionCell);

    bodyTable.appendChild(row);
});

// Phân trang
renderPagination(data.totalPages, data.number, size);
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
    
async function fetchCategories() {
    try {
        const response = await axios.get('http://localhost:8080/api/v1/category');
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


