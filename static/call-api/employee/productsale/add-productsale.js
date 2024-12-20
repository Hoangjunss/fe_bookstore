document.addEventListener('DOMContentLoaded', function () {
    // Lấy ID Product Sale từ URL (ví dụ: add-productsale.php?id=1)
    const urlParams = new URLSearchParams(window.location.search);
    const productSaleIdFromURL = urlParams.get('id');
    console.log("productSaleIdFromURL", productSaleIdFromURL)

    // const productsaleSelect = document.getElementById('productsale-select');

    // Fetch và populate danh sách Product Sales vào dropdown
    fetchProductSales(productSaleIdFromURL);

    // Lắng nghe sự kiện thay đổi của dropdown
    // productsaleSelect.addEventListener('change', function () {
    //     const selectedId = this.value;
    //     if (selectedId) {
    //         getProductSaleDetails(selectedId);
    //         getWarehousesByProductId(selectedId);
    //     } else {
    //         clearProductSaleInfo();
    //         clearWarehouseTable();
    //     }
    // });

    // Lắng nghe sự kiện submit của form xuất hàng
    const exportForm = document.getElementById('export-form');
    exportForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const selectedId = productSaleIdFromURL;
        const price = parseFloat(document.getElementById('export-price').value,10);
        const quantity = parseInt(document.getElementById('export-quantity').value, 10);
        const rows = document.querySelectorAll('#warehouse-table tbody tr');
        var quantitywarehouse = 0;
        rows.forEach(row => {
             quantitywarehouse = row.querySelector('[data-quantity]').dataset.quantity;
            console.log('Quantity:', quantity);
        });
        console.log("quantity", quantity)

        if (!selectedId) {
            showErrorMessage('Vui lòng chọn Product Sale trước khi xuất hàng.');
            return;
        }

        if (isNaN(price) || isNaN(quantity) || quantity <= 0) {
            showErrorMessage('Vui lòng nhập giá và số lượng hợp lệ.');
            return;
        }
        if(quantity>quantitywarehouse){
            showErrorMessage('Số lượng xuất vượt quá số lượng trong kho.');
            return;
        }
        // Lấy bảng
const table = document.querySelector('.hello'); // Lấy bảng theo class hoặc id
var quantityReal;
// Duyệt qua tất cả các hàng
const helloo = table.querySelectorAll('tr');

    const cells = helloo[1].querySelectorAll('td');
    if (cells.length > 1) {
        const quantityText = cells[0].textContent.trim(); // Cột thứ 2
         quantityReal = parseInt(quantityText, 10);
        console.log('Số lượng:', quantity);
    }


       
        console.log("quantityReal", quantityReal);
        console.log("quantityexport", quantity);
        const   quantityExport = parseInt(quantity+quantityReal,10);
        console.log("quantityExport", quantityExport)

        // Gửi yêu cầu xuất hàng
        exportProductSale(selectedId, price, quantityExport);
    });

    // Nếu có ID trong URL, chọn nó mặc định
    if (productSaleIdFromURL) {
        getProductSaleDetails(productSaleIdFromURL);
        getWarehousesByProductId(productSaleIdFromURL);
    }

    document.getElementById('logout-btn').addEventListener('click', function () {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('username');
        window.location.href = '../../auth/login.php'; // Chuyển về trang login
    });
});

/**
 * Hàm fetch và populate danh sách Product Sales vào dropdown
 * @param {string} defaultId - ID Product Sale mặc định
 */
async function fetchProductSales(defaultId) {
    try {
        let response = await fetch(`http://localhost:8080/api/v1/productsales?page=0&size=100`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Error fetching Product Sales: ${response.status} ${response.statusText}`);
        }

        let data = await response.json();
        // const productsaleSelect = document.getElementById('productsale-select');

        data.content.forEach(productSale => {
            const option = document.createElement('option');
            option.value = productSale.id;
            option.textContent = `ID: ${productSale.id} - ${productSale.product.name}`;
            // productsaleSelect.appendChild(option);
        });

    } catch (error) {
        console.error(error);
        showErrorMessage('Có lỗi xảy ra khi tải danh sách Product Sales.');
    }
}

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
            throw new Error(`Error fetching Product Sale Details: ${response.status} ${response.statusText}`);
        }

        let data = await response.json();
        console.log(data);

        displayProductSaleInfo(data);

    } catch (error) {
        console.error(error);
        showErrorMessage('Có lỗi xảy ra khi tải dữ liệu Product Sale.');
    }
}

/**
 * Hàm lấy danh sách Warehouse theo Product ID
 * @param {number} productSaleId - ID Product Sale
 */
async function getWarehousesByProductId(productSaleId) {
    console.log("productSaleId", productSaleId)
    try {
        // Lấy Product từ ProductSale
        let productResponse = await fetch(`http://localhost:8080/api/v1/productsales/id?id=${productSaleId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!productResponse.ok) {
            throw new Error(`Error fetching Product: ${productResponse.status} ${productResponse.statusText}`);
        }

        let productSaleData = await productResponse.json();
        const productId = productSaleData.product.id;

        // Fetch danh sách Warehouse theo productId
        let warehouseResponse = await fetch(`http://localhost:8080/api/v1/warehouses/id?idProduct=${productId}&page=0&size=100`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!warehouseResponse.ok) {
            throw new Error(`Error fetching Warehouses: ${warehouseResponse.status} ${warehouseResponse.statusText}`);
        }

        let warehouseData = await warehouseResponse.json();
        const warehouses = warehouseData || [];
        displayWarehouseTable(warehouses);

    } catch (error) {
        console.error(error);
        showErrorMessage('Có lỗi xảy ra khi tải dữ liệu Warehouse.');
    }
}

