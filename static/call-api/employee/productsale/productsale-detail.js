document.addEventListener('DOMContentLoaded', function () {
    // Lấy ID Product Sale từ URL (ví dụ: productsale-detail.php?id=1)
    const urlParams = new URLSearchParams(window.location.search);
    const productSaleId = urlParams.get('id');

    if (productSaleId) {
        getProductSaleDetails(productSaleId);
    } else {
        alert('Không tìm thấy ID Product Sale.');
        // Điều hướng quay lại danh sách Product Sale
        //window.location.href = 'list-productsale.php';
    }
});

/**
 * Hàm lấy chi tiết Product Sale từ backend
 * @param {number} id - ID Product Sale
 */
async function getProductSaleDetails(id) {
    try {
        let response = await fetch(`http://localhost:8080/api/v1/productsales/id?id=${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        let data = await response.json();
        console.log(data);

        displayProductSaleInfo(data);
        displayProductInfo(data.product);

    } catch (error) {
        console.error(error);
        alert('Có lỗi xảy ra khi tải dữ liệu Product Sale.');
        // Điều hướng quay lại danh sách Product Sale
        window.location.href = 'list-productsale.php';
    }
}

/**
 * Hàm hiển thị thông tin chung của Product Sale
 * @param {object} productSale - Đối tượng Product Sale
 */
function displayProductSaleInfo(productSale) {
    document.getElementById('productsale-id').textContent = productSale.id;
    document.getElementById('productsale-price').textContent = formatCurrency(productSale.price);
    document.getElementById('productsale-quantity').textContent = productSale.quantity;

    // Cập nhật trạng thái Product Sale
    const statusElement = document.getElementById('productsale-status');
    if (productSale.status) {
        statusElement.textContent = 'Active';
        statusElement.className = 'status-badge badge badge-success';
    } else {
        statusElement.textContent = 'Inactive';
        statusElement.className = 'status-badge badge badge-danger';
    }
}

/**
 * Hàm hiển thị thông tin sản phẩm
 * @param {object} product - Đối tượng sản phẩm
 */
function displayProductInfo(product) {
    document.getElementById('product-id').textContent = product.id;
    document.getElementById('product-name').textContent = product.name;
    document.getElementById('product-author').textContent = product.author || 'N/A';
    document.getElementById('product-date-public').textContent = formatDate(product.datePublic);
    document.getElementById('product-description').textContent = product.description || 'N/A';

    // Hiển thị hình ảnh sản phẩm
    const productImageCell = document.getElementById('product-image');
    if (product.image && product.image.url) {
        productImageCell.innerHTML = `<img src="${product.image.url}" alt="${product.name}" class="product-image">`;
    } else {
        productImageCell.innerHTML = 'Không có hình ảnh';
    }
}

/**
 * Hàm định dạng số thành tiền tệ VND
 * @param {number} value - Giá trị cần định dạng
 * @returns {string} - Chuỗi định dạng tiền tệ
 */
function formatCurrency(value) {
    if (value === null || value === undefined) return '0 VND';
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(value);
}

/**
 * Hàm định dạng ngày tháng theo định dạng Việt Nam
 * @param {string} dateString - Chuỗi ngày tháng
 * @returns {string} - Chuỗi ngày tháng đã định dạng
 */
function formatDate(dateString) {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}
