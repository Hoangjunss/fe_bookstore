// update-product.js

/**
 * Hàm xem trước hình ảnh mới
 */
function previewImage(input) {
    let preview = document.getElementById('imagePreview');
    let file = input.files[0];

    if (file) {
        let reader = new FileReader();

        reader.onload = function (e) {
            preview.src = e.target.result;
        }
        reader.readAsDataURL(file);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    // Lấy ID sản phẩm từ URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (productId) {
        fetchProductData(productId);
    } else {
        alert('Không tìm thấy ID sản phẩm.');
        window.location.href = 'list-product.php';
    }

    // Xử lý submit form
    document.getElementById('updateProductForm').addEventListener('submit', function (e) {
        e.preventDefault(); // Ngăn form submit mặc định
        updateProduct(productId);
    });

    // Xử lý kiểm tra giá bán phải >= giá nhập
    document.getElementById('salePrice').addEventListener('input', function () {
        var price = parseFloat(document.getElementById('hiddenPrice').value);
        var salePrice = parseFloat(document.getElementById('hiddenSalePrice').value);
        var errorMessageDiv = document.getElementById('error-message');

        if (isNaN(price) || isNaN(salePrice) || salePrice < price) {
            errorMessageDiv.textContent = 'Giá bán phải lớn hơn hoặc bằng giá nhập.';
            this.setCustomValidity('Giá bán phải lớn hơn hoặc bằng giá nhập.');
        } else {
            errorMessageDiv.textContent = '';
            this.setCustomValidity('');
        }
    });
});

/**
 * Hàm lấy dữ liệu sản phẩm từ BE và điền vào form
 * @param {number} productId - ID sản phẩm
 */