/**
 * Hàm hiển thị thông tin Product Sale
 * @param {object} productSale - Đối tượng Product Sale
 */
function displayProductSaleInfo(productSale) {
    document.getElementById('productsale-id').textContent = productSale.id;
    document.getElementById('productsale-price').value = productSale.price; // Đặt giá vào input form xuất hàng
    document.getElementById('productsale-quantity').textContent = productSale.quantity;

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
 * Hàm hiển thị danh sách Warehouse trong bảng
 * @param {Array} warehouses - Danh sách Warehouse
 */
function displayWarehouseTable(warehouses) {
    console.log("warehouses danh sach : ", warehouses);
    let bodyTable = document.querySelector('#warehouse-table tbody');
    bodyTable.innerHTML = ''; // Xóa dữ liệu cũ

    // Nếu không phải mảng, chuyển thành mảng
    if (!Array.isArray(warehouses)) {
        warehouses = [warehouses]; // Đưa object vào mảng
    }

    if (warehouses.length === 0) {
        bodyTable.innerHTML = '<tr><td colspan="5" class="text-center">Không có sản phẩm trong kho.</td></tr>';
        return;
    }

    warehouses.forEach(warehouse => {
        let formattedPrice = formatCurrency(warehouse.price);
        let formattedDate = formatDate(warehouse.date);

        // Tạo một hàng mới trong bảng
        let row = document.createElement('tr');

        row.innerHTML = `
            <td>${warehouse.id}</td>
            <td>${warehouse.productName}</td>
            <td  data-quantity="${warehouse.quantity}">${warehouse.quantity}</td>
            <td>${formattedPrice}</td>
            <td>${formattedDate}</td>
        `;

        bodyTable.appendChild(row);
    });
}

/**
 * Hàm xử lý form xuất hàng
 * @param {number} productSaleId - ID Product Sale
 * @param {number} price - Giá xuất
 * @param {number} quantity - Số lượng xuất
 */
async function exportProductSale(productSaleId, price, quantity) {

    // Lấy productSaleId từ URL
    const urlParams = new URLSearchParams(window.location.search);
    const idProductSale = urlParams.get('id');
    const quantityReal = parseInt(quantity, 10);

    try {
        // Tạo đối tượng ExportRequest
        const exportRequest = {


            id: idProductSale,

            price: price,
            quantity: quantityReal,
            status: true

        };

        // TODO: Xác định warehouseId từ người dùng chọn hoặc thêm logic để phân phối số lượng xuất từ các kho khác nhau

        // Gửi yêu cầu POST để xuất hàng
        let response = await fetch(`http://localhost:8080/api/v1/productsales`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(exportRequest)
        });

        if (!response.ok) {
            let errorMessage = await response.text();
            throw new Error(`Error exporting Product Sale: ${errorMessage}`);
        }

        let data = await response.json();
        console.log(data);
        alert('Xuất hàng thành công.');

        // Reset form
        document.getElementById('export-form').reset();

        // Reload danh sách Warehouse
        getWarehousesByProductId(idProductSale);

    } catch (error) {
        console.error(error);
        showErrorMessage('Xuất hàng thất bại. Vui lòng kiểm tra lại thông tin.');
    }
}

/**
 * Hàm hiển thị thông báo lỗi
 * @param {string} message - Thông điệp lỗi
 */
function showErrorMessage(message) {
    const errorMessageDiv = document.getElementById('error-message');
    errorMessageDiv.textContent = message;

    // Tự động ẩn sau 5 giây
    setTimeout(() => {
        errorMessageDiv.textContent = '';
    }, 5000);
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

/**
 * Hàm xóa thông tin Product Sale
 */
function clearProductSaleInfo() {
    document.getElementById('productsale-id').textContent = '#';
    document.getElementById('productsale-price').value = '';
    document.getElementById('productsale-quantity').textContent = '#';
    document.getElementById('productsale-status').textContent = '#';
    document.getElementById('productsale-status').className = 'status-badge badge badge-info';
}

/**
 * Hàm xóa bảng Warehouse
 */
function clearWarehouseTable() {
    let bodyTable = document.querySelector('#warehouse-table tbody');
    bodyTable.innerHTML = '<tr><td colspan="5" class="text-center">Không có sản phẩm trong kho.</td></tr>';
}
