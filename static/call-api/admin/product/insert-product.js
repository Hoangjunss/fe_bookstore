    // Hàm xem trước hình ảnh
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

    // Khi tài liệu đã sẵn sàng
    document.addEventListener('DOMContentLoaded', function () {
        // Xử lý submit form
        document.getElementById('createBookForm').addEventListener('submit', function (e) {
            e.preventDefault(); // Ngăn form submit mặc định
            createBook();
        });

        // Xử lý kiểm tra giá bán phải >= giá nhập (nếu áp dụng)
        // (Trong trường hợp sách không có giá, có thể bỏ qua đoạn này)
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

    // Hàm tạo mới sách
    async function createBook() {
        const form = document.getElementById('createBookForm');
        const formData = new FormData(form);

        try {
            const response = await fetch('http://localhost:8080/product', {
                method: 'POST',
                body: formData,
                // 'Content-Type' sẽ được tự động đặt bởi trình duyệt khi sử dụng FormData
            });

            if (response.status === 201) { // HTTP 201 Created
                alert('Tạo mới sách thành công!');
                window.location.href = 'list-book.html';
            } else {
                const errorData = await response.text();
                throw new Error(errorData || 'Tạo mới sách thất bại.');
            }
        } catch (error) {
            console.error('Error creating book:', error);
            document.getElementById('error-message').textContent = error.message;
        }
    }