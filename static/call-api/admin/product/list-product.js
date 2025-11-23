<<<<<<< HEAD
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
=======
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    const btnSearch = document.getElementById('btnSearch');
    if (btnSearch) {
        btnSearch.addEventListener('click', (e) => {
            e.preventDefault();
            handleSearch();
        });
    }

    document.getElementById('logout-btn').addEventListener('click', function() {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('username');
        window.location.href = '../../auth/login.php'; // Chuyển về trang login
>>>>>>> 0621c00fa46de7d2f4e66054945f8709ee9bca5e
    });
});

<<<<<<< HEAD
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
=======
/**
 * Khởi tạo ứng dụng khi trang được tải.
 */
function initializeApp() {
    const initialPage = 0;
    const initialSize = 5;
    const initialFilters = {
        bookName: null,
        saleStartPrice: null,
        saleEndPrice: null,
        status: null,
        categoryId: null
    };
    fetchBooks(initialPage, initialSize, initialFilters);
    fetchCategories();
}

/**
 * Hàm lấy danh sách sách từ API với phân trang và bộ lọc.
 * @param {number} page - Số trang hiện tại.
 * @param {number} size - Số lượng mục trên mỗi trang.
 * @param {Object} filters - Bộ lọc tìm kiếm.
 */
async function fetchBooks(page, size, filters) {
    try {
        const url = new URL('http://localhost:8080/api/v1/product/search');
        const params = new URLSearchParams({ page, size });

        // Thêm các bộ lọc vào URL nếu có
        Object.entries(filters).forEach(([key, value]) => {
            if (value !== null && value !== undefined && value !== '') {
                params.append(key, value);
            }
        });

        url.search = params.toString();

        const response = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
            throw new Error(`Lỗi HTTP! Trạng thái: ${response.status}`);
        }

        const data = await response.json();
        console.log('Dữ liệu nhận được:', data);

        renderBooks(data.content);
        renderPagination(data.totalPages, data.number, size);
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu sách:', error);
        alert('Không thể lấy dữ liệu sách. Vui lòng thử lại sau.');
    }
}

/**
 * Hàm render danh sách sách vào bảng.
 * @param {Array} books - Mảng sách nhận được từ API.
 */
function renderBooks(books) {
    const tbody = document.querySelector('#datatable-buttons tbody');
    if (!tbody) return;
    tbody.innerHTML = ''; // Xóa nội dung bảng hiện tại

    books.forEach(book => {
        const row = document.createElement('tr');

        // ID
        appendCell(row, book.id);

        // Hình ảnh
        const imageHTML = `
            <img src="${book.image || '../../../static/assets_admin/images/no-image.png'}" 
                 alt="Thumbnail" 
                 class="img-thumbnail" 
                 style="width: 50px;">
        `;
        appendCell(row, imageHTML);

        // Tên sách
        appendCell(row, book.name);

        // Tác giả
        appendCell(row, book.author);

        // Số trang
        appendCell(row, book.page);

        // Ngày xuất bản
        /* const formattedDate = new Date(book.datePublic).toLocaleDateString('vi-VN');
        appendCell(row, formattedDate); */

        // Thể loại
        appendCell(row, book.category);

        // Trạng thái
        const statusText = book.status ? 'ACTIVE' : 'INACTIVE';
        appendCell(row, statusText);

        // Hành động
        const actionCell = document.createElement('td');

        // Nút Chi tiết
        const detailLink = document.createElement('a');
        detailLink.href = `update-product.php?id=${book.id}`;
        detailLink.classList.add('btn', 'btn-info', 'mr-2');
        detailLink.textContent = 'Chi tiết';
        actionCell.appendChild(detailLink);

        // Nút Xóa (nếu cần)
        /*
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('btn', 'btn-danger', 'mr-2');
        deleteButton.textContent = 'Xóa';
        deleteButton.dataset.id = book.id;
        deleteButton.addEventListener('click', () => deleteBook(book.id));
        actionCell.appendChild(deleteButton);
        */

        row.appendChild(actionCell);
        tbody.appendChild(row);
    });
}

/**
 * Hàm thêm một ô vào hàng bảng.
 * @param {HTMLTableRowElement} row - Hàng bảng.
 * @param {string} content - Nội dung của ô.
 */
function appendCell(row, content) {
    const cell = document.createElement('td');
    cell.innerHTML = content;
    row.appendChild(cell);
}

/**
 * Hàm xử lý sự kiện tìm kiếm.
 */
function handleSearch() {
    const bookName = getInputValue('bookName');
    const status = getSelectValue('status');
    const categoryId = getSelectValue('category');

    const searchCriteria = {
        bookName: bookName || null,
        status: status !== '' ? parseInt(status) : null,
        categoryId: categoryId !== '0' ? parseInt(categoryId) : null
    };

    console.log('Thông tin tìm kiếm:', searchCriteria);

    // Gọi hàm tìm kiếm với trang đầu tiên và kích thước 10
    fetchBooks(0, 10, searchCriteria);
}

