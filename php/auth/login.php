<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Đăng Nhập</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <script src="https://kit.fontawesome.com/98df298cac.js" crossorigin="anonymous"></script>
    <style>
        .login-form {
            width: 340px;
            margin: 50px auto;
        }

        .login-form form {
            margin-bottom: 15px;
            background: #f7f7f7;
            box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
            padding: 30px;
        }

        .login-form h2 {
            margin: 0 0 15px;
        }

        .form-control,
        .btn {
            min-height: 38px;
            border-radius: 2px;
        }

        .btn {
            font-size: 15px;
            font-weight: bold;
        }

        .form-group {
            text-align: center;
        }

        .form-group a {
            display: inline-block;
        }
    </style>
</head>

<body>
    <div class="login-form">
        <form method="post" id="loginForm">
            <h2 class="text-center">Log in</h2>
            <div class="form-group">
                <input type="text" class="form-control" id="username" name="username" placeholder="username" required="required">
            </div>
            <div class="form-group">
                <input type="password" class="form-control" id="password" name="password" placeholder="password" required="required">
                <small id="passwordError" style="color: red;"></small>
            </div>
            <div class="form-group">
                <button type="submit" class="btn btn-primary btn-block">Log in</button>
            </div>
            <div class="clearfix">
                <label class="pull-left checkbox-inline"><input type="checkbox">Remember me</label>
                <a href="#" class="pull-right">Forgot Password?</a>
            </div>
        </form>
        <div class="form-group">
            <div>--or--</div>
        </div>
        <p class="text-center"><a href="register.php">Create an Account</a></p>
    </div>
    <script>
        document.getElementById('loginForm').addEventListener('submit', function(event) {
            event.preventDefault(); // Ngăn chặn gửi form mặc định

            // Lấy giá trị từ các trường nhập
            var username = document.getElementById('username').value;
            var password = document.getElementById('password').value;
            var passwordError = document.getElementById('passwordError');

            // Kiểm tra mật khẩu có đủ điều kiện không
            if (password.length < 6) {
                passwordError.textContent = 'Mật khẩu phải có ít nhất 6 kí tự.';
                return;
            } else {
                passwordError.textContent = '';
            }

            function isValidPassword(password) {
                var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
                return passwordRegex.test(password);
            }
            var user = {
                name: username,
                password: password
            };
            console.log(user);

            // Gọi API với fetch
            fetch('http://localhost:8080/api/v1/users/signin', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(user)
                })
                .then(response => {
                    if (!response.ok) {
                        return response.text().then(errorText => {
                            // Kiểm tra lỗi cụ thể
                            if (errorText.includes("User not found")) {
                                alert("Tài khoản chưa tồn tại, vui lòng đăng ký.");
                            } else {
                                alert("Sai mật khẩu, vui lòng thử lại.");
                            }
                            throw new Error(errorText); // Ngăn không xử lý tiếp nếu có lỗi
                        });
                    }
                    return response.json();
                })
                .then(data => {
                    // Lưu token vào localStorage
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('refreshToken', data.refreshToken);
                    alert("Đăng nhập thành công!");

                    // Chuyển hướng hoặc thực hiện các thao tác tiếp theo
                    window.location.href = '../client/index.php'; // chuyển đến trang chủ hoặc trang mong muốn
                })
                .catch(error => {
                    console.error('Lỗi đăng nhập:', error);
                });

        });
        // Đoạn mã kiểm tra số điện thoại không được sử dụng trong form này nên có thể loại bỏ
    </script>
</body>

</html>