async function fetchProductData(productId) {
    try {
        const response = await fetch(`http://localhost:8080/api/v1/product/id?id=${productId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const product = await response.json();
        populateForm(product);
    } catch (error) {
        console.error('Error fetching product data:', error);
        alert('Không thể lấy dữ liệu sản phẩm. Vui lòng thử lại sau.');
        window.location.href = 'list-product.php';
    }
}

/**
 * Hàm điền dữ liệu vào form
 * @param {object} product - Đối tượng sản phẩm
 */
function populateForm(product) {
    document.getElementById('id').value = product.id;
    document.getElementById('productName').value = product.name;
    document.getElementById('description').value = product.description;
    document.getElementById('author').value = product.author;
    document.getElementById('page').value = product.page;
    document.getElementById('datePublic').value = product.datePublic ? product.datePublic.substring(0, 10) : '';
    document.getElementById('size').value = product.size || '';
    document.getElementById('category').value = product.categoryId || '';
    document.getElementById('supply').value = product.supply || '';
    document.getElementById('status').value = product.status ? '1' : '0';
    document.getElementById('imagePreview').src = product.image;

    if (product.imageUrl) {
        document.getElementById('imagePreview').src = product.imageUrl;
    } else {
        document.getElementById('imagePreview').src = '../../../static/assets_admin/images/default-thumbnail.png';
    }

    // Nếu có danh sách hình ảnh, nạp vào imagesContainer
    if (product.images && product.images.length > 0) {
        const imagesContainer = document.getElementById('imagesContainer');
        imagesContainer.innerHTML = ''; // Xóa nội dung hiện tại

        product.images.forEach(image => {
            const imageDiv = document.createElement('div');
            imageDiv.classList.add('profile-picture', 'single-file-preview');

            const img = document.createElement('img');
            img.src = image.filePath;
            img.alt = image.fileName;
            img.classList.add('image');
            imageDiv.appendChild(img);

            const descDiv = document.createElement('div');
            descDiv.classList.add('description');
            const p = document.createElement('p');
            p.textContent = image.description || 'Không có mô tả';
            descDiv.appendChild(p);
            imageDiv.appendChild(descDiv);

            const inputDiv = document.createElement('div');
            inputDiv.classList.add('input');

            // Input file (ẩn)
            const fileInput = document.createElement('input');
            fileInput.name = `file${image.id}`;
            fileInput.type = 'file';
            fileInput.classList.add('d-none');
            inputDiv.appendChild(fileInput);

            // Input hidden imageId
            const imageIdInput = document.createElement('input');
            imageIdInput.value = image.id;
            imageIdInput.type = 'hidden';
            imageIdInput.name = 'imageId';
            imageIdInput.id = `imageId${image.id}`;
            inputDiv.appendChild(imageIdInput);

            // Nút Sửa
            const editButton = document.createElement('button');
            editButton.type = 'button';
            editButton.classList.add('btn-edit', 'btn', 'btn-warning', 'btn-sm');
            editButton.textContent = 'Sửa';
            editButton.onclick = function () {
                showEditForm(image.id);
            };
            inputDiv.appendChild(editButton);

            // Form sửa mô tả hình ảnh
            const editFormDiv = document.createElement('div');
            editFormDiv.classList.add('edit-reply-form');
            editFormDiv.id = `editForm_${image.id}`;
            editFormDiv.style.display = 'none';

            const editForm = document.createElement('form');
            editForm.action = `/admin/image/update.html`;
            editForm.method = 'post';

            // Input hidden imageId
            const editImageIdInput = document.createElement('input');
            editImageIdInput.type = 'hidden';
            editImageIdInput.name = 'imageId';
            editImageIdInput.value = image.id;
            editForm.appendChild(editImageIdInput);

            // Textarea mô tả
            const textarea = document.createElement('textarea');
            textarea.name = 'editedContent';
            textarea.id = `editedContent${image.id}`;
            textarea.classList.add('form-control');
            textarea.rows = 3;
            textarea.placeholder = 'Nhập mô tả mới';
            textarea.value = image.description || '';
            editForm.appendChild(textarea);

            // Nút xác nhận và đóng
            const confirmButton = document.createElement('button');
            confirmButton.type = 'submit';
            confirmButton.classList.add('btn-confirm', 'btn', 'btn-success', 'mt-2');
            confirmButton.textContent = 'Xác nhận';
            editForm.appendChild(confirmButton);

            const closeButton = document.createElement('button');
            closeButton.type = 'button';
            closeButton.classList.add('btn-close', 'btn', 'btn-danger', 'mt-2');
            closeButton.textContent = 'Đóng';
            closeButton.onclick = function () {
                hideEditForm(image.id);
            };
            editForm.appendChild(closeButton);

            editFormDiv.appendChild(editForm);
            inputDiv.appendChild(editFormDiv);

            // Nút Xóa
            const deleteButton = document.createElement('button');
            deleteButton.classList.add('btn', 'btn-danger', 'btn-sm', 'mt-2');
            deleteButton.type = 'button';
            deleteButton.textContent = 'Xóa';
            deleteButton.onclick = function () {
                deleteImage(productId, image.id);
            };
            inputDiv.appendChild(deleteButton);

            imageDiv.appendChild(inputDiv);
            imagesContainer.appendChild(imageDiv);
        });
    }
}

/**
 * Hàm mở form sửa mô tả hình ảnh
 * @param {number} id - ID hình ảnh
 */
function showEditForm(id) {
    document.getElementById('editForm_' + id).style.display = 'block';
}

/**
 * Hàm đóng form sửa mô tả hình ảnh
 * @param {number} id - ID hình ảnh
 */
function hideEditForm(id) {
    document.getElementById('editForm_' + id).style.display = 'none';
}

/**
 * Hàm xóa hình ảnh
 * @param {number} productId - ID sản phẩm
 * @param {number} imageId - ID hình ảnh
 */
function deleteImage(productId, imageId) {
    var confirmation = confirm("Bạn có chắc chắn muốn xóa ảnh này?");
    if (confirmation) {
        // Sử dụng Axios để gửi yêu cầu DELETE
        axios.delete(`http://localhost:8080/admin/product/deleteImage/${productId}/${imageId}`)
            .then(response => {
                alert('Xóa ảnh thành công!');
                // Tải lại trang hoặc cập nhật lại danh sách ảnh
                window.location.reload();
            })
            .catch(error => {
                console.error('Error deleting image:', error);
                alert('Xóa ảnh thất bại. Vui lòng thử lại sau.');
            });
    }
}

/**
 * Hàm xử lý format tiền
 * @param {HTMLElement} input - Trường input
 */
function formatCurrencyPrice(input) {
    let numericValue = input.value.replace(/[^\d]/g, '');
    input.value = formatNumberWithCommas(numericValue);

    document.getElementById('hiddenPrice').value = numericValue;
}

function formatCurrencySalePrice(input) {
    let numericValue = input.value.replace(/[^\d]/g, '');
    input.value = formatNumberWithCommas(numericValue);

    document.getElementById('hiddenSalePrice').value = numericValue;
}

function formatNumberWithCommas(value) {
    return Number(value).toLocaleString('en-US');
}

function clearValue(input) {
    input.value = '';
}

/**
 * Hàm cập nhật sản phẩm
 * @param {number} productId - ID sản phẩm
 */
/**
 * Hàm cập nhật sản phẩm
 * @param {number} productId - ID sản phẩm
 */
async function updateProduct(productId) {
    const form = document.getElementById('updateProductForm');
    const formData = new FormData(form);

    // Đảm bảo rằng supplyId được gửi đúng thông qua thẻ input hidden
    const supplyIdHidden = document.getElementById('supplyIdHidden');
    if (supplyIdHidden) {
        formData.set('supplyId', supplyIdHidden.value);
    }

    try {
        const response = await axios.patch('http://localhost:8080/api/v1/product', formData, {
            headers: {
                // Khi sử dụng FormData, Axios tự động thiết lập 'Content-Type' với boundary nên không cần đặt thủ công
                'Content-Type': 'multipart/form-data'
            }
        });

        if (response.status === 200) {
            alert('Cập nhật sản phẩm thành công!');
            window.location.href = 'list-product.php';
        } else {
            throw new Error('Cập nhật sản phẩm thất bại.');
        }
    } catch (error) {
        console.error('Error updating product:', error);
        // Hiển thị thông báo lỗi nếu có
        if (error.response && error.response.data && error.response.data.message) {
            document.getElementById('error-message').textContent = error.response.data.message;
        } else {
            document.getElementById('error-message').textContent = 'Có lỗi xảy ra khi cập nhật sản phẩm.';
        }
    }
}


/**
 * Hàm fetch danh sách thể loại từ API và populate vào dropdown
 */
async function fetchCategories() {
    try {
        const response = await fetch(`http://localhost:8080/api/v1/categories?page=0&size=100`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const categories = await response.json();
        populateCategoryDropdown(categories.content);
    } catch (error) {
        console.error('Error fetching categories:', error);
        document.getElementById('category-error').textContent = 'Không thể tải danh sách thể loại sản phẩm.';
    }
}

/**
 * Hàm populate danh sách thể loại vào dropdown
 * @param {Array} categories - Danh sách thể loại
 */
function populateCategoryDropdown(categories) {
    const categorySelect = document.getElementById('category');
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.id;
        option.textContent = category.name;
        categorySelect.appendChild(option);
    });
}

// Gọi hàm fetchCategories khi trang được tải
document.addEventListener('DOMContentLoaded', function () {
    fetchCategories();
});
