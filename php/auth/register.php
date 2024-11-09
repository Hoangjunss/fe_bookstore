<!DOCTYPE html>
<html lang="vi">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Đăng Ký</title>
    <!-- CSS and JavaScript libraries -->
    <link href="../../static/assets/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <!-- <link href="../../static/assets/css/icons.min.css" rel="stylesheet" type="text/css"/> -->
    <!-- <link href="../../static/assets/css/app.min.css" rel="stylesheet" type="text/css"/> -->
</head>

<body class="authentication-bg bg-gradient">
    <div class="account-pages pt-5 mt-5 mb-5">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-8 col-lg-6 col-xl-5">
                    <div class="card bg-pattern">
                        <div class="card-body p-4">
                            <div class="text-center w-75 m-auto">
                                <a href="login.php">
                                    <img src="../../static/assets/img/logo.jpeg" alt="Logo" height="98">
                                </a>
                                <h5 class="text-uppercase text-center font-bold mt-4">ĐĂNG KÝ</h5>
                            </div>

                            <form class="mt-3" id="registerForm">
                                <div class="form-group">
                                    <label>Họ tên đầy đủ</label>
                                    <input class="form-control" type="text" name="fullname" id="fullname" placeholder="Nhập họ tên đầy đủ" required />
                                </div>
                                <div class="form-group">
                                    <label>Địa chỉ email</label>
                                    <input class="form-control" type="email" name="email" id="email" placeholder="Nhập email" required />
                                </div>
                                <div class="form-group">
                                    <label>Tên đăng nhập</label>
                                    <input class="form-control" type="text" name="username" id="username" placeholder="Tên đăng nhập" required />
                                </div>
                                <div class="form-group">
                                    <label for="phone">Số điện thoại</label>
                                    <input type="text" class="form-control" id="phone" name="phone"
                                        placeholder="(0)123 456 7890"
                                        oninput="this.value = this.value.replace(/[^0-9]/g, ''); if (this.value.length > 10) this.value = this.value.slice(0, 10);">
                                    <small class="text-danger error-phone"></small>
                                </div>
                                <div class="form-group">
                                    <label for="password">Mật khẩu</label>
                                    <input class="form-control" type="password" name="password" id="password" placeholder="Nhập mật khẩu" required />
                                    <small class="text-danger error-password"></small>
                                </div>
                                <div class="form-group">
                                    <label>Xác nhận mật khẩu</label>
                                    <input class="form-control" type="password" id="confirm_password" name="confirm_password" placeholder="Xác nhận mật khẩu" required />
                                    <span id="message"></span>
                                </div>
                                <div class="form-group mb-0 text-center">
                                    <button class="btn btn-gradient btn-block" type="submit"> Đăng ký xác nhận </button>
                                </div>
                            </form>
                            <div class="row mt-4">
                                <div class="col-sm-12 text-center">
                                    <p class="text-muted mb-0">Đã có tài khoản? <a href="login.php" class="text-dark ml-1"><b>Đăng Nhập</b></a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Vendor js -->
    <!-- <script src="../../static/assets/js/vendor.min.js"></script> -->
    <!-- App js -->
    <!-- <script src="../../static/assets/js/app.min.js"></script> -->
    <script>
        document.getElementById('registerForm').addEventListener('submit', function(event) {
            event.preventDefault(); // Ngăn chặn hành vi mặc định của form

            // Lấy dữ liệu từ form
            const fullname = document.getElementById('fullname').value;
            const email = document.getElementById('email').value;
            const username = document.getElementById('username').value;
            const phone = document.getElementById('phone').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm_password').value;
            const role = "customer"; // Thiết lập vai trò mặc định là "USER"

            // Kiểm tra mật khẩu
            if (password.length < 6 || !isValidPassword(password)) {
                document.querySelector('.error-password').innerText = 'Mật khẩu phải bao gồm ít nhất 6 kí tự, có chữ hoa, chữ thường, số và kí tự đặc biệt.';
                return;
            } else {
                document.querySelector('.error-password').innerText = '';
            }

            // Kiểm tra mật khẩu xác nhận
            if (password !== confirmPassword) {
                document.getElementById('message').style.color = 'red';
                document.getElementById('message').innerText = 'Mật Khẩu Không Trùng Khớp!';
                return;
            } else {
                document.getElementById('message').style.color = 'green';
                document.getElementById('message').innerText = 'Mật Khẩu Trùng Khớp!';
            }

            // Kiểm tra số điện thoại
            if (!phone.match(/^\d{10}$/)) {
                document.querySelector('.error-phone').innerText = 'Số điện thoại phải gồm 10 số.';
                return;
            } else {
                document.querySelector('.error-phone').innerText = '';
            }

            // Tạo đối tượng cho yêu cầu
            const userRegistrationData = {
                username: username,
                email: email,
                password: password,
                fullname: fullname,
                role: role
            };

            console.log(userRegistrationData);
            // Gọi API đăng ký với fetch
            fetch('http://localhost:8080/api/v1/users/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(userRegistrationData),
                    credentials: "include"
                })
                .then(response => {
                    console.log(response);
                    if (response.ok) {
                        return response.json();
                    } else if (response.status === 409) {
                        throw new Error('Tài khoản đã tồn tại');
                    } else {
                        throw new Error('Đăng ký thất bại');
                    }
                })
                .then(data => {
                    alert("Đăng ký thành công!"); // Hiển thị thông báo thành công
                    window.location.href = 'login.php'; // Chuyển hướng người dùng đến trang đăng nhập
                })
                .catch(error => {
                    if (error.message === 'Tài khoản đã tồn tại') {
                        alert("Tài khoản đã tồn tại");
                    } else {
                        console.error('Lỗi đăng ký:', error);
                        alert("Đăng ký thất bại, vui lòng kiểm tra lại thông tin.");
                    }
                });
        });

        // Hàm kiểm tra mật khẩu mạnh
        function isValidPassword(password) {
            var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
            return passwordRegex.test(password);
        }
    </script>
</body>

</html>