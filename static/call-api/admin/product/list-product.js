document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    const btnSearch = document.getElementById('btnSearch');
    if (btnSearch) {
        btnSearch.addEventListener('click', (e) => {
            e.preventDefault();
            handleSearch();
        });
    }
});

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