/**
 * Hàm lấy giá trị từ input.
 * @param {string} id - ID của phần tử input.
 * @returns {string} - Giá trị đã được cắt bỏ khoảng trắng.
 */
function getInputValue(id) {
    const input = document.getElementById(id);
    return input ? input.value.trim() : '';
}

/**
 * Hàm lấy giá trị từ select.
 * @param {string} id - ID của phần tử select.
 * @returns {string} - Giá trị được chọn.
 */
function getSelectValue(id) {
    const select = document.getElementById(id);
    return select ? select.value : '';
}

/**
 * Hàm xóa sách theo ID.
 * @param {number} bookId - ID của sách cần xóa.
 */
async function deleteBook(bookId) {
    const confirmation = confirm("Bạn có chắc chắn muốn xoá sách này không?");
    if (!confirmation) return;

    try {
        const response = await fetch(`http://localhost:8080/api/v1/product/${bookId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
            throw new Error(`Lỗi HTTP! Trạng thái: ${response.status}`);
        }

        alert('Xóa sách thành công!');
        // Tải lại danh sách sách
        initializeApp();
    } catch (error) {
        console.error('Lỗi khi xóa sách:', error);
        alert('Xóa sách thất bại. Vui lòng thử lại sau.');
    }
}

/**
 * Hàm tải danh sách thể loại và đổ vào select #category.
 */
async function fetchCategories() {
    try {
        const response = await fetch('http://localhost:8080/api/v1/category', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
            throw new Error(`Lỗi HTTP! Trạng thái: ${response.status}`);
        }

        const categories = await response.json();
        console.log('Danh sách thể loại:', categories);
>>>>>>> 0621c00fa46de7d2f4e66054945f8709ee9bca5e

        const categorySelect = document.getElementById('category');
        if (!categorySelect) return;

        // Xóa các tùy chọn hiện tại (trừ tùy chọn "Tất cả")
        while (categorySelect.options.length > 1) {
            categorySelect.remove(1);
        }

        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.id;
            option.textContent = category.name;
            categorySelect.appendChild(option);
        });
    } catch (error) {
        console.error('Lỗi khi tải danh sách thể loại:', error);
        alert('Có lỗi xảy ra khi tải danh sách thể loại.');
    }
}

/**
 * Hàm render phân trang.
 * @param {number} totalPages - Tổng số trang.
 * @param {number} currentPage - Trang hiện tại (0-based).
 * @param {number} size - Số mục trên mỗi trang.
 */
function renderPagination(totalPages, currentPage, size) {
    const pagination = document.getElementById('pageId');
    if (!pagination) return;
    pagination.innerHTML = '';

    // Nút Previous
    const prevLi = createPaginationItem('Previous', currentPage > 0, () => changePage(currentPage - 1, size));
    pagination.appendChild(prevLi);

    // Các nút số trang
    for (let i = 0; i < totalPages; i++) {
        const isActive = i === currentPage;
        const pageLi = createPaginationItem((i + 1).toString(), true, () => changePage(i, size));
        if (isActive) {
            pageLi.classList.add('active');
        }
        pagination.appendChild(pageLi);
    }

    // Nút Next
    const nextLi = createPaginationItem('Next', currentPage < totalPages - 1, () => changePage(currentPage + 1, size));
    pagination.appendChild(nextLi);
}

/**
 * Hàm tạo một mục phân trang.
 * @param {string} text - Văn bản hiển thị trên nút.
 * @param {boolean} enabled - Trạng thái kích hoạt của nút.
 * @param {Function} onClick - Hàm được gọi khi nút được nhấn.
 * @returns {HTMLLIElement} - Mục phân trang.
 */
function createPaginationItem(text, enabled, onClick) {
    const li = document.createElement('li');
    li.classList.add('page-item');
    if (!enabled) {
        li.classList.add('disabled');
    }

    const a = document.createElement('a');
    a.classList.add('page-link');
    a.href = '#';
    a.textContent = text;
    a.addEventListener('click', (event) => {
        event.preventDefault();
        if (enabled && typeof onClick === 'function') {
            onClick();
        }
    });

    li.appendChild(a);
    return li;
}

/**
 * Hàm thay đổi trang hiện tại.
 * @param {number} page - Trang mới.
 * @param {number} size - Số mục trên mỗi trang.
 */
function changePage(page, size) {
    const currentFilters = getCurrentFilters();
    fetchBooks(page, size, currentFilters);
}

/**
 * Hàm lấy các bộ lọc hiện tại từ form tìm kiếm.
 * @returns {Object} - Các bộ lọc hiện tại.
 */
function getCurrentFilters() {
    const bookName = getInputValue('bookName');
    const status = getSelectValue('status');
    const categoryId = getSelectValue('category');

    return {
        bookName: bookName || null,
        status: status !== '' ? parseInt(status) : null,
        categoryId: categoryId !== '0' ? parseInt(categoryId) : null
    };
}
