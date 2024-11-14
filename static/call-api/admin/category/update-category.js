    document.addEventListener('DOMContentLoaded', function () {
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
        // Khởi tạo Parsley cho form
        $('#myForm').parsley();

        // Xử lý sự kiện submit form
        $('#myForm').on('submit', function (e) {
            e.preventDefault();

            // Kiểm tra validation
            if (!$(this).parsley().isValid()) {
                return;
            }

            // Thu thập dữ liệu từ form
            let formData = {
                name: $('#name').val().trim(),
                status: parseInt($('#status').val())
            };

            // Gửi yêu cầu POST tới backend API
            axios.post('http://localhost:8080/api/categories', formData)
                .then(function (response) {
                    // Xử lý thành công
                    alert('Thêm loại sản phẩm thành công!');
                    // Điều hướng tới danh sách loại sản phẩm
                    window.location.href = 'list-category.php';
                })
                .catch(function (error) {
                    // Xử lý lỗi
                    console.error(error);
                    if (error.response && error.response.data && error.response.data.message) {
                        $('#error-message').text(error.response.data.message);
                    } else {
                        $('#error-message').text('Có lỗi xảy ra. Vui lòng thử lại sau.');
                    }
                });
        });
    });