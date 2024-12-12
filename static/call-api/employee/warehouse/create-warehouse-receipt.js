// Hàm hiển thị thông báo
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
/**
 * Hàm lấy danh sách Warehouse từ backend
 * @param {number} page - Trang hiện tại
 * @param {number} size - Số lượng Warehouse mỗi trang
 */

document.addEventListener('DOMContentLoaded', function () {
    // Khởi tạo Parsley cho form
    $('#myForm').parsley();

    // Hàm để tải danh sách nhà cung cấp từ backend
    async function loadSuppliers() {
        const params = {
            page: 0,
            size: 100
        };
        try {
            let response = await axios.get('http://localhost:8081/api/v1/supplies', { params }); // Endpoint để lấy danh sách nhà cung cấp
            let suppliers = response.data.content; // Giả sử trả về { content: [...], ... }

            const supplySelect = document.getElementById('supply');
            suppliers.forEach(supply => {
                let option = document.createElement('option');
                option.value = supply.id;
                option.textContent = supply.name;
                supplySelect.appendChild(option);
            });
        } catch (error) {
            console.error(error);
            showNotification('Có lỗi xảy ra khi tải danh sách nhà cung cấp.', 'error');
        }
    }

    // Gọi hàm tải nhà cung cấp khi trang được tải
    loadSuppliers();

    // Hàm để tìm kiếm sản phẩm
    async function searchProducts(query) {
        try {
            let response = await axios.get(`http://localhost:8081/api/v1/product/search?bookName=${encodeURIComponent(query)}`); // Endpoint tìm kiếm sản phẩm
            let products = response.data.content; // Giả sử trả về { content: [...], ... }

            const productList = document.getElementById('product-list');
            productList.innerHTML = ''; // Xóa danh sách cũ

            if (products.length === 0) {
                let noResult = document.createElement('div');
                noResult.className = 'list-group-item';
                noResult.textContent = 'Không tìm thấy sản phẩm nào.';
                productList.appendChild(noResult);
                return;
            }

            products.forEach(product => {
                let item = document.createElement('a');
                item.href = 'javascript:void(0);';
                item.className = 'list-group-item list-group-item-action';
                item.textContent = product.name;
                item.addEventListener('click', () => {
                    addProductToTable(product);
                    productList.innerHTML = ''; // Ẩn danh sách sau khi chọn
                    document.getElementById('product-search').value = ''; // Xóa ô tìm kiếm
                });
                productList.appendChild(item);
            });
        } catch (error) {
            console.error(error);
            showNotification('Có lỗi xảy ra khi tìm kiếm sản phẩm.', 'error');
        }
    }

    // Sự kiện khi người dùng nhập vào ô tìm kiếm sản phẩm
    document.getElementById('product-search').addEventListener('input', function () {
        const query = this.value.trim();
        console.log(query);
        if (query.length >= 2) { // Tìm kiếm khi từ khóa có ít nhất 2 ký tự
            searchProducts(query);
        } else {
            document.getElementById('product-list').innerHTML = '';
        }
    });

    // Hàm để thêm sản phẩm vào bảng
    function addProductToTable(product) {
        const tableBody = document.getElementById('product-table-body');

        // Kiểm tra sản phẩm đã tồn tại trong bảng chưa
        const existingRow = Array.from(tableBody.children).find(row => row.getAttribute('data-id') == product.id);
        if (existingRow) {
            showNotification('Sản phẩm đã được thêm vào phiếu nhập.', 'info');
            return;
        }

        // Tạo hàng mới
        const row = document.createElement('tr');
        row.setAttribute('data-id', product.id);

        row.innerHTML = `
            <td>${product.name}</td>
            <td>
                <input type="number" class="form-control quantity-input" min="1" value="1" />
                <div class="error-message"></div>
            </td>
            <td>
                <input type="number" class="form-control unit-price-input" min="0" step="0.01" value="${product.price}" />
                <div class="error-message"></div>
            </td>
            <td class="total-price">0 VND</td>
            <td>
                <button type="button" class="btn btn-danger btn-sm remove-button">Xóa</button>
            </td>
        `;

        tableBody.appendChild(row);
        updateTotalPrice(row);

        // Thêm sự kiện cho các ô nhập liệu
        const quantityInput = row.querySelector('.quantity-input');
        const unitPriceInput = row.querySelector('.unit-price-input');
        const removeButton = row.querySelector('.remove-button');

        quantityInput.addEventListener('input', () => updateTotalPrice(row));
        unitPriceInput.addEventListener('input', () => updateTotalPrice(row));
        removeButton.addEventListener('click', () => {
            row.remove();
            calculateOverallTotal();
        });

        calculateOverallTotal();
    }

    // Hàm để cập nhật tổng giá của một hàng
    function updateTotalPrice(row) {
        const quantity = parseInt(row.querySelector('.quantity-input').value) || 0;
        const unitPrice = parseFloat(row.querySelector('.unit-price-input').value) || 0;
        const totalPriceCell = row.querySelector('.total-price');

        if (quantity < 1) {
            row.querySelector('.quantity-input').nextElementSibling.textContent = 'Số lượng phải lớn hơn 0.';
        } else {
            row.querySelector('.quantity-input').nextElementSibling.textContent = '';
        }

        if (unitPrice < 0) {
            row.querySelector('.unit-price-input').nextElementSibling.textContent = 'Giá đơn vị không hợp lệ.';
        } else {
            row.querySelector('.unit-price-input').nextElementSibling.textContent = '';
        }

        const totalPrice = quantity * unitPrice;
        totalPriceCell.textContent = formatCurrency(totalPrice);

        calculateOverallTotal();
    }

    // Hàm để tính tổng giá trị phiếu nhập
    function calculateOverallTotal() {
        const rows = document.querySelectorAll('#product-table-body tr');
        let overallTotal = 0;

        rows.forEach(row => {
            const quantity = parseInt(row.querySelector('.quantity-input').value) || 0;
            const unitPrice = parseFloat(row.querySelector('.unit-price-input').value) || 0;
            overallTotal += quantity * unitPrice;
        });

        document.getElementById('total-price').value = formatCurrency(overallTotal);
    }


    // Hàm để định dạng số thành tiền tệ VND
    function formatCurrency(value) {
        if (value === null || value === undefined) return '0 VND';
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(value);
    }

    // Hàm để gửi dữ liệu tạo phiếu nhập đến backend
    document.getElementById('myForm').addEventListener('submit', async function (e) {
        e.preventDefault(); // Ngăn chặn hành vi mặc định của form

        // Kiểm tra form hợp lệ với Parsley
        if (!$('#myForm').parsley().isValid()) {
            showNotification('Vui lòng sửa các lỗi trong form trước khi gửi.', 'error');
            return;
        }

        // Xóa các thông báo lỗi trước đó
        document.querySelectorAll('.error-message').forEach(el => el.textContent = '');

        // Lấy giá trị từ form
        const supplyId = document.getElementById('supply').value;
        const date = document.getElementById('date').value;
        const totalPrice = parseFloat(document.getElementById('total-price').value.replace(/[^0-9.-]+/g, "")) || 0;

        // Lấy danh sách sản phẩm
        const productRows = document.querySelectorAll('#product-table-body tr');
        let wareHouseReceiptDetailDTOS = [];
        let hasError = false;

        productRows.forEach(row => {
            const productId = parseInt(row.getAttribute('data-id'));
            const quantity = parseInt(row.querySelector('.quantity-input').value) || 0;
            const unitPrice = parseFloat(row.querySelector('.unit-price-input').value) || 0;
            const totalPrice = quantity * unitPrice;

            if (quantity < 1) {
                row.querySelector('.quantity-input').nextElementSibling.textContent = 'Số lượng phải lớn hơn 0.';
                hasError = true;
            } else {
                row.querySelector('.quantity-input').nextElementSibling.textContent = '';
            }

            if (unitPrice < 0) {
                row.querySelector('.unit-price-input').nextElementSibling.textContent = 'Giá đơn vị không hợp lệ.';
                hasError = true;
            } else {
                row.querySelector('.unit-price-input').nextElementSibling.textContent = '';
            }

            if (quantity >= 1 && unitPrice >= 0) {
                wareHouseReceiptDetailDTOS.push({
                    idProduct: productId,
                    quantity: quantity,
                    unitPrice: unitPrice,
                    totalPrice: totalPrice
                });
            }
        });

        if (hasError) {
            showNotification('Vui lòng sửa các lỗi trong bảng sản phẩm trước khi gửi.', 'error');
            return;
        }

        if (wareHouseReceiptDetailDTOS.length === 0) {
            showNotification('Vui lòng thêm ít nhất một sản phẩm vào phiếu nhập.', 'error');
            return;
        }

        // Tạo đối tượng WarehouseReceiptCreateDTO
        const warehouseReceiptCreateDTO = {
            idSupply: parseInt(supplyId),
            quantity: wareHouseReceiptDetailDTOS.reduce((sum, item) => sum + item.quantity, 0),
            totalPrice: totalPrice,
            date: date,
            wareHouseReceiptDetailDTOS: wareHouseReceiptDetailDTOS
        };
        // Log payload gửi đi
        console.log("Payload sent to backend:", JSON.stringify(warehouseReceiptCreateDTO, null, 2));


        try {
            const response = await axios.post('http://localhost:8081/api/v1/warehouse-receipts', warehouseReceiptCreateDTO, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 201) {
                showNotification('Tạo phiếu nhập thành công!', 'success');
                // Reset form sau khi tạo thành công
                document.getElementById('myForm').reset();
                document.getElementById('product-table-body').innerHTML = '';
                document.getElementById('total-price').value = '0 VND';
            } else {
                throw new Error('Tạo phiếu nhập thất bại.');
            }
        } catch (error) {
            console.error(error);
            // Kiểm tra nếu lỗi là validation từ backend
            if (error.response && error.response.data && error.response.data.errors) {
                const errors = error.response.data.errors;
                for (const key in errors) {
                    if (errors.hasOwnProperty(key)) {
                        const errorMessage = errors[key];
                        const errorElement = document.getElementById(`error-${key}`);
                        if (errorElement) {
                            errorElement.textContent = errorMessage;
                        }
                    }
                }
            } else {
                showNotification('Tạo phiếu nhập thất bại. Vui lòng thử lại.', 'error');
            }
        }
    });
});
